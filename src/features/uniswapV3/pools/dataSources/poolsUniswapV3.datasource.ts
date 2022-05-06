import PoolsUniswapV3Repository from 'src/features/uniswapV3/pools/core/repositories/PoolsUniswapV3.repository';
import { PoolsUniswapV3 } from 'src/features/uniswapV3/pools/core/entities/PoolsUniswapV3';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { gql, GraphQLClient } from 'graphql-request';
import { UNISWAP_V3_POOLS_TO_HIDE } from 'src/features/uniswapV3/pools/utils/constants';

class PoolsUniswapV3DataSource implements PoolsUniswapV3Repository {
  public async getByBlocks(endpoint: string, blocks: Blocks): Promise<PoolsUniswapV3 | undefined> {
    const client = new GraphQLClient(endpoint);
    const getQuery = (blocksEntity: Blocks) => {
      let poolsToHide = '';
      UNISWAP_V3_POOLS_TO_HIDE.map((address) => {
        return (poolsToHide += `"${address}",`);
      });
      let POOLS_UNISWAP_V3 = 'query PoolsUniswapV3 {';
      for (const blockKey of Object.keys(blocksEntity)) {
        const blocks =
          blockKey !== 'current'
            ? blocksEntity[blockKey as keyof typeof blocksEntity]
              ? `block: {number: ${blocksEntity[blockKey as keyof typeof blocksEntity]?.number}} ,`
              : ''
            : '';
        const pools = `
          ${blockKey}: pools(
                        where: {
                          id_not_in: [${poolsToHide}]
                        }, 
                        first: 50, 
                        ${blocks} 
                        orderBy: totalValueLockedUSD, 
                        orderDirection: desc, 
                        subgraphError: allow) {
                          id
                          feeTier
                          volumeUSD
                          totalValueLockedUSD
                          token0 {
                            name
                            id
                            symbol 
                            decimals
                          }
                          token1 {
                            name
                            id
                            symbol 
                            decimals
                          }
                        }
                      `;
        POOLS_UNISWAP_V3 += pools;
      }
      POOLS_UNISWAP_V3 += '}';
      return gql`
        ${POOLS_UNISWAP_V3}
      `;
    };
    return client.request(getQuery(blocks));
  }
}
export default PoolsUniswapV3DataSource;

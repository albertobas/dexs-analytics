import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { gql, GraphQLClient } from 'graphql-request';
import { PairsUniswapV2 } from 'src/features/uniswapV2/pairs/core/entities/PairsUniswapV2';
import PairsUniswapV2Repository from 'src/features/uniswapV2/pairs/core/repositories/PairsUniswapV2.repository';
import { UNISWAP_V2_PAIRS_TO_HIDE } from 'src/features/uniswapV2/pairs/utils/constants';

class PairsUniswapV2DataSource implements PairsUniswapV2Repository {
  public async getByBlocks(endpoint: string, blocks: Blocks): Promise<PairsUniswapV2 | undefined> {
    const client = new GraphQLClient(endpoint);
    const getQuery = (blocksEntity: Blocks) => {
      let pairsToHide = '';
      UNISWAP_V2_PAIRS_TO_HIDE.map((address) => {
        return (pairsToHide += `"${address}",`);
      });
      let PAIRS_UNISWAP_V2 = 'query PairsUniswapV2 {';
      for (const blockKey of Object.keys(blocksEntity)) {
        const blocks =
          blockKey !== 'current'
            ? blocksEntity[blockKey as keyof typeof blocksEntity]
              ? `block: {number: ${blocksEntity[blockKey as keyof typeof blocksEntity]?.number}} ,`
              : ''
            : '';
        const pairs = `
          ${blockKey}: pairs(
                        where: {
                          id_not_in: [${pairsToHide}]
                        },
                        first: 50,
                        ${blocks} 
                        orderBy: reserveUSD, 
                        orderDirection: desc,
                        subgraphError: allow) {
                          id
                          volumeUSD
                          reserveUSD
                          token0 {
                            id
                            name
                            symbol 
                            decimals
                          }
                          token1 {
                            id
                            name
                            symbol 
                            decimals
                          }
                        }
                      `;
        PAIRS_UNISWAP_V2 += pairs;
      }

      PAIRS_UNISWAP_V2 += '}';
      return gql`
        ${PAIRS_UNISWAP_V2}
      `;
    };
    return client.request(getQuery(blocks));
  }
}
export default PairsUniswapV2DataSource;

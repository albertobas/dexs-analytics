import { gql, GraphQLClient } from 'graphql-request';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import EthersUniswapV3Repository from 'src/features/uniswapV3/ethers/core/repositories/EthersUniswapV3.repository';
import { EthersUniswapV3 } from 'src/features/uniswapV3/ethers/core/entities/EthersUniswapV3';

class EthersUniswapV3DataSource implements EthersUniswapV3Repository {
  public async getPrices(endpoint: string, blocks: Blocks): Promise<EthersUniswapV3 | undefined> {
    const client = new GraphQLClient(endpoint);
    const getQuery = (blocksEntity: Blocks) => {
      let ETHERS_UNISWAP_V3 = 'query EthersUniswapV3 {';
      for (const blockKey of Object.keys(blocksEntity)) {
        const blocks =
          blockKey !== 'current'
            ? blocksEntity[blockKey as keyof typeof blocksEntity]
              ? `block: {number: ${blocksEntity[blockKey as keyof typeof blocksEntity]?.number}} ,`
              : ''
            : '';
        const blockString = `
          ${blockKey}: bundles(
            first: 1,
            ${blocks}
            subgraphError: allow) {
              ethPriceUSD
            }`;
        ETHERS_UNISWAP_V3 += blockString;
      }

      ETHERS_UNISWAP_V3 += '}';
      return gql`
        ${ETHERS_UNISWAP_V3}
      `;
    };
    return client.request(getQuery(blocks));
  }
}

export default EthersUniswapV3DataSource;

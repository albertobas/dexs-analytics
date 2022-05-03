import { gql, GraphQLClient } from 'graphql-request';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import EthersUniswapV2Repository from 'src/features/uniswapV2/ethers/core/repositories/EthersUniswapV2.repository';
import { EthersUniswapV2 } from 'src/features/uniswapV2/ethers/core/entities/EthersUniswapV2';

class EthersUniswapV2DataSource implements EthersUniswapV2Repository {
  public async getPrices(endpoint: string, blocks: Blocks): Promise<EthersUniswapV2 | undefined> {
    const client = new GraphQLClient(endpoint);
    const getQuery = (blocksEntity: Blocks) => {
      let ETHERS_UNISWAP_V2 = 'query EthersUniswapV2 {';
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
              ethPrice
            }`;
        ETHERS_UNISWAP_V2 += blockString;
      }

      ETHERS_UNISWAP_V2 += '}';
      return gql`
        ${ETHERS_UNISWAP_V2}
      `;
    };
    return client.request(getQuery(blocks));
  }
}

export default EthersUniswapV2DataSource;

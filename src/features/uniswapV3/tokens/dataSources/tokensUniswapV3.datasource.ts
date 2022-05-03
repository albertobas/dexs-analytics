import { gql, GraphQLClient } from 'graphql-request';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import TokensUniswapV3Repository from 'src/features/uniswapV3/tokens/core/repositories/TokensUniswapV3.repository';
import { TokensUniswapV3 } from 'src/features/uniswapV3/tokens/core/entities/TokensUniswapV3';
import { UNISWAP_V3_TOKENS_TO_HIDE } from 'src/features/uniswapV3/tokens/utils/constants';

class TokensUniswapV3DataSource implements TokensUniswapV3Repository {
  public async getByAddresses(endpoint: string, blocks: Blocks): Promise<TokensUniswapV3 | undefined> {
    const client = new GraphQLClient(endpoint);
    const getQuery = (blocksEntity: Blocks) => {
      let tokensToHide = '';
      UNISWAP_V3_TOKENS_TO_HIDE.map((address) => {
        return (tokensToHide += `"${address}",`);
      });
      let TOKENS_UNISWAP_V3 = 'query TokensUniswapV3 {';
      for (const blockKey of Object.keys(blocksEntity)) {
        const blocks =
          blockKey !== 'current'
            ? blocksEntity[blockKey as keyof typeof blocksEntity]
              ? `block: {number: ${blocksEntity[blockKey as keyof typeof blocksEntity]?.number}} ,`
              : ''
            : '';
        const tokens = `
          ${blockKey}: tokens(
            where: {id_not_in: [${tokensToHide}]}, 
            orderBy: totalValueLockedUSD, 
            orderDirection: desc, 
            first: 50, 
            ${blocks}
            subgraphError: allow) {
              id
              name
              symbol
              volumeUSD
              totalValueLockedUSD
              derivedETH
            }`;
        TOKENS_UNISWAP_V3 += tokens;
      }
      TOKENS_UNISWAP_V3 += '}';
      return gql`
        ${TOKENS_UNISWAP_V3}
      `;
    };
    return client.request(getQuery(blocks));
  }
}

export default TokensUniswapV3DataSource;

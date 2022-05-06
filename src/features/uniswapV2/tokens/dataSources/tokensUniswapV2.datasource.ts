import { gql, GraphQLClient } from 'graphql-request';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import TokensUniswapV2Repository from 'src/features/uniswapV2/tokens/core/repositories/TokensUniswapV2.repository';
import { TokensUniswapV2 } from 'src/features/uniswapV2/tokens/core/entities/TokensUniswapV2';
import { UNISWAP_V2_TOKENS_TO_HIDE } from 'src/features/uniswapV2/tokens/utils/constants';

class TokensUniswapV2DataSource implements TokensUniswapV2Repository {
  public async getByBlocks(endpoint: string, blocks: Blocks): Promise<TokensUniswapV2 | undefined> {
    const client = new GraphQLClient(endpoint);
    const getQuery = (blocksEntity: Blocks) => {
      let tokensToHide = ``;
      UNISWAP_V2_TOKENS_TO_HIDE.map((address) => {
        return (tokensToHide += `"${address}",`);
      });
      let TOKENS_UNISWAP_V2 = 'query TokensUniswapV2 {';
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
            orderBy: tradeVolumeUSD, 
            orderDirection: desc, 
            first: 50, 
            ${blocks}
            subgraphError: allow) {
              id
              symbol
              name
              derivedETH
              tradeVolumeUSD
              totalLiquidity
            }`;
        TOKENS_UNISWAP_V2 += tokens;
      }

      TOKENS_UNISWAP_V2 += '}';
      return gql`
        ${TOKENS_UNISWAP_V2}
      `;
    };
    return client.request(getQuery(blocks));
  }
}

export default TokensUniswapV2DataSource;

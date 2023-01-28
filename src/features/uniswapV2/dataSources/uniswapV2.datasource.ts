import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { GraphQLClient } from 'graphql-request';
import UniswapV2Repository from 'src/features/uniswapV2/core/repositories/UniswapV2.repository';
import { PairsUniswapV2 } from 'src/features/uniswapV2/core/entities/PairsUniswapV2';
import { TokensAndPricesUniswapV2 } from 'src/features/uniswapV2/core/entities/TokensAndPricesUniswapV2';
import { PairsTokensAndPricesUniswapV2 } from 'src/features/uniswapV2/core/entities/PairsTokensAndPricesUniswapV2';
import { UNISWAP_V2_PAIRS_TO_HIDE, UNISWAP_V2_TOKENS_TO_HIDE } from 'src/features/uniswapV2/utils/constants';

class UniswapV2DataSource implements UniswapV2Repository {
  public async getPairsByBlocks(endpoint: string, blocks: Blocks): Promise<PairsUniswapV2 | undefined> {
    const client = new GraphQLClient(endpoint);
    let pairsToHide = '';
    UNISWAP_V2_PAIRS_TO_HIDE.map((address) => {
      return (pairsToHide += `"${address}",`);
    });
    const QUERY = `
      query PairsUniswapV2($pairsToHide: String!, $blockT1D: Int!, $blockT2D: Int!, $blockT1W: Int!) {
        pairs_current: pairs(
          where: { id_not_in: [$pairsToHide] }
          first: 50
          orderBy: reserveUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...pairsFields
        }
        pairs_t1D: pairs(
          where: { id_not_in: [$pairsToHide] }
          first: 50
          block: { number: $blockT1D }
          orderBy: reserveUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...pairsFields
        }
        pairs_t2D: pairs(
          where: { id_not_in: [$pairsToHide] }
          first: 50
          block: { number: $blockT2D }
          orderBy: reserveUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...pairsFields
        }
        pairs_t1W: pairs(
          where: { id_not_in: [$pairsToHide] }
          first: 50
          block: { number: $blockT1W }
          orderBy: reserveUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...pairsFields
        }
      }
      fragment pairsFields on Pair {
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

    return client.request(QUERY, {
      pairsToHide,
      blockT1D: blocks.t1D.number,
      blockT2D: blocks.t2D.number,
      blockT1W: blocks.t1W.number,
    });
  }

  public async getPairsTokensAndPricesByBlocks(
    endpoint: string,
    blocks: Blocks
  ): Promise<PairsTokensAndPricesUniswapV2 | undefined> {
    const client = new GraphQLClient(endpoint);
    let pairsToHide = '';
    UNISWAP_V2_PAIRS_TO_HIDE.map((address) => {
      return (pairsToHide += `"${address}",`);
    });
    let tokensToHide = ``;
    UNISWAP_V2_TOKENS_TO_HIDE.map((address) => {
      return (tokensToHide += `"${address}",`);
    });
    const QUERY = `
      query PairsAndTokensUniswapV2($tokensToHide: String!, $pairsToHide: String!, $blockT1D: Int!, $blockT2D: Int!, $blockT1W: Int!) {
        tokens_current: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: tradeVolumeUSD
          orderDirection: desc
          first: 50
          subgraphError: allow
        ) {
          ...tokensFields
        }
        tokens_t1D: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: tradeVolumeUSD
          orderDirection: desc
          first: 50
          block: {number: $blockT1D}
          subgraphError: allow
        ) {
          ...tokensFields
        }
        tokens_t2D: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: tradeVolumeUSD
          orderDirection: desc
          first: 50
          block: {number: $blockT2D}
          subgraphError: allow
        ) {
          ...tokensFields
        }
        tokens_t1W: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: tradeVolumeUSD
          orderDirection: desc
          first: 50
          block: {number: $blockT1W}
          subgraphError: allow
        ) {
          ...tokensFields
        }
        pairs_current: pairs(
          where: {id_not_in: [$pairsToHide]}
          first: 50
          orderBy: reserveUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...pairsFields
        }
        pairs_t1D: pairs(
          where: {id_not_in: [$pairsToHide]}
          first: 50
          block: {number: $blockT1D}
          orderBy: reserveUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...pairsFields
        }
        pairs_t2D: pairs(
          where: {id_not_in: [$pairsToHide]}
          first: 50
          block: {number: $blockT2D}
          orderBy: reserveUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...pairsFields
        }
        pairs_t1W: pairs(
          where: {id_not_in: [$pairsToHide]}
          first: 50
          block: {number: $blockT1W}
          orderBy: reserveUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...pairsFields
        }
        price_current: bundles(first: 1, subgraphError: allow) {
          ...priceField
        }
        price_t1D: bundles(first: 1, block: {number: $blockT1D}, subgraphError: allow) {
          ...priceField
        }
        price_t2D: bundles(first: 1, block: {number: $blockT2D}, subgraphError: allow) {
          ...priceField
        }
        price_t1W: bundles(first: 1, block: {number: $blockT1W}, subgraphError: allow) {
          ...priceField
        }
      }
      fragment tokensFields on Token {
        id
        symbol
        name
        derivedETH
        tradeVolumeUSD
        totalLiquidity
      }
      fragment pairsFields on Pair {
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
      fragment priceField on Bundle {
        ethPrice
      }
    `;

    return client.request(QUERY, {
      tokensToHide,
      pairsToHide,
      blockT1D: blocks.t1D.number,
      blockT2D: blocks.t2D.number,
      blockT1W: blocks.t1W.number,
    });
  }

  public async getTokensAndPricesByBlocks(
    endpoint: string,
    blocks: Blocks
  ): Promise<TokensAndPricesUniswapV2 | undefined> {
    const client = new GraphQLClient(endpoint);
    let tokensToHide = ``;
    UNISWAP_V2_TOKENS_TO_HIDE.map((address) => {
      return (tokensToHide += `"${address}",`);
    });
    const QUERY = `
      query TokensUniswapV2($tokensToHide: String!, $blockT1D: Int!, $blockT2D: Int!, $blockT1W: Int!) {
        tokens_current: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: tradeVolumeUSD
          orderDirection: desc
          first: 50
          subgraphError: allow
        ) {
          ...tokensFields
        }
        tokens_t1D: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: tradeVolumeUSD
          orderDirection: desc
          first: 50
          block: {number: $blockT1D}
          subgraphError: allow
        ) {
          ...tokensFields
        }
        tokens_t2D: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: tradeVolumeUSD
          orderDirection: desc
          first: 50
          block: {number: $blockT2D}
          subgraphError: allow
        ) {
          ...tokensFields
        }
        tokens_t1W: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: tradeVolumeUSD
          orderDirection: desc
          first: 50
          block: {number: $blockT1W}
          subgraphError: allow
        ) {
          ...tokensFields
        }
        price_current: bundles(first: 1, subgraphError: allow) {
          ...priceField
        }
        price_t1D: bundles(first: 1, block: {number: $blockT1D}, subgraphError: allow) {
          ...priceField
        }
        price_t2D: bundles(first: 1, block: {number: $blockT2D}, subgraphError: allow) {
          ...priceField
        }
        price_t1W: bundles(first: 1, block: {number: $blockT1W}, subgraphError: allow) {
          ...priceField
        }
      }
      fragment tokensFields on Token {
        id
        symbol
        name
        derivedETH
        tradeVolumeUSD
        totalLiquidity
      }
      fragment priceField on Bundle {
        ethPrice
      }
    `;

    return client.request(QUERY, {
      tokensToHide,
      blockT1D: blocks.t1D.number,
      blockT2D: blocks.t2D.number,
      blockT1W: blocks.t1W.number,
    });
  }
}
export default UniswapV2DataSource;

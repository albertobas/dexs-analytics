import { GraphQLClient } from 'graphql-request';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import UniswapV3Repository from 'src/features/uniswapV3/core/repositories/UniswapV3.repository';
import { TokensAndPricesUniswapV3 } from 'src/features/uniswapV3/core/entities/TokensAndPricesUniswapV3';
import { UNISWAP_V3_TOKENS_TO_HIDE } from 'src/features/uniswapV3/utils/constants';
import { PoolsUniswapV3 } from 'src/features/uniswapV3/core/entities/PoolsUniswapV3';
import { UNISWAP_V3_POOLS_TO_HIDE } from 'src/features/uniswapV3/utils/constants';
import { PoolsTokensAndPricesUniswapV3 } from 'src/features/uniswapV3/core/entities/PoolsTokensAndPricesUniswapV3';

class UniswapV3DataSource implements UniswapV3Repository {
  public async getPoolsByBlocks(endpoint: string, blocks: Blocks): Promise<PoolsUniswapV3 | undefined> {
    const client = new GraphQLClient(endpoint);
    let poolsToHide = '';
    UNISWAP_V3_POOLS_TO_HIDE.map((address) => {
      return (poolsToHide += `"${address}",`);
    });
    const QUERY = `
      query PoolsUniswapV3($poolsToHide: String!, $blockT1D: Int!, $blockT2D: Int!, $blockT1W: Int!) {
        pools_current: pools(
          where: {id_not_in: [$poolsToHide]}
          first: 50
          orderBy: totalValueLockedUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...poolsFields
        }
        pools_t1D: pools(
          where: {id_not_in: [$poolsToHide]}
          first: 50
          block: {number: $blockT1D}
          orderBy: totalValueLockedUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...poolsFields
        }
        pools_t2D: pools(
          where: {id_not_in: [$poolsToHide]}
          first: 50
          block: {number: $blockT2D}
          orderBy: totalValueLockedUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...poolsFields
        }
        pools_t1W: pools(
          where: {id_not_in: [$poolsToHide]}
          first: 50
          block: {number: $blockT1W}
          orderBy: totalValueLockedUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...poolsFields
        }
      }
      fragment poolsFields on Pool {
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

    return client.request(QUERY, {
      poolsToHide,
      blockT1D: blocks.t1D.number,
      blockT2D: blocks.t2D.number,
      blockT1W: blocks.t1W.number,
    });
  }

  public async getPoolsTokensAndPricesByBlocks(
    endpoint: string,
    blocks: Blocks
  ): Promise<PoolsTokensAndPricesUniswapV3 | undefined> {
    const client = new GraphQLClient(endpoint);
    let poolsToHide = '';
    UNISWAP_V3_POOLS_TO_HIDE.map((address) => {
      return (poolsToHide += `"${address}",`);
    });
    let tokensToHide = ``;
    UNISWAP_V3_TOKENS_TO_HIDE.map((address) => {
      return (tokensToHide += `"${address}",`);
    });
    const QUERY = `
      query PoolsAndTokensUniswapV3($tokensToHide: String!, $poolsToHide: String!, $blockT1D: Int!, $blockT2D: Int!, $blockT1W: Int!) {
        tokens_current: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: totalValueLockedUSD
          orderDirection: desc
          first: 50
          subgraphError: allow
        ) {
          ...tokensFields
        }
        tokens_t1D: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: totalValueLockedUSD
          orderDirection: desc
          first: 50
          block: {number: $blockT1D}
          subgraphError: allow
        ) {
          ...tokensFields
        }
        tokens_t2D: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: totalValueLockedUSD
          orderDirection: desc
          first: 50
          block: {number: $blockT2D}
          subgraphError: allow
        ) {
          ...tokensFields
        }
        tokens_t1W: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: totalValueLockedUSD
          orderDirection: desc
          first: 50
          block: {number: $blockT1W}
          subgraphError: allow
        ) {
          ...tokensFields
        }
        pools_current: pools(
          where: {id_not_in: [$poolsToHide]}
          first: 50
          orderBy: totalValueLockedUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...poolsFields
        }
        pools_t1D: pools(
          where: {id_not_in: [$poolsToHide]}
          first: 50
          block: {number: $blockT1D}
          orderBy: totalValueLockedUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...poolsFields
        }
        pools_t2D: pools(
          where: {id_not_in: [$poolsToHide]}
          first: 50
          block: {number: $blockT2D}
          orderBy: totalValueLockedUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...poolsFields
        }
        pools_t1W: pools(
          where: {id_not_in: [$poolsToHide]}
          first: 50
          block: {number: $blockT1W}
          orderBy: totalValueLockedUSD
          orderDirection: desc
          subgraphError: allow
        ) {
          ...poolsFields
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
        name
        symbol
        volumeUSD
        totalValueLockedUSD
        derivedETH
      }
      fragment poolsFields on Pool {
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
      fragment priceField on Bundle {
        ethPriceUSD
      }
    `;
    return client.request(QUERY, {
      tokensToHide,
      poolsToHide,
      blockT1D: blocks.t1D.number,
      blockT2D: blocks.t2D.number,
      blockT1W: blocks.t1W.number,
    });
  }

  public async getTokensAndPricesByBlocks(
    endpoint: string,
    blocks: Blocks
  ): Promise<TokensAndPricesUniswapV3 | undefined> {
    const client = new GraphQLClient(endpoint);
    let poolsToHide = '';
    UNISWAP_V3_POOLS_TO_HIDE.map((address) => {
      return (poolsToHide += `"${address}",`);
    });
    let tokensToHide = ``;
    UNISWAP_V3_TOKENS_TO_HIDE.map((address) => {
      return (tokensToHide += `"${address}",`);
    });
    const QUERY = `
      query TokensUniswapV3($tokensToHide: String!, $blockT1D: Int!, $blockT2D: Int!, $blockT1W: Int!) {
        tokens_current: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: totalValueLockedUSD
          orderDirection: desc
          first: 50
          subgraphError: allow
        ) {
          ...tokensFields
        }
        tokens_t1D: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: totalValueLockedUSD
          orderDirection: desc
          first: 50
          block: {number: $blockT1D}
          subgraphError: allow
        ) {
          ...tokensFields
        }
        tokens_t2D: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: totalValueLockedUSD
          orderDirection: desc
          first: 50
          block: {number: $blockT2D}
          subgraphError: allow
        ) {
          ...tokensFields
        }
        tokens_t1W: tokens(
          where: {id_not_in: [$tokensToHide]}
          orderBy: totalValueLockedUSD
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
        name
        symbol
        volumeUSD
        totalValueLockedUSD
        derivedETH
      }
      fragment priceField on Bundle {
        ethPriceUSD
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

export default UniswapV3DataSource;

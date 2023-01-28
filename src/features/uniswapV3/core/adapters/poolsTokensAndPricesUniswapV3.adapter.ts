import { EtherPrices } from 'src/features/shared/ethers/core/entities/EtherPrices';
import { Token, Tokens } from 'src/features/shared/tokens/core/entities/Tokens';
import { PoolsTokensAndPricesUniswapV3 } from 'src/features/uniswapV3/core/entities/PoolsTokensAndPricesUniswapV3';
import {
  getEtherPriceFromEtherPriceUniswapV3,
  getPoolFromPoolUniswapV3,
  getTokenFromTokenUniswapV3,
} from 'src/features/uniswapV3/utils/helpers';
import { Pool, Pools } from 'src/features/shared/pools/core/entities/Pools';
import { PoolsTokensAndPrices } from 'src/features/shared/poolsTokensAndPrices/core/entities/PoolsTokensAndPrices';

const poolsTokensAndPricesUniswapV3Adapter = (
  dataRaw: PoolsTokensAndPricesUniswapV3 | undefined
): PoolsTokensAndPrices | null => {
  let pools: Pools | null = null;
  let tokens: Tokens | null = null;
  let etherPrices: EtherPrices | null = null;
  if (dataRaw) {
    pools = { current: {}, t1D: {}, t2D: {}, t1W: {} };
    tokens = { current: {}, t1D: {}, t2D: {}, t1W: {} };
    const {
      pools_current,
      pools_t1D,
      pools_t1W,
      pools_t2D,
      tokens_current,
      tokens_t1D,
      tokens_t1W,
      tokens_t2D,
      price_current,
      price_t1D,
      price_t1W,
      price_t2D,
    } = dataRaw;
    const poolsRaw = { pools_current, pools_t1D, pools_t1W, pools_t2D };
    for (const key of Object.keys(poolsRaw)) {
      const poolsData: Record<string, Pool> = {};
      for (const pool of poolsRaw[key as keyof typeof poolsRaw]) {
        poolsData[pool.id] = getPoolFromPoolUniswapV3(pool);
      }
      pools[key.replace('pools_', '') as keyof typeof pools] = poolsData;
    }
    const tokensRaw = { tokens_current, tokens_t1D, tokens_t1W, tokens_t2D };
    for (const key of Object.keys(tokensRaw)) {
      const tokensData: Record<string, Token> = {};
      for (const token of tokensRaw[key as keyof typeof tokensRaw]) {
        tokensData[token.id] = getTokenFromTokenUniswapV3(token);
      }
      tokens[key.replace('tokens_', '') as keyof typeof tokens] = tokensData;
    }
    etherPrices = getEtherPriceFromEtherPriceUniswapV3(price_current, price_t1D, price_t2D, price_t1W);
    return { pools, tokens, etherPrices };
  } else return null;
};

export default poolsTokensAndPricesUniswapV3Adapter;

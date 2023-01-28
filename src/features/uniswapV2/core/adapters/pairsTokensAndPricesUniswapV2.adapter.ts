import { PairsTokensAndPricesUniswapV2 } from 'src/features/uniswapV2/core/entities/PairsTokensAndPricesUniswapV2';
import { PoolsTokensAndPrices } from 'src/features/shared/poolsTokensAndPrices/core/entities/PoolsTokensAndPrices';
import tokensAndPricesUniswapV2Adapter from 'src/features/uniswapV2/core/adapters/tokensAndPricesUniswapV2.adapter';
import pairsUniswapV2Adapter from 'src/features/uniswapV2/core/adapters/pairsUniswapV2.adapter';

const pairsTokensAndPricesUniswapV2Adapter = (dataRaw: PairsTokensAndPricesUniswapV2): PoolsTokensAndPrices | null => {
  const {
    pairs_current,
    pairs_t1D,
    pairs_t1W,
    pairs_t2D,
    tokens_current,
    tokens_t1D,
    tokens_t1W,
    tokens_t2D,
    price_current,
    price_t1D,
    price_t1W,
    price_t2D,
  } = dataRaw;
  const pairs = pairsUniswapV2Adapter({ pairs_current, pairs_t1D, pairs_t1W, pairs_t2D });
  const tokensAndPrices = tokensAndPricesUniswapV2Adapter({
    tokens_current,
    tokens_t1D,
    tokens_t1W,
    tokens_t2D,
    price_current,
    price_t1D,
    price_t1W,
    price_t2D,
  });
  return { pools: pairs, ...tokensAndPrices };
};

export default pairsTokensAndPricesUniswapV2Adapter;

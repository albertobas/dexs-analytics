import { PoolsTokensAndPricesUniswapV3 } from 'src/features/uniswapV3/core/entities/PoolsTokensAndPricesUniswapV3';
import { PoolsTokensAndPrices } from 'src/features/shared/poolsTokensAndPrices/core/entities/PoolsTokensAndPrices';
import poolsUniswapV3Adapter from 'src/features/uniswapV3/core/adapters/poolsUniswapV3.adapter';
import tokensAndPricesUniswapV3Adapter from 'src/features/uniswapV3/core/adapters/tokensAndPricesUniswapV3.adapter';

const poolsTokensAndPricesUniswapV3Adapter = (dataRaw: PoolsTokensAndPricesUniswapV3): PoolsTokensAndPrices => {
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
  const pools = poolsUniswapV3Adapter({ current: pools_current, t1D: pools_t1D, t2D: pools_t2D, t1W: pools_t1W });
  const tokensAndPrices = tokensAndPricesUniswapV3Adapter({
    tokens_current,
    tokens_t1D,
    tokens_t1W,
    tokens_t2D,
    price_current,
    price_t1D,
    price_t1W,
    price_t2D,
  });
  return { pools, ...tokensAndPrices };
};

export default poolsTokensAndPricesUniswapV3Adapter;

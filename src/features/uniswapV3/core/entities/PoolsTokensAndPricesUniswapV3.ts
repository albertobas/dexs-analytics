import { EtherPriceUniswapV3 } from 'src/features/uniswapV3/core/entities/EtherPricesUniswapV3';
import { PoolUniswapV3 } from 'src/features/uniswapV3/core/entities/PoolsUniswapV3';
import { TokenUniswapV3 } from 'src/features/uniswapV3/core/entities/TokensAndPricesUniswapV3';

export interface PoolsTokensAndPricesUniswapV3 {
  pools_current: PoolUniswapV3[];
  pools_t1D: PoolUniswapV3[];
  pools_t2D: PoolUniswapV3[];
  pools_t1W: PoolUniswapV3[];
  tokens_current: TokenUniswapV3[];
  tokens_t1D: TokenUniswapV3[];
  tokens_t2D: TokenUniswapV3[];
  tokens_t1W: TokenUniswapV3[];
  price_current: EtherPriceUniswapV3[];
  price_t1D: EtherPriceUniswapV3[];
  price_t2D: EtherPriceUniswapV3[];
  price_t1W: EtherPriceUniswapV3[];
}

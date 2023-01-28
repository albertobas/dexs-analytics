import { PairUniswapV2 } from 'src/features/uniswapV2/core/entities/PairsUniswapV2';
import { TokenUniswapV2 } from 'src/features/uniswapV2/core/entities/TokensAndPricesUniswapV2';
import { EtherPriceUniswapV2 } from 'src/features/uniswapV2/core/entities/EtherPricesUniswapV2';

export interface PairsTokensAndPricesUniswapV2 {
  pairs_current: PairUniswapV2[];
  pairs_t1D: PairUniswapV2[];
  pairs_t2D: PairUniswapV2[];
  pairs_t1W: PairUniswapV2[];
  price_current: EtherPriceUniswapV2[];
  price_t1D: EtherPriceUniswapV2[];
  price_t2D: EtherPriceUniswapV2[];
  price_t1W: EtherPriceUniswapV2[];
  tokens_current: TokenUniswapV2[];
  tokens_t1D: TokenUniswapV2[];
  tokens_t2D: TokenUniswapV2[];
  tokens_t1W: TokenUniswapV2[];
}

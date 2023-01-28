import { EtherPriceUniswapV2 } from 'src/features/uniswapV2/core/entities/EtherPricesUniswapV2';

export interface TokenUniswapV2 {
  id: string;
  symbol: string;
  name: string;
  derivedETH: string;
  tradeVolumeUSD: string;
  totalLiquidity: string;
}

export interface TokensAndPricesUniswapV2 {
  tokens_current: TokenUniswapV2[];
  tokens_t1D: TokenUniswapV2[];
  tokens_t2D: TokenUniswapV2[];
  tokens_t1W: TokenUniswapV2[];
  price_current: EtherPriceUniswapV2[];
  price_t1D: EtherPriceUniswapV2[];
  price_t2D: EtherPriceUniswapV2[];
  price_t1W: EtherPriceUniswapV2[];
}

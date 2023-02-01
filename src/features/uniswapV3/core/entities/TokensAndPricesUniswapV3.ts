import { EtherPriceUniswapV3 } from 'src/features/uniswapV3/core/entities/EtherPricesUniswapV3';

export interface TokenUniswapV3 {
  id: string;
  name: string;
  symbol: string;
  volumeUSD: string;
  totalValueLockedUSD: string;
  derivedETH: string;
}

export interface TokensAndPricesUniswapV3 {
  tokens_current: TokenUniswapV3[];
  tokens_t1D: TokenUniswapV3[];
  tokens_t2D: TokenUniswapV3[];
  tokens_t1W: TokenUniswapV3[];
  price_current: EtherPriceUniswapV3[];
  price_t1D: EtherPriceUniswapV3[];
  price_t2D: EtherPriceUniswapV3[];
  price_t1W: EtherPriceUniswapV3[];
}

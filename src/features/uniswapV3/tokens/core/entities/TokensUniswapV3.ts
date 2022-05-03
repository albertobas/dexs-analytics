interface TokenUniswapV3 {
  id: string;
  name: string;
  symbol: string;
  volumeUSD: string;
  totalValueLockedUSD: string;
  derivedETH: string;
}

export interface TokensUniswapV3 {
  current: TokenUniswapV3[];
  t1D: TokenUniswapV3[];
  t2D: TokenUniswapV3[];
  t1W: TokenUniswapV3[];
}

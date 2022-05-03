interface TokenUniswapV2 {
  id: string;
  symbol: string;
  name: string;
  derivedETH: string;
  tradeVolumeUSD: string;
  totalLiquidity: string;
}

export interface TokensUniswapV2 {
  current: TokenUniswapV2[];
  t1D: TokenUniswapV2[];
  t2D: TokenUniswapV2[];
  t1W: TokenUniswapV2[];
}

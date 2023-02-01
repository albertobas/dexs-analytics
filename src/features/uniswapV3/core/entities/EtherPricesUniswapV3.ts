export interface EtherPriceUniswapV3 {
  ethPriceUSD: string;
}

export interface EtherPricesUniswapV3 {
  current: EtherPriceUniswapV3[];
  t1D: EtherPriceUniswapV3[];
  t2D: EtherPriceUniswapV3[];
  t1W: EtherPriceUniswapV3[];
}

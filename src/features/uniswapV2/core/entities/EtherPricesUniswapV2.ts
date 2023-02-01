export interface EtherPriceUniswapV2 {
  ethPrice: string;
}

export interface EtherPricesUniswapV2 {
  current: EtherPriceUniswapV2[];
  t1D: EtherPriceUniswapV2[];
  t2D: EtherPriceUniswapV2[];
  t1W: EtherPriceUniswapV2[];
}

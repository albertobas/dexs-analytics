interface EtherUniswapV3 {
  ethPriceUSD: string;
}

export interface EthersUniswapV3 {
  current: EtherUniswapV3[];
  t1D: EtherUniswapV3[];
  t2D: EtherUniswapV3[];
  t1W: EtherUniswapV3[];
}

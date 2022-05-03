interface PairUniswapV2 {
  id: string;
  volumeUSD: string;
  reserveUSD: string;
  token0: {
    id: string;
    name: string;
    symbol: string;
    decimals: string;
  };
  token1: {
    id: string;
    name: string;
    symbol: string;
    decimals: string;
  };
}

export interface PairsUniswapV2 {
  current: PairUniswapV2[];
  t1D: PairUniswapV2[];
  t2D: PairUniswapV2[];
  t1W: PairUniswapV2[];
}

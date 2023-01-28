export interface PairUniswapV2 {
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
  pairs_current: PairUniswapV2[];
  pairs_t1D: PairUniswapV2[];
  pairs_t2D: PairUniswapV2[];
  pairs_t1W: PairUniswapV2[];
}

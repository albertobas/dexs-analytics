export interface PoolUniswapV3 {
  id: string;
  feeTier: string;
  volumeUSD: string;
  totalValueLockedUSD: string;
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

export interface PoolsUniswapV3 {
  current: PoolUniswapV3[];
  t1D: PoolUniswapV3[];
  t2D: PoolUniswapV3[];
  t1W: PoolUniswapV3[];
}

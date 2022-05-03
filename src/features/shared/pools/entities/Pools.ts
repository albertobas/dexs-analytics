export interface Pool {
  address: string;
  feeTier: number;
  volume: number;
  tvl: number;
  token0: {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
  };
  token1: {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
  };
}

export interface Pools {
  current: Record<string, Pool>;
  t1D: Record<string, Pool>;
  t2D: Record<string, Pool>;
  t1W: Record<string, Pool>;
}

export type PoolExtended = Pool & {
  volumeChange: number | null;
  volume1W: number | null;
  tvlChange: number | null;
  fees: number;
};

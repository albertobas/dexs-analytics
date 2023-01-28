import { Pool, Pools } from 'src/features/shared/pools/core/entities/Pools';
import { PoolsUniswapV3 } from 'src/features/uniswapV3/core/entities/PoolsUniswapV3';

const poolsUniswapV3Adapter = (dataRaw: PoolsUniswapV3 | undefined): Pools | null => {
  if (dataRaw) {
    const data: Pools = { current: {}, t1D: {}, t2D: {}, t1W: {} };
    for (const key of Object.keys(dataRaw)) {
      const poolsData: Record<string, Pool> = {};
      const pools = dataRaw[key as keyof typeof dataRaw];
      for (const pool of pools) {
        poolsData[pool.id] = {
          address: pool.id,
          feeTier: parseInt(pool.feeTier),
          volume: parseFloat(pool.volumeUSD),
          token0: {
            name: pool.token0.name,
            symbol: pool.token0.symbol,
            address: pool.token0.id,
            decimals: parseFloat(pool.token0.decimals),
          },
          token1: {
            name: pool.token1.name,
            symbol: pool.token1.symbol,
            address: pool.token1.id,
            decimals: parseFloat(pool.token1.decimals),
          },
          tvl: parseFloat(pool.totalValueLockedUSD),
        };
      }
      data[key.replace('pools_', '') as keyof typeof data] = poolsData;
    }
    return data;
  } else return null;
};

export default poolsUniswapV3Adapter;

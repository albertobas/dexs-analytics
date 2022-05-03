import { Pools } from 'src/features/shared/pools/entities/Pools';
import { PoolsObject, PoolsStateData } from 'src/features/shared/state/core/entities/Pools';
import { get2DayChange, getTime } from 'src/features/shared/utils/utils';

export const getFormattedPoolsUniswapV3 = (pools: Pools, networkId: string): PoolsStateData => {
  const poolsObject: PoolsObject = {};
  const poolsStateData: PoolsStateData = {};

  for (const address of Object.keys(pools.current)) {
    const [volume, volumeChange] =
      pools.t1D[address] && pools.t2D[address]
        ? get2DayChange(pools.current[address].volume, pools.t1D[address].volume, pools.t2D[address].volume)
        : pools.current[address].volume
        ? [pools.current[address].volume, 0]
        : [0, 0];
    const volume1W = pools.t1W[address]
      ? pools.current[address].volume - pools.t1W[address].volume
      : pools.current[address].volume;
    const tvlChange = pools.t1D[address]
      ? ((pools.current[address].tvl - pools.t1D[address].tvl) /
          (pools.t1D[address].tvl === 0 ? 1 : pools.t1D[address].tvl)) *
        100
      : 0;
    const fees = (volume * pools.current[address].feeTier) / 1000000;
    poolsObject[address] = {
      address: pools.current[address].address,
      feeTier: pools.current[address].feeTier,
      fees,
      volume,
      volumeChange,
      volume1W,
      tvl: pools.current[address].tvl,
      tvlChange,
      token0: {
        name: pools.current[address].token0.name,
        symbol: pools.current[address].token0.symbol,
        address: pools.current[address].token0.address,
        decimals: pools.current[address].token0.decimals,
      },
      token1: {
        name: pools.current[address].token1.name,
        symbol: pools.current[address].token1.symbol,
        address: pools.current[address].token1.address,
        decimals: pools.current[address].token1.decimals,
      },
    };
  }
  poolsStateData[networkId] = {
    pools: poolsObject,
    lastUpdated: getTime(),
  };
  return poolsStateData;
};

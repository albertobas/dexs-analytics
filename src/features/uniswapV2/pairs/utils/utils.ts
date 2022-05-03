import { Pools } from 'src/features/shared/pools/entities/Pools';
import { PoolsObject, PoolsStateData } from 'src/features/shared/state/core/entities/Pools';
import { get2DayChange, getTime } from 'src/features/shared/utils/utils';

export const getFormattedPairsUniswapV2 = (pairs: Pools, networkId: string): PoolsStateData => {
  const poolsObject: PoolsObject = {};
  const poolsStateData: PoolsStateData = {};

  for (const address of Object.keys(pairs.current)) {
    const [volume, volumeChange] =
      pairs.t1D[address] && pairs.t2D[address]
        ? get2DayChange(pairs.current[address].volume, pairs.t1D[address].volume, pairs.t2D[address].volume)
        : pairs.current[address].volume
        ? [pairs.current[address].volume, 0]
        : [0, 0];
    const fees = (volume * pairs.current[address].feeTier) / 1000000;
    const volume1W = pairs.t1W[address]
      ? pairs.current[address].volume - pairs.t1W[address].volume
      : pairs.current[address].volume;
    const tvlChange = pairs.t1D[address]
      ? ((pairs.current[address].tvl - pairs.t1D[address].tvl) /
          (pairs.t1D[address].tvl === 0 ? 1 : pairs.t1D[address].tvl)) *
        100
      : 0;
    poolsObject[address] = {
      address: pairs.current[address].address,
      feeTier: pairs.current[address].feeTier,
      volume,
      volumeChange,
      volume1W,
      token0: {
        name: pairs.current[address].token0.name,
        symbol: pairs.current[address].token0.symbol,
        address: pairs.current[address].token0.address,
        decimals: pairs.current[address].token0.decimals,
      },
      token1: {
        name: pairs.current[address].token1.name,
        symbol: pairs.current[address].token1.symbol,
        address: pairs.current[address].token1.address,
        decimals: pairs.current[address].token1.decimals,
      },
      tvl: pairs.current[address].tvl,
      tvlChange,

      fees,
    };
  }
  poolsStateData[networkId] = {
    pools: poolsObject,
    lastUpdated: getTime(),
  };
  return poolsStateData;
};

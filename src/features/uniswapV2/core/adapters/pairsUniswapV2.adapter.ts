import { Pool, Pools } from 'src/features/shared/pools/core/entities/Pools';
import { PairsUniswapV2 } from 'src/features/uniswapV2/core/entities/PairsUniswapV2';

const pairsUniswapV2Adapter = (dataRaw: PairsUniswapV2): Pools => {
  const data: Pools = { current: {}, t1D: {}, t2D: {}, t1W: {} };
  for (const key of Object.keys(dataRaw)) {
    const pairsData: Record<string, Pool> = {};
    const pairs = dataRaw[key as keyof typeof dataRaw];
    for (const pair of pairs) {
      pairsData[pair.id] = {
        address: pair.id,
        feeTier: 3000,
        volume: parseFloat(pair.volumeUSD),
        tvl: parseFloat(pair.reserveUSD),
        token0: {
          address: pair.token0.id,
          name: pair.token0.name,
          symbol: pair.token0.symbol,
          decimals: parseFloat(pair.token0.decimals),
        },
        token1: {
          address: pair.token1.id,
          name: pair.token1.name,
          symbol: pair.token1.symbol,
          decimals: parseFloat(pair.token1.decimals),
        },
      };
    }
    data[key.replace('pairs_', '') as keyof typeof data] = pairsData;
  }
  return data;
};

export default pairsUniswapV2Adapter;

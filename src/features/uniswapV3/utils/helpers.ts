import { EtherPrices } from 'src/features/shared/ethers/core/entities/EtherPrices';
import { PoolsObject, PoolsStateData } from 'src/features/shared/pools/core/entities/Pools';
import { TokensObject, TokensStateData } from 'src/features/shared/tokens/core/entities/Tokens';
import { Tokens } from 'src/features/shared/tokens/core/entities/Tokens';
import { get2DayChange, getPercentChange, getTime } from 'src/features/shared/utils/helpers';
import { Pools } from 'src/features/shared/pools/core/entities/Pools';

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

export const getFormattedTokensUniswapV3 = (
  tokens: Tokens,
  etherPrices: EtherPrices,
  networkId: string
): TokensStateData => {
  const tokensObject: TokensObject = {};
  const tokensStateData: TokensStateData = {};
  for (const address of Object.keys(tokens.current)) {
    const volumeCurrent = tokens.current[address].volume;
    const volumeT1D = tokens.t1D[address] && tokens.t1D[address].volume;
    const volumeT2D = tokens.t2D[address] && tokens.t2D[address].volume;
    const volumeT1W = tokens.t1W[address] && tokens.t1W[address].volume;
    const [volume, volumeChange] =
      tokens.t1D[address] && tokens.t2D[address] && volumeCurrent && volumeT1D && volumeT2D
        ? get2DayChange(volumeCurrent, volumeT1D, volumeT2D)
        : volumeCurrent
        ? [volumeCurrent, null]
        : [null, null];
    const price = etherPrices.current ? tokens.current[address].derivedETH * etherPrices.current : 0;
    tokensObject[address] = {
      name: tokens.current[address].name,
      symbol: tokens.current[address].symbol,
      address: tokens.current[address].address,
      derivedETH: tokens.current[address].derivedETH,
      volume: volume,
      volumeChange: volumeChange,
      volume1W: tokens.t1W[address] && volumeCurrent && volumeT1W ? volumeCurrent - volumeT1W : volumeCurrent,
      tvl: tokens.current[address].tvl,
      tvlChange: tokens.t1D[address] ? getPercentChange(tokens.current[address].tvl, tokens.t1D[address].tvl) : null,
      price: price,
      priceChange: tokens.t1D[address]
        ? getPercentChange(price, etherPrices.t1D ? tokens.t1D[address].derivedETH * etherPrices.t1D : 0)
        : null,
      // priceChange1W is not currently used in the user token table. However, the idea is to keep it in case a new
      // component is implemented to show individual token stats
      priceChange1W: tokens.t1W[address] && etherPrices.t1W ? tokens.t1W[address].derivedETH * etherPrices.t1W : null,
    };
  }
  tokensStateData[networkId] = {
    tokens: tokensObject,
    lastUpdated: getTime(),
  };
  return tokensStateData;
};

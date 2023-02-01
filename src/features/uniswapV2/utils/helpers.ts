import { EtherPrices } from 'src/features/shared/ethers/core/entities/EtherPrices';
import { Pools } from 'src/features/shared/pools/core/entities/Pools';
import { Tokens } from 'src/features/shared/tokens/core/entities/Tokens';
import { PoolsObject, PoolsStateData } from 'src/features/shared/pools/core/entities/Pools';
import { get2DayChange, getTime, getPercentChange } from 'src/features/shared/utils/helpers';
import { TokensObject, TokensStateData } from 'src/features/shared/tokens/core/entities/Tokens';
import { EtherPriceUniswapV2 } from 'src/features/uniswapV2/core/entities/EtherPricesUniswapV2';

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

export const getFormattedTokensUniswapV2 = (
  tokens: Tokens,
  ethers: EtherPrices,
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
    const price = ethers.current ? tokens.current[address].derivedETH * ethers.current : 0;
    tokensObject[address] = {
      name: tokens.current[address].name,
      symbol: tokens.current[address].symbol,
      address: tokens.current[address].address,
      derivedETH: tokens.current[address].derivedETH,
      volume: volume,
      volumeChange: volumeChange,
      volume1W: tokens.t1W[address] && volumeCurrent && volumeT1W ? volumeCurrent - volumeT1W : volumeCurrent,
      tvl: tokens.current[address].tvl * ethers.current,
      tvlChange: tokens.t1D[address]
        ? getPercentChange(tokens.current[address].tvl * ethers.current, tokens.t1D[address].tvl * ethers.t1D)
        : null,
      price: price,
      priceChange: tokens.t1D[address]
        ? getPercentChange(price, ethers.t1D ? tokens.t1D[address].derivedETH * ethers.t1D : 0)
        : null,
      // priceChange1W is not currently used in the user token table. However, the idea is to keep it in case a new
      // component is implemented to show individual token stats
      priceChange1W: tokens.t1W[address] && ethers.t1W ? tokens.t1W[address].derivedETH * ethers.t1W : null,
    };
  }
  tokensStateData[networkId] = {
    tokens: tokensObject,
    lastUpdated: getTime(),
  };
  return tokensStateData;
};

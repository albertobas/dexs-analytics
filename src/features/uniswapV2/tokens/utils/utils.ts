import { Ethers } from 'src/features/shared/ethers/core/entities/Ethers';
import { Tokens } from 'src/features/shared/tokens/core/entities/Tokens';
import { TokensObject, TokensStateData } from 'src/features/shared/state/core/entities/Tokens';
import { get2DayChange, getPercentChange, getTime } from 'src/features/shared/utils/utils';

export const getFormattedTokensUniswapV2 = (tokens: Tokens, ethers: Ethers, networkId: string): TokensStateData => {
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
    const price = ethers.current ? tokens.current[address].derivedETH * ethers.current.ethPrice : 0;
    tokensObject[address] = {
      name: tokens.current[address].name,
      symbol: tokens.current[address].symbol,
      address: tokens.current[address].address,
      derivedETH: tokens.current[address].derivedETH,
      volume: volume,
      volumeChange: volumeChange,
      volume1W: tokens.t1W[address] && volumeCurrent && volumeT1W ? volumeCurrent - volumeT1W : volumeCurrent,
      tvl: tokens.current[address].tvl * ethers.current.ethPrice * tokens.current[address].derivedETH,
      tvlChange: tokens.t1D[address]
        ? getPercentChange(
            tokens.current[address].tvl * ethers.current.ethPrice * tokens.current[address].derivedETH,
            tokens.t1D[address].tvl * ethers.t1D.ethPrice * tokens.t1D[address].derivedETH
          )
        : null,
      price: price,
      priceChange: tokens.t1D[address]
        ? getPercentChange(price, ethers.t1D ? tokens.t1D[address].derivedETH * ethers.t1D.ethPrice : 0)
        : null,
      priceChangeWeek: tokens.t1W[address] && ethers.t1W ? tokens.t1W[address].derivedETH * ethers.t1W.ethPrice : null,
    };
  }
  tokensStateData[networkId] = {
    tokens: tokensObject,
    lastUpdated: getTime(),
  };
  return tokensStateData;
};

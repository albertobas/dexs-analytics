import { Token, Tokens } from 'src/features/shared/tokens/core/entities/Tokens';
import { TokensUniswapV3 } from 'src/features/uniswapV3/tokens/core/entities/TokensUniswapV3';

const tokensUniswapV3Adapter = (dataRaw: TokensUniswapV3 | undefined): Tokens | null => {
  if (dataRaw) {
    const data: Tokens = { current: {}, t1D: {}, t2D: {}, t1W: {} };
    for (const key of Object.keys(dataRaw)) {
      const tokensData: Record<string, Token> = {};
      const tokens = dataRaw[key as keyof typeof dataRaw];
      for (const token of tokens) {
        tokensData[token.id] = {
          name: token.name,
          symbol: token.symbol,
          address: token.id,
          volume: parseFloat(token.volumeUSD),
          tvl: parseFloat(token.totalValueLockedUSD),
          derivedETH: parseFloat(token.derivedETH),
        };
      }
      data[key as keyof typeof data] = tokensData;
    }
    return data;
  } else return null;
};

export default tokensUniswapV3Adapter;

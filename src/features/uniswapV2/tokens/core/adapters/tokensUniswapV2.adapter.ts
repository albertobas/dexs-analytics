import { Token, Tokens } from 'src/features/shared/tokens/core/entities/Tokens';
import { TokensUniswapV2 } from 'src/features/uniswapV2/tokens/core/entities/TokensUniswapV2';

const tokensUniswapV2Adapter = (dataRaw: TokensUniswapV2 | undefined): Tokens | null => {
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
          volume: parseFloat(token.tradeVolumeUSD),
          tvl: parseFloat(token.totalLiquidity),
          derivedETH: parseFloat(token.derivedETH),
        };
      }
      data[key as keyof typeof data] = tokensData;
    }
    return data;
  } else return null;
};

export default tokensUniswapV2Adapter;

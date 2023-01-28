import { EtherPrices } from 'src/features/shared/ethers/core/entities/EtherPrices';
import { Token, Tokens } from 'src/features/shared/tokens/core/entities/Tokens';
import { TokensAndPrices } from 'src/features/shared/tokensAndPrices/core/entities/TokensAndPrices';
import { TokensAndPricesUniswapV3 } from 'src/features/uniswapV3/core/entities/TokensUniswapV3';
import { getEtherPriceFromEtherPriceUniswapV3, getTokenFromTokenUniswapV3 } from 'src/features/uniswapV3/utils/helpers';

const tokensAndPricesUniswapV3Adapter = (dataRaw: TokensAndPricesUniswapV3 | undefined): TokensAndPrices | null => {
  let tokens: Tokens | null = null;
  let etherPrices: EtherPrices | null = null;
  if (dataRaw) {
    tokens = { current: {}, t1D: {}, t2D: {}, t1W: {} };
    const { tokens_current, tokens_t1D, tokens_t1W, tokens_t2D, price_current, price_t1D, price_t1W, price_t2D } =
      dataRaw;
    const tokensRaw = { tokens_current, tokens_t1D, tokens_t1W, tokens_t2D };
    for (const key of Object.keys(tokensRaw)) {
      const tokensData: Record<string, Token> = {};
      for (const token of tokensRaw[key as keyof typeof tokensRaw]) {
        tokensData[token.id] = getTokenFromTokenUniswapV3(token);
      }
      tokens[key.replace('tokens_', '') as keyof typeof tokens] = tokensData;
    }
    etherPrices = getEtherPriceFromEtherPriceUniswapV3(price_current, price_t1D, price_t2D, price_t1W);
    return { tokens, etherPrices };
  } else return null;
};

export default tokensAndPricesUniswapV3Adapter;

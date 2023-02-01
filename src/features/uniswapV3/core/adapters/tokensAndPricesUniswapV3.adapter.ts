import { Token } from 'src/features/shared/tokens/core/entities/Tokens';
import { TokensAndPrices } from 'src/features/shared/tokensAndPrices/core/entities/TokensAndPrices';
import { TokensAndPricesUniswapV3 } from 'src/features/uniswapV3/core/entities/TokensAndPricesUniswapV3';
import etherPricesUniswapV3Adapter from 'src/features/uniswapV3/core/adapters/etherPricesUniswapV3.adapter';

const tokensAndPricesUniswapV3Adapter = (dataRaw: TokensAndPricesUniswapV3): TokensAndPrices => {
  const tokens = { current: {}, t1D: {}, t2D: {}, t1W: {} };
  const { tokens_current, tokens_t1D, tokens_t1W, tokens_t2D, price_current, price_t1D, price_t1W, price_t2D } =
    dataRaw;
  const tokensRaw = { tokens_current, tokens_t1D, tokens_t1W, tokens_t2D };
  for (const key of Object.keys(tokensRaw)) {
    const tokensData: Record<string, Token> = {};
    for (const token of tokensRaw[key as keyof typeof tokensRaw]) {
      tokensData[token.id] = {
        name: token.name,
        symbol: token.symbol,
        address: token.id,
        volume: parseFloat(token.volumeUSD),
        tvl: parseFloat(token.totalValueLockedUSD),
        derivedETH: parseFloat(token.derivedETH),
      };
    }
    tokens[key.replace('tokens_', '') as keyof typeof tokens] = tokensData;
  }
  const etherPrices = etherPricesUniswapV3Adapter({
    current: price_current,
    t1D: price_t1D,
    t2D: price_t2D,
    t1W: price_t1W,
  });
  return { tokens, etherPrices };
};

export default tokensAndPricesUniswapV3Adapter;

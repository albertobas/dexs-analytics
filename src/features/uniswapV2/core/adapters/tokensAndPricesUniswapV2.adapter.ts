import { EtherPrices } from 'src/features/shared/ethers/core/entities/EtherPrices';
import { TokensAndPricesUniswapV2 } from 'src/features/uniswapV2/core/entities/TokensAndPricesUniswapV2';
import { Token, Tokens } from 'src/features/shared/tokens/core/entities/Tokens';
import { getEtherPriceFromEtherPriceUniswapV2 } from 'src/features/uniswapV2/utils/helpers';
import { TokensAndPrices } from 'src/features/shared/tokensAndPrices/core/entities/TokensAndPrices';

const tokensAndPricesUniswapV2Adapter = (dataRaw: TokensAndPricesUniswapV2): TokensAndPrices => {
  let tokens: Tokens | null = null;
  let etherPrices: EtherPrices | null = null;
  tokens = { current: {}, t1D: {}, t2D: {}, t1W: {} };
  const { tokens_current, tokens_t1D, tokens_t1W, tokens_t2D, price_current, price_t1D, price_t1W, price_t2D } =
    dataRaw;
  const tokensRaw = { tokens_current, tokens_t1D, tokens_t1W, tokens_t2D };
  for (const key of Object.keys(tokensRaw)) {
    const tokensData: Record<string, Token> = {};
    for (const token of tokensRaw[key as keyof typeof tokensRaw]) {
      const derivedETH = parseFloat(token.derivedETH);
      tokensData[token.id] = {
        name: token.name,
        symbol: token.symbol,
        address: token.id,
        volume: parseFloat(token.tradeVolumeUSD),
        tvl: parseFloat(token.totalLiquidity) * derivedETH,
        derivedETH,
      };
    }
    tokens[key.replace('tokens_', '') as keyof typeof tokens] = tokensData;
  }
  etherPrices = getEtherPriceFromEtherPriceUniswapV2(price_current, price_t1D, price_t2D, price_t1W);
  return { tokens, etherPrices };
};

export default tokensAndPricesUniswapV2Adapter;

import UniswapV2Repository from 'src/features/uniswapV2/core/repositories/UniswapV2.repository';
import tokensAndPricesUniswapV2Adapter from 'src/features/uniswapV2/core/adapters/tokensAndPricesUniswapV2.adapter';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { TokensAndPrices } from 'src/features/shared/tokensAndPrices/core/entities/TokensAndPrices';

const queryTokensAndPricesUniswapV2 =
  (repository: UniswapV2Repository) =>
  async (endpoint: string, blocks: Blocks): Promise<{ error: boolean; data: TokensAndPrices | null }> => {
    try {
      const data = await repository.getTokensAndPricesByBlocks(endpoint, blocks);
      return { error: false, data: data ? tokensAndPricesUniswapV2Adapter(data) : null };
    } catch (e) {
      // if an error is thrown, it will be catched and true will be passed in error for our ui logic.
      console.error(e);
      return { error: true, data: null };
    }
  };

export default queryTokensAndPricesUniswapV2;

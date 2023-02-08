import UniswapV3Repository from 'src/features/uniswapV3/core/repositories/UniswapV3.repository';
import tokensAndPricesUniswapV3Adapter from 'src/features/uniswapV3/core/adapters/tokensAndPricesUniswapV3.adapter';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { TokensAndPrices } from 'src/features/shared/tokensAndPrices/core/entities/TokensAndPrices';

const queryTokensAndPricesUniswapV3 =
  (repository: UniswapV3Repository) =>
  async (endpoint: string, blocks: Blocks): Promise<{ error: boolean; data: TokensAndPrices | null }> => {
    try {
      const data = await repository.getTokensAndPricesByBlocks(endpoint, blocks);
      return { error: false, data: data ? tokensAndPricesUniswapV3Adapter(data) : null };
    } catch (e) {
      console.error(e);
      return { error: true, data: null };
    }
  };

export default queryTokensAndPricesUniswapV3;

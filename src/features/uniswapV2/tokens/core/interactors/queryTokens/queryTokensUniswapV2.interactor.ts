import TokensUniswapV2Repository from 'src/features/uniswapV2/tokens/core/repositories/TokensUniswapV2.repository';
import tokensUniswapV2Adapter from 'src/features/uniswapV2/tokens/core/adapters/tokensUniswapV2.adapter';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { Tokens } from 'src/features/shared/tokens/core/entities/Tokens';

const queryTokensUniswapV2 =
  (tokensRepository: TokensUniswapV2Repository) =>
  async (endpoint: string, blocks: Blocks): Promise<{ error: boolean; data: Tokens | null }> => {
    try {
      const data = await tokensRepository.getByBlocks(endpoint, blocks);
      return { error: false, data: tokensUniswapV2Adapter(data) };
    } catch (e) {
      // if an error is thrown, it will be catched and true will be passed in error for our ui logic.
      console.log(e);
      return { error: true, data: null };
    }
  };

export default queryTokensUniswapV2;

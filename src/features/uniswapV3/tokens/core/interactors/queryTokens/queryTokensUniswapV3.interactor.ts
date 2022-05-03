import TokensUniswapV3Repository from 'src/features/uniswapV3/tokens/core/repositories/TokensUniswapV3.repository';
import tokensUniswapV3Adapter from 'src/features/uniswapV3/tokens/core/adapters/tokensUniswapV3.adapter';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { Tokens } from 'src/features/shared/tokens/core/entities/Tokens';

const queryTokensUniswapV3 =
  (tokensRepository: TokensUniswapV3Repository) =>
  async (endpoint: string, blocks: Blocks): Promise<{ error: boolean; data: Tokens | null }> => {
    try {
      const data = await tokensRepository.getByAddresses(endpoint, blocks);
      return { error: false, data: tokensUniswapV3Adapter(data) };
    } catch (e) {
      // if an error is thrown, it will be catched and true will be passed in error for our ui logic.
      console.log(e);
      return { error: true, data: null };
    }
  };

export default queryTokensUniswapV3;

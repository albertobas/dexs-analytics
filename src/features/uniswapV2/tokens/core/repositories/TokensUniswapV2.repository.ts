import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { TokensUniswapV2 } from 'src/features/uniswapV2/tokens/core/entities/TokensUniswapV2';

interface TokensUniswapV2Repository {
  getByBlocks(endpoint: string, blocks: Blocks): Promise<TokensUniswapV2 | undefined>;
}

export default TokensUniswapV2Repository;

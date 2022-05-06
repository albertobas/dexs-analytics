import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { TokensUniswapV3 } from 'src/features/uniswapV3/tokens/core/entities/TokensUniswapV3';

interface TokensUniswapV3Repository {
  getByBlocks(endpoint: string, blocks: Blocks): Promise<TokensUniswapV3 | undefined>;
}

export default TokensUniswapV3Repository;

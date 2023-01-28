import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { PairsUniswapV2 } from 'src/features/uniswapV2/core/entities/PairsUniswapV2';
import { TokensAndPricesUniswapV2 } from 'src/features/uniswapV2/core/entities/TokensAndPricesUniswapV2';
import { PairsTokensAndPricesUniswapV2 } from 'src/features/uniswapV2/core/entities/PairsTokensAndPricesUniswapV2';

interface UniswapV2Repository {
  getPairsByBlocks(endpoint: string, blocks: Blocks): Promise<PairsUniswapV2 | undefined>;
  getPairsTokensAndPricesByBlocks(endpoint: string, blocks: Blocks): Promise<PairsTokensAndPricesUniswapV2 | undefined>;
  getTokensAndPricesByBlocks(endpoint: string, blocks: Blocks): Promise<TokensAndPricesUniswapV2 | undefined>;
}

export default UniswapV2Repository;

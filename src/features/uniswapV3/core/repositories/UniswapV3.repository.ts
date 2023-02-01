import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { PoolsUniswapV3 } from 'src/features/uniswapV3/core/entities/PoolsUniswapV3';
import { TokensAndPricesUniswapV3 } from 'src/features/uniswapV3/core/entities/TokensAndPricesUniswapV3';
import { PoolsTokensAndPricesUniswapV3 } from 'src/features/uniswapV3/core/entities/PoolsTokensAndPricesUniswapV3';

interface UniswapV3Repository {
  getPoolsByBlocks(endpoint: string, blocks: Blocks): Promise<PoolsUniswapV3 | undefined>;
  getTokensAndPricesByBlocks(endpoint: string, blocks: Blocks): Promise<TokensAndPricesUniswapV3 | undefined>;
  getPoolsTokensAndPricesByBlocks(endpoint: string, blocks: Blocks): Promise<PoolsTokensAndPricesUniswapV3 | undefined>;
}

export default UniswapV3Repository;

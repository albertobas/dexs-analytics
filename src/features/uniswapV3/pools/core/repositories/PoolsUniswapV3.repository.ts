import { PoolsUniswapV3 } from 'src/features/uniswapV3/pools/core/entities/PoolsUniswapV3';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';

interface PoolsUniswapV3Repository {
  getByBlocks(endpoint: string, blocks: Blocks): Promise<PoolsUniswapV3 | undefined>;
}

export default PoolsUniswapV3Repository;

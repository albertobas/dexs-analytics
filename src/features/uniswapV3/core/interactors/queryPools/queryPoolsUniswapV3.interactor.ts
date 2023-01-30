import UniswapV3Repository from 'src/features/uniswapV3/core/repositories/UniswapV3.repository';
import poolsUniswapV3Adapter from 'src/features/uniswapV3/core/adapters/poolsUniswapV3.adapter';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { Pools } from 'src/features/shared/pools/core/entities/Pools';

const queryPoolsUniswapV3 =
  (repository: UniswapV3Repository) =>
  async (endpoint: string, blocks: Blocks): Promise<{ error: boolean; data: Pools | null }> => {
    try {
      const data = await repository.getPoolsByBlocks(endpoint, blocks);
      return { error: false, data: poolsUniswapV3Adapter(data) };
    } catch (e) {
      // if an error is thrown, it will be catched and true will be passed in error for our ui logic.
      console.error(e);
      return { error: true, data: null };
    }
  };

export default queryPoolsUniswapV3;
import PoolsUniswapV3Repository from 'src/features/uniswapV3/pools/core/repositories/PoolsUniswapV3.repository';
import poolsUniswapV3Adapter from 'src/features/uniswapV3/pools/core/adapters/poolsUniswapV3.adapter';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { Pools } from 'src/features/shared/pools/entities/Pools';

const queryPoolsUniswapV3 =
  (poolsRepository: PoolsUniswapV3Repository) =>
  async (endpoint: string, blocks: Blocks): Promise<{ error: boolean; data: Pools | null }> => {
    try {
      const data = await poolsRepository.getByBlocks(endpoint, blocks);
      return { error: false, data: poolsUniswapV3Adapter(data) };
    } catch (e) {
      // if an error is thrown, it will be catched and true will be passed in error for our ui logic.
      console.log(e);
      return { error: true, data: null };
    }
  };

export default queryPoolsUniswapV3;

import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { Pools } from 'src/features/shared/pools/core/entities/Pools';
import pairsUniswapV2Adapter from 'src/features/uniswapV2/core/adapters/pairsUniswapV2.adapter';
import UniswapV2Repository from 'src/features/uniswapV2/core/repositories/UniswapV2.repository';

const queryPairsUniswapV2 =
  (repository: UniswapV2Repository) =>
  async (endpoint: string, blocks: Blocks): Promise<{ error: boolean; data: Pools | null }> => {
    try {
      const data = await repository.getPairsByBlocks(endpoint, blocks);
      return { error: false, data: data ? pairsUniswapV2Adapter(data) : null };
    } catch (e) {
      // if an error is thrown, it will be catched and true will be passed in error for our ui logic.
      console.error(e);
      return { error: true, data: null };
    }
  };

export default queryPairsUniswapV2;

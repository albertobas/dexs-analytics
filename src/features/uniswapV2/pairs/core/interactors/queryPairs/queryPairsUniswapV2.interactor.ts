import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { Pools } from 'src/features/shared/pools/entities/Pools';
import pairsUniswapV2Adapter from 'src/features/uniswapV2/pairs/core/adapters/pairsUniswapV2.adapter';
import PairsUniswapV2Repository from 'src/features/uniswapV2/pairs/core/repositories/PairsUniswapV2.repository';

const queryPairsUniswapV2 =
  (pairsRepository: PairsUniswapV2Repository) =>
  async (endpoint: string, blocks: Blocks): Promise<{ error: boolean; data: Pools | null }> => {
    try {
      const data = await pairsRepository.getByAddresses(endpoint, blocks);
      return { error: false, data: pairsUniswapV2Adapter(data) };
    } catch (e) {
      // if an error is thrown, it will be catched and true will be passed in error for our ui logic.
      console.log(e);
      return { error: true, data: null };
    }
  };

export default queryPairsUniswapV2;

import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import UniswapV2Repository from 'src/features/uniswapV2/core/repositories/UniswapV2.repository';
import pairsTokensAndPricesUniswapV2Adapter from 'src/features/uniswapV2/core/adapters/pairsTokensAndPricesUniswapV2.adapter';
import { PoolsTokensAndPrices } from 'src/features/shared/poolsTokensAndPrices/core/entities/PoolsTokensAndPrices';

const queryPairsTokensAndPricesUniswapV2 =
  (repository: UniswapV2Repository) =>
  async (endpoint: string, blocks: Blocks): Promise<{ error: boolean; data: PoolsTokensAndPrices | null }> => {
    try {
      const data = await repository.getPairsTokensAndPricesByBlocks(endpoint, blocks);
      const adaptedData = data ? pairsTokensAndPricesUniswapV2Adapter(data) : null;
      return { error: false, data: adaptedData };
    } catch (e) {
      // if an error is thrown, it will be catched and true will be passed in error for our ui logic.
      console.error(e);
      return { error: true, data: null };
    }
  };

export default queryPairsTokensAndPricesUniswapV2;

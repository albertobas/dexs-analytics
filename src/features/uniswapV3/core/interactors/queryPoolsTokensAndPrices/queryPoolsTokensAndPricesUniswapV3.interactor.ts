import UniswapV3Repository from 'src/features/uniswapV3/core/repositories/UniswapV3.repository';
import poolsTokensAndPricesUniswapV3Adapter from 'src/features/uniswapV3/core/adapters/poolsTokensAndPricesUniswapV3.adapter';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { PoolsTokensAndPrices } from 'src/features/shared/poolsTokensAndPrices/core/entities/PoolsTokensAndPrices';

const queryPoolsTokensAndPricesUniswapV3 =
  (repository: UniswapV3Repository) =>
  async (endpoint: string, blocks: Blocks): Promise<{ error: boolean; data: PoolsTokensAndPrices | null }> => {
    try {
      const data = await repository.getPoolsTokensAndPricesByBlocks(endpoint, blocks);
      return { error: false, data: data ? poolsTokensAndPricesUniswapV3Adapter(data) : null };
    } catch (e) {
      // if an error is thrown, it will be catched and true will be passed in error for our ui logic.
      console.error(e);
      return { error: true, data: null };
    }
  };

export default queryPoolsTokensAndPricesUniswapV3;

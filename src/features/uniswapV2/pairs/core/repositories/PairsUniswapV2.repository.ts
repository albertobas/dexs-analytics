import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { PairsUniswapV2 } from 'src/features/uniswapV2/pairs/core/entities/PairsUniswapV2';

interface PairsUniswapV2Repository {
  getByAddresses(endpoint: string, blocks: Blocks): Promise<PairsUniswapV2 | undefined>; //: Promise<{ loading: boolean | null; error: ApolloError | undefined; data: PoolDataCollection[] | undefined }>;
}

export default PairsUniswapV2Repository;

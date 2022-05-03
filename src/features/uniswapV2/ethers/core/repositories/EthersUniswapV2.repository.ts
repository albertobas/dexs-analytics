import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { EthersUniswapV2 } from 'src/features/uniswapV2/ethers/core/entities/EthersUniswapV2';

interface EthersUniswapV2Repository {
  getPrices(endpoint: string, blocks: Blocks): Promise<EthersUniswapV2 | undefined>;
}

export default EthersUniswapV2Repository;

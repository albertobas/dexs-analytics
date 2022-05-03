import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { EthersUniswapV3 } from 'src/features/uniswapV3/ethers/core/entities/EthersUniswapV3';

interface EthersUniswapV3Repository {
  getPrices(endpoint: string, blocks: Blocks): Promise<EthersUniswapV3 | undefined>;
}

export default EthersUniswapV3Repository;

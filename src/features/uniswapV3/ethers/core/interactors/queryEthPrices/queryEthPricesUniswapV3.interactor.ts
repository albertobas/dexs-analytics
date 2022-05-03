import ethersUniswapV3Adapter from 'src/features/uniswapV3/ethers/core/adapters/ethersUniswapV3.adapter';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { Ethers } from 'src/features/shared/ethers/core/entities/Ethers';
import EthersUniswapV3Repository from 'src/features/uniswapV3/ethers/core/repositories/EthersUniswapV3.repository';

const queryEthPricesUniswapV3 =
  (ethersRepository: EthersUniswapV3Repository) =>
  async (endpoint: string, blocks: Blocks): Promise<{ error: boolean; data: Ethers | null }> => {
    try {
      const data = await ethersRepository.getPrices(endpoint, blocks);
      return { error: false, data: ethersUniswapV3Adapter(data) };
    } catch (e) {
      // if an error is thrown, it will be catched and true will be passed in error for our ui logic.
      console.log(e);
      return { error: true, data: null };
    }
  };

export default queryEthPricesUniswapV3;

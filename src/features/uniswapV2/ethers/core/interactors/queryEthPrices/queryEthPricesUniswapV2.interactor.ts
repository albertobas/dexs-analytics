import ethersUniswapV2Adapter from 'src/features/uniswapV2/ethers/core/adapters/ethersUniswapV2.adapter';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { Ethers } from 'src/features/shared/ethers/core/entities/Ethers';
import EthersUniswapV2Repository from 'src/features/uniswapV2/ethers/core/repositories/EthersUniswapV2.repository';

const queryEthPricesUniswapV2 =
  (ethersRepository: EthersUniswapV2Repository) =>
  async (endpoint: string, blocks: Blocks): Promise<{ error: boolean; data: Ethers | null }> => {
    try {
      const data = await ethersRepository.getPrices(endpoint, blocks);
      return { error: false, data: ethersUniswapV2Adapter(data) };
    } catch (e) {
      // if an error is thrown, it will be catched and true will be passed in error for our ui logic.
      console.log(e);
      return { error: true, data: null };
    }
  };

export default queryEthPricesUniswapV2;

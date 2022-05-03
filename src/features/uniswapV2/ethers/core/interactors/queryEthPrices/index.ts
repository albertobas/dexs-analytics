import queryEthPricesUniswapV2 from 'src/features/uniswapV2/ethers/core/interactors/queryEthPrices/queryEthPricesUniswapV2.interactor';
import EthersUniswapV2DataSource from 'src/features/uniswapV2/ethers/dataSources/ethersUniswapV2.datasource';

const ethersRepository = new EthersUniswapV2DataSource();

export default queryEthPricesUniswapV2(ethersRepository);

import queryEthPricesUniswapV3 from 'src/features/uniswapV3/ethers/core/interactors/queryEthPrices/queryEthPricesUniswapV3.interactor';
import EthersUniswapV3DataSource from 'src/features/uniswapV3/ethers/dataSources/ethersUniswapV3.datasource';

const ethersRepository = new EthersUniswapV3DataSource();

export default queryEthPricesUniswapV3(ethersRepository);

import UniswapV3DataSource from 'src/features/uniswapV3/dataSources/uniswapV3.datasource';
import queryTokensAndPricesUniswapV3 from 'src/features/uniswapV3/core/interactors/queryTokensAndPrices/queryTokensAndPricesUniswapV3.interactor';

const repository = new UniswapV3DataSource();

export default queryTokensAndPricesUniswapV3(repository);

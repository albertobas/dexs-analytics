import UniswapV3DataSource from 'src/features/uniswapV3/dataSources/uniswapV3.datasource';
import queryPoolsTokensAndPricesUniswapV3 from 'src/features/uniswapV3/core/interactors/queryPoolsTokensAndPrices/queryPoolsTokensAndPricesUniswapV3.interactor';

const repository = new UniswapV3DataSource();

export default queryPoolsTokensAndPricesUniswapV3(repository);

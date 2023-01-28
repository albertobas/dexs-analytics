import queryTokensAndPricesUniswapV2 from 'src/features/uniswapV2/core/interactors/queryTokensAndPrices/queryTokensAndPricesUniswapV2.interactor';
import UniswapV2DataSource from 'src/features/uniswapV2/dataSources/uniswapV2.datasource';

const repository = new UniswapV2DataSource();

export default queryTokensAndPricesUniswapV2(repository);

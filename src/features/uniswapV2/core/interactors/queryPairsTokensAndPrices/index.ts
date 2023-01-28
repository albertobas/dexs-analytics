import UniswapV2DataSource from 'src/features/uniswapV2/dataSources/uniswapV2.datasource';
import queryPairsAndTokensUniswapV2 from 'src/features/uniswapV2/core/interactors/queryPairsTokensAndPrices/queryPairsTokensAndPricesUniswapV2.interactor';

const repository = new UniswapV2DataSource();

export default queryPairsAndTokensUniswapV2(repository);

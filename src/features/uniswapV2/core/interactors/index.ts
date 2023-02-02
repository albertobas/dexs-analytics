import UniswapV2DataSource from 'src/features/uniswapV2/dataSources/uniswapV2.datasource';
import queryPairsUniswapV2 from 'src/features/uniswapV2/core/interactors/queryPairsUniswapV2.interactor';
import queryTokensAndPricesUniswapV2 from 'src/features/uniswapV2/core/interactors/queryTokensAndPricesUniswapV2.interactor';
import queryPairsTokensAndPricesUniswapV2 from 'src/features/uniswapV2/core/interactors/queryPairsTokensAndPricesUniswapV2.interactor';

const repository = new UniswapV2DataSource();

const queryPairsUniswapV2WithDep = queryPairsUniswapV2(repository);
const queryTokensAndPricesUniswapV2WithDep = queryTokensAndPricesUniswapV2(repository);
const queryPairsTokensAndPricesUniswapV2WithDep = queryPairsTokensAndPricesUniswapV2(repository);

export { queryPairsUniswapV2WithDep, queryTokensAndPricesUniswapV2WithDep, queryPairsTokensAndPricesUniswapV2WithDep };

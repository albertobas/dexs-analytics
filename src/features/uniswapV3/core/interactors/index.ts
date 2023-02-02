import UniswapV3DataSource from 'src/features/uniswapV3/dataSources/uniswapV3.datasource';
import queryPoolsUniswapV3 from 'src/features/uniswapV3/core/interactors/queryPoolsUniswapV3.interactor';
import queryPoolsTokensAndPricesUniswapV3 from 'src/features/uniswapV3/core/interactors/queryPoolsTokensAndPricesUniswapV3.interactor';
import queryTokensAndPricesUniswapV3 from 'src/features/uniswapV3/core/interactors/queryTokensAndPricesUniswapV3.interactor';

const repository = new UniswapV3DataSource();

const queryPoolsUniswapV3WithDep = queryPoolsUniswapV3(repository);
const queryTokensAndPricesUniswapV3WithDep = queryTokensAndPricesUniswapV3(repository);
const queryPoolsTokensAndPricesUniswapV3WithDep = queryPoolsTokensAndPricesUniswapV3(repository);

export { queryPoolsUniswapV3WithDep, queryTokensAndPricesUniswapV3WithDep, queryPoolsTokensAndPricesUniswapV3WithDep };

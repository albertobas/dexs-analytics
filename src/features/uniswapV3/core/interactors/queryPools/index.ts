import UniswapV3DataSource from 'src/features/uniswapV3/dataSources/uniswapV3.datasource';
import queryPoolsUniswapV3 from 'src/features/uniswapV3/core/interactors/queryPools/queryPoolsUniswapV3.interactor';

const repository = new UniswapV3DataSource();

export default queryPoolsUniswapV3(repository);

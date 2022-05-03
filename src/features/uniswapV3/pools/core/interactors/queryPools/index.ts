import PoolsUniswapV3DataSource from 'src/features/uniswapV3/pools/dataSources/poolsUniswapV3.datasource';
import queryPoolsUniswapV3 from 'src/features/uniswapV3/pools/core/interactors/queryPools/queryPoolsUniswapV3.interactor';

const poolsRepository = new PoolsUniswapV3DataSource();

export default queryPoolsUniswapV3(poolsRepository);

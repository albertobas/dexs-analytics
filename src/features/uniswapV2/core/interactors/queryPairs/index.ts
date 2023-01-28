import UniswapV2DataSource from 'src/features/uniswapV2/dataSources/uniswapV2.datasource';
import queryPairsUniswapV2 from 'src/features/uniswapV2/core/interactors/queryPairs/queryPairsUniswapV2.interactor';

const repository = new UniswapV2DataSource();

export default queryPairsUniswapV2(repository);

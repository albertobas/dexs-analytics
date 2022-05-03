import PairsUniswapV2DataSource from 'src/features/uniswapV2/pairs/dataSources/pairsUniswapV2.datasource';
import queryPairsUniswapV2 from 'src/features/uniswapV2/pairs/core/interactors/queryPairs/queryPairsUniswapV2.interactor';

const pairsRepository = new PairsUniswapV2DataSource();

export default queryPairsUniswapV2(pairsRepository);

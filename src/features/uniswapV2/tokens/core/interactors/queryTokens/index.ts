import queryTokensUniswapV2 from 'src/features/uniswapV2/tokens/core/interactors/queryTokens/queryTokensUniswapV2.interactor';
import TokensUniswapV2DataSource from 'src/features/uniswapV2/tokens/dataSources/tokensUniswapV2.datasource';

const tokensRepository = new TokensUniswapV2DataSource();

export default queryTokensUniswapV2(tokensRepository);

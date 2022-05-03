import TokensUniswapV3DataSource from 'src/features/uniswapV3/tokens/dataSources/tokensUniswapV3.datasource';
import queryTokensUniswapV3 from 'src/features/uniswapV3/tokens/core/interactors/queryTokens/queryTokensUniswapV3.interactor';

const tokensRepository = new TokensUniswapV3DataSource();

export default queryTokensUniswapV3(tokensRepository);

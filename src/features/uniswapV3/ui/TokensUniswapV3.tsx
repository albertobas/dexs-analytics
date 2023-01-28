import { useTokensUniswapV3 } from 'src/features/uniswapV3/ui/hooks/useTokensUniswapV3';
import TokensTablePagination from 'src/features/shared/tokens/ui/TokensTablePagination';

const TokensUniswapV3 = () => {
  // get tokens
  const tokensState = useTokensUniswapV3();

  return <TokensTablePagination {...tokensState} />;
};

export default TokensUniswapV3;

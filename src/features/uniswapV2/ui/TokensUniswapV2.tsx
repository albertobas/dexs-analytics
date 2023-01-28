import { useTokensUniswapV2 } from 'src/features/uniswapV2/ui/hooks/useTokensUniswapV2';
import TokensTablePagination from 'src/features/shared/tokens/ui/TokensTablePagination';

const TokensUniswapV2 = () => {
  // get tokens
  const tokensState = useTokensUniswapV2();

  return <TokensTablePagination {...tokensState} />;
};

export default TokensUniswapV2;

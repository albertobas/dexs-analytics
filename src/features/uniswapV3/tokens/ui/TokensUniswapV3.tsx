import { useUniswapV3Tokens } from 'src/features/uniswapV3/tokens/ui//hooks/useUniswapV3Tokens';
import TokensTablePagination from 'src/features/shared/tokens/ui/TokensTablePagination';

const TokensUniswapV3 = () => {
  // get tokens
  const tokens = useUniswapV3Tokens();

  return <TokensTablePagination {...tokens} />;
};

export default TokensUniswapV3;

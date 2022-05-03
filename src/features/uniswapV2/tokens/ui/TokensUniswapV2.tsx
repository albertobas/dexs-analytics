import { useUniswapV2Tokens } from 'src/features/uniswapV2/tokens/ui/hooks/useUniswapV2Tokens';
import TokensTablePagination from 'src/features/shared/tokens/ui/TokensTablePagination';

const TokensUniswapV2 = () => {
  // get tokens
  const tokens = useUniswapV2Tokens();

  return <TokensTablePagination {...tokens} />;
};

export default TokensUniswapV2;

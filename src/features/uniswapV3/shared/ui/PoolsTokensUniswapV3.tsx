import { useEffect } from 'react';
import PoolsTablePagination from 'src/features/shared/pools/ui/PoolsTablePagination';
import TokensTablePagination from 'src/features/shared/tokens/ui/TokensTablePagination';
import { useUniswapV3PoolsTokens } from 'src/features/uniswapV3/shared/ui/hooks/useUniswapV3PoolsTokens';

const PoolsTokensUniswapV3 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get data
  const { tokens, pools } = useUniswapV3PoolsTokens();

  return (
    <>
      <TokensTablePagination {...tokens} />
      <PoolsTablePagination {...pools} />
    </>
  );
};

export default PoolsTokensUniswapV3;

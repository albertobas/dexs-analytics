import { useEffect } from 'react';
import PoolsTablePagination from 'src/features/shared/pools/ui/PoolsTablePagination';
import TokensTablePagination from 'src/features/shared/tokens/ui/TokensTablePagination';
import { usePoolsTokensUniswapV3 } from 'src/features/uniswapV3/ui/hooks/usePoolsTokensUniswapV3';

const PoolsTokensUniswapV3 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get data
  const { tokensState, poolsState } = usePoolsTokensUniswapV3();

  return (
    <>
      <TokensTablePagination {...tokensState} />
      <PoolsTablePagination {...poolsState} />
    </>
  );
};

export default PoolsTokensUniswapV3;

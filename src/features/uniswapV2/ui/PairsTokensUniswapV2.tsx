import TokensTablePagination from 'src/features/shared/tokens/ui/TokensTablePagination';
import { usePairsTokensUniswapV2 } from 'src/features/uniswapV2/ui/hooks/usePairsTokensUniswapV2';
import PoolsTablePagination from 'src/features/shared/pools/ui/PoolsTablePagination';
import { useEffect } from 'react';

const PairsTokensUniswapV2 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get data
  const { tokensState, pairsState } = usePairsTokensUniswapV2();

  return (
    <>
      <TokensTablePagination {...tokensState} />
      <PoolsTablePagination {...pairsState} />
    </>
  );
};

export default PairsTokensUniswapV2;

import TokensTablePagination from 'src/features/shared/tokens/ui/TokensTablePagination';
import { useUniswapV2PairsTokens } from 'src/features/uniswapV2/shared/ui/hooks/useUniswapV2PairsTokens';
import PoolsTablePagination from 'src/features/shared/pools/ui/PoolsTablePagination';
import { useEffect } from 'react';

const PairsTokensUniswapV2 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get data
  const { tokens, pairs } = useUniswapV2PairsTokens();

  return (
    <>
      <TokensTablePagination {...tokens} />
      <PoolsTablePagination {...pairs} />
    </>
  );
};

export default PairsTokensUniswapV2;

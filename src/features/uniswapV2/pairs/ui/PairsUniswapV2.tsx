import PoolsTablePagination from 'src/features/shared/pools/ui/PoolsTablePagination';
import { useUniswapV2Pairs } from 'src/features/uniswapV2/pairs/ui/hooks/useUniswapV2Pairs';

const PairsUniswapV2 = () => {
  // get pairs
  const pairs = useUniswapV2Pairs();
  return <PoolsTablePagination {...pairs} />;
};

export default PairsUniswapV2;

import PoolsTablePagination from 'src/features/shared/pools/ui/PoolsTablePagination';
import { usePoolsUniswapV3 } from 'src/features/uniswapV3/ui/hooks/usePoolsUniswapV3';

const PoolsUniswapV3 = () => {
  //get pools
  const poolsState = usePoolsUniswapV3();

  return <PoolsTablePagination {...poolsState} />;
};

export default PoolsUniswapV3;

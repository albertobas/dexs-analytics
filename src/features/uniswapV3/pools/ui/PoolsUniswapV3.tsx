import PoolsTablePagination from 'src/features/shared/pools/ui/PoolsTablePagination';
import { useUniswapV3Pools } from 'src/features/uniswapV3/pools/ui/hooks/useUniswapV3Pools';

const PoolsUniswapV3 = () => {
  //get pools
  const pools = useUniswapV3Pools();

  return <PoolsTablePagination {...pools} />;
};

export default PoolsUniswapV3;

import PoolsTablePagination from 'src/features/shared/pools/ui/PoolsTablePagination';
import { usePairsUniswapV2 } from 'src/features/uniswapV2/ui/hooks/usePairsUniswapV2';

const PairsUniswapV2 = () => {
  // get pairs
  const pairsState = usePairsUniswapV2();

  return <PoolsTablePagination {...pairsState} />;
};

export default PairsUniswapV2;

import Pagination from 'src/features/shared/pagination/ui/Pagination';
import FallbackMessage from 'src/shared/ui/FallbackMessage';
import styles from 'src/features/shared/pools/styles/tablePool.module.css';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import { useMemo, useState } from 'react';
import { PoolsState } from 'src/features/shared/state/core/entities/Pools';
import { PoolExtended } from 'src/features/shared/pools/entities/Pools';
import { searchPools } from 'src/features/shared/utils/utils';
import PoolsTable from 'src/features/shared/pools/ui/PoolsTable';

const PoolsTablePagination = ({ loading, error, data }: PoolsState) => {
  // get protocol attributes
  const { blockchain, name, network } = useAppSelector((state) => state.protocol);

  // get filtered pools
  const query = useAppSelector((state) =>
    name === 'uniswap-v3' ? state.search.queryUniswapV3 : name === 'uniswap-v2' ? state.search.queryUniswapV2 : null
  );
  const poolData = useMemo(() => {
    if (data && network && data[network]) {
      const pools = Object.values(data[network].pools).map((p: PoolExtended) => p);
      if (query) return searchPools(pools, query);
      else return pools;
    } else return [];
  }, [data, network, query]);

  // pagination
  const itemsPerPage = 10;
  const [pageNum, setPageNum] = useState<number>(0);

  return (
    <div className={styles.containerOuter}>
      <div className={styles.containerInner}>
        <div className={styles.table}>
          {loading ? (
            <FallbackMessage message="Loading..." />
          ) : error ? (
            <FallbackMessage message="There has been a problem..." />
          ) : poolData ? (
            blockchain && name && network ? (
              <>
                <PoolsTable data={poolData} itemsPerPage={itemsPerPage} pageNum={pageNum} />
                <Pagination
                  dataLength={poolData.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={pageNum}
                  setCurrentPage={setPageNum}
                />
              </>
            ) : (
              <FallbackMessage message="There has been a problem." />
            )
          ) : (
            <FallbackMessage message="No info available" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PoolsTablePagination;

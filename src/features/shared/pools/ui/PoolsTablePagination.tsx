import Pagination from 'src/features/shared/pagination/ui/Pagination';
import FallbackMessage from 'src/shared/ui/FallbackMessage';
import styles from 'src/features/shared/pools/styles/tablePool.module.css';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import { useMemo, useState } from 'react';
import { PoolsState } from 'src/features/shared/pools/core/entities/Pools';
import { PoolExtended } from 'src/features/shared/pools/core/entities/Pools';
import { searchPools } from 'src/features/shared/utils/helpers';
import PoolsTable from 'src/features/shared/pools/ui/PoolsTable';

const PoolsTablePagination = ({ loading, error, data }: PoolsState) => {
  // get protocol attributes
  const protocolState = useAppSelector((state) => state.protocol);

  // get query
  const query = useAppSelector((state) =>
    protocolState.data
      ? protocolState.data.name === 'uniswap-v3'
        ? state.search.queryUniswapV3
        : protocolState.data.name === 'uniswap-v2'
        ? state.search.queryUniswapV2
        : null
      : null
  );

  // get filtered pools
  const poolData = useMemo(() => {
    if (data && protocolState.data && data[protocolState.data.network]) {
      const pools = Object.values(data[protocolState.data.network].pools).map((p: PoolExtended) => p);
      if (query) return searchPools(pools, query);
      else return pools;
    } else return null;
  }, [data, protocolState.data, query]);

  // pagination
  const itemsPerPage = 10;
  const [pageNum, setPageNum] = useState<number>(0);

  console.log('poolData: ', poolData);
  return (
    <div className={styles.containerOuter}>
      <div className={styles.containerInner}>
        <div className={styles.table}>
          {loading ? (
            <FallbackMessage message="Loading..." />
          ) : error ? (
            <FallbackMessage message="There has been a problem." />
          ) : poolData ? (
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
            <FallbackMessage message="No info available." />
          )}
        </div>
      </div>
    </div>
  );
};

export default PoolsTablePagination;

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Item } from 'src/features/shared/utils/core/entities/Item';
import { PoolExtended } from 'src/features/shared/pools/entities/Pools';
import RowTablePool from 'src/features/shared/pools/ui/RowTablePool';
import styles from 'src/features/shared/pools/styles/tablePool.module.css';
import { dictPools, formatAmountPercentage, sortPools } from 'src/features/shared/utils/utils';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';

type Props = { data: PoolExtended[]; itemsPerPage: number; pageNum: number };

const PoolsTable = ({ data, itemsPerPage, pageNum }: Props) => {
  const [sort, setSort] = useState<Item | null>({
    value: dictPools.tvl.value,
    label: dictPools.tvl.label,
  });
  const [reverse, setReverse] = useState<boolean>(false);
  const sortedData = useMemo(() => (sort ? sortPools(data.slice(), sort.value, reverse) : data), [data, sort, reverse]);

  // set state data
  const [stateData, setStateData] = useState<PoolExtended[]>(data.slice(0, itemsPerPage));
  useEffect(() => {
    const start = itemsPerPage * pageNum;
    setStateData((sort ? sortedData : data).slice(start, start + itemsPerPage));
  }, [data, sortedData, itemsPerPage, sort, pageNum]);

  // handle sort and reverse
  const handleSort = useCallback(
    (item: Item) => {
      if (sort?.value === item.value) setReverse((v) => !v);
      else setReverse(false);
      item ? setSort(item) : setSort(null);
    },
    [setSort, sort?.value]
  );

  const name = useAppSelector((state) => state.protocol.name);

  const pool = name === 'uniswap-v2' ? dictPools.pair : dictPools.pool;

  const sortArrow = reverse ? '↑' : '↓';

  return (
    <>
      <h2>{pool.label + 's'}</h2>
      <div className={styles.headers}>
        <div>#</div>
        <div>
          <span onClick={() => handleSort({ value: pool.value, label: pool.label })}>
            {pool.label + (sort?.value === pool.value ? ` ${sortArrow}` : '')}
          </span>
        </div>
        <div id={styles.headerTvl}>
          <span onClick={() => handleSort({ value: dictPools.tvl.value, label: dictPools.tvl.label })}>
            {dictPools.tvl.label + (sort?.value === dictPools.tvl.value ? ` ${sortArrow}` : '')}
          </span>
        </div>
        <div>
          <span onClick={() => handleSort({ value: dictPools.volume24H.value, label: dictPools.volume24H.label })}>
            {dictPools.volume24H.label + (sort?.value === dictPools.volume24H.value ? ` ${sortArrow}` : '')}
          </span>
        </div>
        <div id={styles.headerVolume1W}>
          <span onClick={() => handleSort({ value: dictPools.volume1W.value, label: dictPools.volume1W.label })}>
            {dictPools.volume1W.label + (sort?.value === dictPools.volume1W.value ? ` ${sortArrow}` : '')}
          </span>
        </div>
        <div id={styles.headerFees}>
          <span onClick={() => handleSort({ value: dictPools.fees24H.value, label: dictPools.fees24H.label })}>
            {dictPools.fees24H.label + (sort?.value === dictPools.fees24H.value ? ` ${sortArrow}` : '')}
          </span>
        </div>
      </div>
      {stateData.map((pool, index) => {
        const rowIdx = index + 1 + pageNum * itemsPerPage;
        const symbols = pool.token0.symbol + ' / ' + pool.token1.symbol;
        const rowId =
          name === 'uniswap-v3' ? (
            <>
              {symbols}
              <span>{formatAmountPercentage(pool.feeTier / 10000)}</span>
            </>
          ) : (
            symbols
          );
        return <RowTablePool key={pool.address} rowIdx={rowIdx} rowId={rowId} {...pool} />;
      })}
    </>
  );
};

export default PoolsTable;

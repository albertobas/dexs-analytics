import { PoolExtended } from 'src/features/shared/pools/core/entities/Pools';
import styles from 'src/features/shared/pools/styles/tablePool.module.css';
import { formatAmountCurrency, getPercentage } from 'src/features/shared/utils/helpers';

type Props = PoolExtended & {
  rowIdx: number;
  rowId: JSX.Element | string;
};

const RowTablePool = ({ rowIdx, rowId, tvl, tvlChange, volume, volumeChange, volume1W, fees }: Props) => {
  return (
    <div className={styles.row}>
      <div>{rowIdx}</div>
      <div id={styles.rowId}>{rowId}</div>
      <div id={styles.tvl}>
        {tvl != null ? formatAmountCurrency(tvl) : '-'}
        {tvlChange != null && (
          <span className={tvlChange >= 0 ? styles.percentagePositive : styles.percentageNegative}>
            {getPercentage(tvlChange)}
          </span>
        )}
      </div>
      <div id={styles.volume}>
        {volume != null ? formatAmountCurrency(volume) : '-'}
        {volumeChange != null && (
          <span className={volumeChange >= 0 ? styles.percentagePositive : styles.percentageNegative}>
            {getPercentage(volumeChange)}
          </span>
        )}
      </div>
      <div id={styles.volume1W}>{volume1W != null ? formatAmountCurrency(volume1W) : '-'}</div>
      <div id={styles.fees}>{formatAmountCurrency(fees)}</div>
    </div>
  );
};

export default RowTablePool;

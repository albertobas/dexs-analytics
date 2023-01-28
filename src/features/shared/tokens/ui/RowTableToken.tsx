import { TokenExtended } from 'src/features/shared/tokens/core/entities/Tokens';
import styles from 'src/features/shared/tokens/styles/tableToken.module.css';
import { formatAmountCurrency, getPercentage } from 'src/features/shared/utils/helpers';

type Props = TokenExtended & {
  rowIdx: number;
};

const RowTableToken = ({ rowIdx, name, symbol, tvl, tvlChange, volume, volumeChange, price, priceChange }: Props) => {
  return (
    <div className={styles.row}>
      <div className={styles.idx}>{rowIdx}</div>
      <div id={styles.rowId}>
        {name}
        <span>{symbol}</span>
      </div>
      <div id={styles.price}>
        {price != null ? formatAmountCurrency(price) : '-'}
        {priceChange != null && (
          <span className={priceChange >= 0 ? styles.percentagePositive : styles.percentageNegative}>
            {getPercentage(priceChange)}
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
      <div id={styles.tvl}>
        {tvl != null ? formatAmountCurrency(tvl) : '-'}
        {tvlChange != null && (
          <span className={tvlChange >= 0 ? styles.percentagePositive : styles.percentageNegative}>
            {getPercentage(tvlChange)}
          </span>
        )}
      </div>
    </div>
  );
};

export default RowTableToken;

import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import styles from 'src/app/styles/modules/blocks/blocksCount.module.css';

const BlocksCount = () => {
  const { blockchain, network } = useAppSelector((state) => state.protocol);
  const { loading, error, data } = useAppSelector((state) => state.blocks);
  let blockNumber: string = '';
  let blockDate: string = '';
  if (
    data &&
    blockchain != null &&
    network != null &&
    Object.keys(data).includes(blockchain) &&
    Object.keys(data[blockchain]).includes(network)
  ) {
    blockNumber = data[blockchain][network].blocks.current.number.toString();
    blockDate = new Date(data[blockchain][network].blocks.current.timestamp * 1000).toUTCString();
  }
  return (
    <div className={styles.container}>
      {loading ? (
        'Loading...'
      ) : error ? (
        'There has been a problem...'
      ) : data ? (
        <>
          Latest synced block:<span className={styles.blocks}>{blockNumber}</span>on
          <span className={styles.date}>{blockDate}</span>
        </>
      ) : null}
    </div>
  );
};

export default BlocksCount;

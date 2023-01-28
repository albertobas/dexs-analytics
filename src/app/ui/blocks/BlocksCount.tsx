import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import styles from 'src/app/styles/modules/blocks/blocksCount.module.css';

const BlocksCount = () => {
  const protocolState = useAppSelector((state) => state.protocol);
  const { loading, error, data } = useAppSelector((state) => state.blocks);
  let blockNumber: string = '';
  let blockDate: string = '';
  if (data && protocolState.data) {
    const { blockchain, network } = protocolState.data;
    if (
      blockchain != null &&
      network != null &&
      Object.keys(data).includes(blockchain) &&
      Object.keys(data[blockchain]).includes(network)
    ) {
      blockNumber = data[blockchain][network].blocks.current.number.toString();
      blockDate = new Date(data[blockchain][network].blocks.current.timestamp * 1000).toUTCString();
    }
  }

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading block data...</p>
      ) : error ? (
        <p>There has been a problem loading block data...</p>
      ) : data ? (
        <p>
          Latest synced block:<span className={styles.blocks}>{blockNumber}</span>on
          <span className={styles.date}>{blockDate}</span>
        </p>
      ) : (
        <p>There is no block data.</p>
      )}
    </div>
  );
};

export default BlocksCount;

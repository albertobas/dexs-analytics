import { Link } from 'react-router-dom';
import styles from 'src/app/styles/modules/dropdown/networkDropdown.module.css';
import useIsVisible from 'src/shared/ui/hooks/useIsVisible';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import { ProtocolType } from 'src/app/utils/interfaces';

const NetworkDropdown = ({ options }: { options: ProtocolType[] }) => {
  const { error, data } = useAppSelector((state) => state.protocol);

  const { isVisible, setIsVisible, ref } = useIsVisible();

  if (error || !data) {
    return <></>;
  }
  const { blockchain, network, name } = data;
  return (
    <div className={styles.container} ref={ref}>
      <button className={styles.title} onClick={() => setIsVisible((v) => !v)}>
        Network {isVisible ? '↑' : '↓'}
      </button>
      {isVisible && (
        <div className={styles.containerList}>
          <ul className={styles.list}>
            {options.map((option) => {
              const isCurrentNetwork = option === network;
              return (
                <li key={option} onClick={() => setIsVisible((v) => !v)}>
                  {isCurrentNetwork ? (
                    <span className={isCurrentNetwork ? styles.selected : undefined}>{option}</span>
                  ) : (
                    <Link
                      className={isCurrentNetwork ? styles.selected : undefined}
                      to={`/${blockchain}/${name}/${option}`}
                    >
                      {option}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NetworkDropdown;

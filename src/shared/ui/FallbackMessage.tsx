import { CSSProperties } from 'react';
import styles from 'src/shared/styles/fallbackMessage.module.css';

const FallbackMessage = ({ message, style }: { message: string; style?: CSSProperties }) => {
  return (
    <div style={style} className={styles.container}>
      {message}
    </div>
  );
};

export default FallbackMessage;

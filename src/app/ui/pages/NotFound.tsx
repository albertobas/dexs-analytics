import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from 'src/app/styles/modules/pages/home.module.css';

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.container}>
      <h2>404</h2>
      <p>
        This page does not exist. <Link to="/">Go back home</Link>
      </p>
    </div>
  );
};

export default NotFound;

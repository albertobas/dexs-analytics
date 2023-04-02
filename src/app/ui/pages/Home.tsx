import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from 'src/app/styles/modules/pages/home.module.css';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.container}>
      <h2>Find analytics of decentralized exchanges.</h2>
      <p>
        In this page you can check stats about tokens and pools of popular DEXs. Currently{' '}
        <Link to="/ethereum/uniswap-v3">Uniswap V3</Link> and <Link to="/ethereum/uniswap-v2">Uniswap V2</Link> are
        supported.
      </p>
    </div>
  );
};

export default Home;

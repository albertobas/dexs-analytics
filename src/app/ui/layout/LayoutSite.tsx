import { Link } from 'react-router-dom';
import { brand, hrefRepo } from 'src/app/utils/constants';
import styles from 'src/app/styles/modules/layout/layoutSite.module.css';
import { useLocation } from 'react-router-dom';

const LayoutSite = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const selectUniswapV2 = location.pathname.includes('uniswap-v2');
  const selectUniswapV3 = location.pathname.includes('uniswap-v3');

  return (
    <>
      <div className={styles.containerOuter}>
        <div className={styles.containerInner}>
          <h1 className={styles.title}>
            <Link to="/">{brand}</Link>
          </h1>
          <div className={styles.protocols}>
            <Link className={selectUniswapV3 ? styles.selected : undefined} to="/ethereum/uniswap-v3">
              Uniswap V3
            </Link>
            <Link className={selectUniswapV2 ? styles.selected : undefined} to="/ethereum/uniswap-v2">
              Uniswap V2
            </Link>
          </div>
        </div>
      </div>
      <main>{children}</main>
      <div className={styles.containerOuter}>
        <div className={styles.containerInner}>
          <p className={styles.footerParagraph}>
            This webpage does not track you. It is{' '}
            <a href={hrefRepo} target="_blank" rel="nofollow noreferrer noopener">
              open source
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
};
export default LayoutSite;

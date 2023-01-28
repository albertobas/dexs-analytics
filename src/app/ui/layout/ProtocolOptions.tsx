import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { setQueryUniswapV2, setQueryUniswapV3 } from 'src/app/state/searchSlice';
import NetworkDropdown from 'src/app/ui/dropdown/NetworkDropdown';
import { useAppDispatch } from 'src/app/ui/hooks/useAppDispatch';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import Search from 'src/app/ui/layout/Search';
import { dictProtocols } from 'src/app/utils/constants';
import styles from 'src/app/styles/modules/layout/protocolOptions.module.css';

const ProtocolOptions = () => {
  const dispatch = useAppDispatch();
  const { error, data } = useAppSelector((state) => state.protocol);

  const location = useLocation();

  // run clearSearch() as a cleanup function
  useEffect(() => {
    return function clearSearch() {
      if (data && data.name === 'uniswap-v2') {
        dispatch(setQueryUniswapV2(null));
      } else if (data && data.name === 'uniswap-v3') {
        dispatch(setQueryUniswapV3(null));
      }
    };
  }, [dispatch, data]);

  if (error || !data) {
    return <></>;
  }
  const { blockchain, name, network } = data;
  const pools = blockchain === 'ethereum' && name === 'uniswap-v2' ? 'pairs' : 'pools';
  const path = network === 'mainnet' ? `/${blockchain}/${name}` : `/${blockchain}/${name}/${network}`;
  const protocolsObject = blockchain && dictProtocols[blockchain as keyof typeof dictProtocols];
  const dropdownOptions = protocolsObject && (protocolsObject[name as keyof typeof protocolsObject] as string[]);
  const isOverviewSelected =
    !location.pathname.includes('tokens') &&
    !location.pathname.includes('pairs') &&
    !location.pathname.includes('pools');
  const isPoolsSelected = location.pathname.includes('pairs') || location.pathname.includes('pools');
  const isTokensSelected = location.pathname.includes('tokens');
  return (
    //
    <>
      {blockchain && name && network && (
        <div className={styles.containerOuter}>
          <div className={styles.containerInner}>
            <Link className={isOverviewSelected ? styles.selected : undefined} to={`${path}`}>
              Overview
            </Link>
            <Link className={isTokensSelected ? styles.selected : undefined} to={`${path}/tokens`}>
              Tokens
            </Link>
            <Link className={isPoolsSelected ? styles.selected : undefined} to={`${path}/${pools}`}>
              {pools}
            </Link>
            <Search />
            {dropdownOptions && dropdownOptions.length > 1 && <NetworkDropdown options={dropdownOptions} />}
          </div>
        </div>
      )}
    </>
  );
};
export default ProtocolOptions;

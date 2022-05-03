import useProtocol from 'src/app/ui/hooks/useProtocol';
import NotFound from 'src/app/ui/pages/NotFound';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ProtocolOptions from 'src/app/ui/layout/ProtocolOptions';
import PoolsUniswapV3 from 'src/features/uniswapV3/pools/ui/PoolsUniswapV3';
import PairsUniswapV2 from 'src/features/uniswapV2/pairs/ui/PairsUniswapV2';
import BlocksCount from 'src/app/ui/blocks/BlocksCount';

const Pools = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // update protocol
  const { blockchainId, protocolId, networkId } = useParams();
  const {
    protocol: { blockchain, name, network },
    updateProtocol,
  } = useProtocol();
  useEffect(() => {
    updateProtocol({ blockchainId: blockchainId, protocolId: protocolId, networkId: networkId });
  }, [blockchainId, protocolId, networkId, updateProtocol]);

  // Return 404 if protocol unknown
  if (typeof blockchain === 'undefined' || typeof name === 'undefined' || typeof network === 'undefined') {
    return <NotFound />;
  } else {
    // to avoid rendering a wrong component before updateProtocol changes the state, I match both the params
    // protocol and the validated protocol
    return (
      <>
        <ProtocolOptions />
        <BlocksCount />
        {protocolId === 'uniswap-v2' && name === 'uniswap-v2' ? (
          <PairsUniswapV2 />
        ) : protocolId === 'uniswap-v3' && name === 'uniswap-v3' ? (
          <PoolsUniswapV3 />
        ) : null}
      </>
    );
  }
};

export default Pools;

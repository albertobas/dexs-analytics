import useProtocol from 'src/app/ui/hooks/useProtocol';
import NotFound from 'src/app/ui/pages/NotFound';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ProtocolOptions from 'src/app/ui/layout/ProtocolOptions';
import PoolsUniswapV3 from 'src/features/uniswapV3/ui/PoolsUniswapV3';
import PairsUniswapV2 from 'src/features/uniswapV2/ui/PairsUniswapV2';
import BlocksCount from 'src/app/ui/blocks/BlocksCount';
import FallbackMessage from 'src/shared/ui/FallbackMessage';

const Pools = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get protocol data
  const { blockchainId, protocolId, networkId } = useParams();

  // update protocol
  const { error, data } = useProtocol(blockchainId, protocolId, networkId);

  if (error) {
    return <FallbackMessage message="There has been a problem." />;
  }
  if (error === false) {
    // Return 404 if protocol unknown
    if (data) {
      const { name } = data;
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
    return <NotFound />;
  }
  return <FallbackMessage message="Loading..." />;
};

export default Pools;

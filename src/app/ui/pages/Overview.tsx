import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useProtocol from 'src/app/ui/hooks/useProtocol';
import NotFound from 'src/app/ui/pages/NotFound';
import BlocksCount from 'src/app/ui/blocks/BlocksCount';
import ProtocolOptions from 'src/app/ui/layout/ProtocolOptions';
import PoolsTokensUniswapV3 from 'src/features/uniswapV3/ui/PoolsTokensUniswapV3';
import PairsTokensUniswapV2 from 'src/features/uniswapV2/ui/PairsTokensUniswapV2';
import FallbackMessage from 'src/shared/ui/FallbackMessage';

const Overview = () => {
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
            <PairsTokensUniswapV2 />
          ) : protocolId === 'uniswap-v3' && name === 'uniswap-v3' ? (
            <PoolsTokensUniswapV3 />
          ) : null}
        </>
      );
    }
    return <NotFound />;
  }
  return <FallbackMessage message="Loading..." />;
};

export default Overview;

import useProtocol from 'src/app/ui/hooks/useProtocol';
import NotFound from 'src/app/ui/pages/NotFound';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ProtocolOptions from 'src/app/ui/layout/ProtocolOptions';
import TokensUniswapV2 from 'src/features/uniswapV2/tokens/ui/TokensUniswapV2';
import TokensUniswapV3 from 'src/features/uniswapV3/tokens/ui/TokensUniswapV3';
import BlocksCount from 'src/app/ui/blocks/BlocksCount';

const Tokens = () => {
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
          <TokensUniswapV2 />
        ) : protocolId === 'uniswap-v3' && name === 'uniswap-v3' ? (
          <TokensUniswapV3 />
        ) : null}
      </>
    );
  }
};

export default Tokens;

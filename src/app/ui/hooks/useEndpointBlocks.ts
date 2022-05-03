import { clientsBlocks } from 'src/features/shared/clients/clientsBlocks';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';

const useEndpointBlocks = () => {
  // get protocol
  const { blockchain, network } = useAppSelector((state) => state.protocol);

  // return client
  if (blockchain === 'ethereum') {
    if (network === 'mainnet') return clientsBlocks.ethereum.mainnet;
    else if (network === 'polygon') return clientsBlocks.ethereum.polygon;
    else if (network === 'arbitrum') return clientsBlocks.ethereum.arbitrum;
    else if (network === 'optimism') return clientsBlocks.ethereum.optimism;
    else return;
  } else return;
};

export default useEndpointBlocks;

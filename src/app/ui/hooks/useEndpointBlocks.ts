import { clientsBlocks } from 'src/features/shared/clients/clientsBlocks';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';

const useEndpointBlocks = (): { error: boolean | null; data: string | null } => {
  // get protocol
  const { error, data } = useAppSelector((state) => state.protocol);

  // return client
  if (error) {
    return { error: true, data: null };
  }
  if (error === false) {
    if (data) {
      const { blockchain, network } = data;
      if (blockchain === 'ethereum') {
        if (network === 'mainnet') {
          return { error: false, data: clientsBlocks.ethereum.mainnet };
        } else if (network === 'polygon') {
          return { error: false, data: clientsBlocks.ethereum.polygon };
        } else if (network === 'arbitrum') {
          return { error: false, data: clientsBlocks.ethereum.arbitrum };
        } else if (network === 'optimism') {
          return { error: false, data: clientsBlocks.ethereum.optimism };
        } else return { error: false, data: null };
      }
      return { error: false, data: null };
    }
    return { error: false, data: null };
  }
  return { error: null, data: null };
};

export default useEndpointBlocks;

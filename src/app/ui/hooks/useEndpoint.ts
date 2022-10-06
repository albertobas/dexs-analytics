import { clients } from 'src/features/shared/clients/clients';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';

const useEndpoint = () => {
  // get protocol
  const { blockchain, name, network } = useAppSelector((state) => state.protocol);

  // return endpoint
  if (blockchain === 'ethereum') {
    if (name === 'uniswap-v3') {
      if (network === 'mainnet') return clients['uniswap-v3'].mainnet;
      else if (network === 'polygon') return clients['uniswap-v3'].polygon;
      else if (network === 'arbitrum') return clients['uniswap-v3'].arbitrum;
      else if (network === 'optimism') return clients['uniswap-v3'].optimism;
      else return;
    } else if (name === 'uniswap-v2') {
      if (network === 'mainnet') return clients['uniswap-v2'].mainnet;
      else return;
    }
  } else return;
};

export default useEndpoint;

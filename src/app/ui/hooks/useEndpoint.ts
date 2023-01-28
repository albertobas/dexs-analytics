import { clients } from 'src/features/shared/clients/clients';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';

const useEndpoint = (): { error: boolean | null; data: string | null } => {
  // get protocol
  const { error, data } = useAppSelector((state) => state.protocol);

  // return endpoint
  if (error) {
    return { error: true, data: null };
  }
  if (error === false) {
    if (data) {
      const { blockchain, name, network } = data;
      if (blockchain === 'ethereum') {
        if (name === 'uniswap-v3') {
          if (network === 'mainnet') {
            return { error: false, data: clients['uniswap-v3'].mainnet };
          } else if (network === 'polygon') {
            return { error: false, data: clients['uniswap-v3'].polygon };
          } else if (network === 'arbitrum') {
            return { error: false, data: clients['uniswap-v3'].arbitrum };
          } else if (network === 'optimism') {
            return { error: false, data: clients['uniswap-v3'].optimism };
          } else {
            return { error: false, data: null };
          }
        } else if (name === 'uniswap-v2') {
          if (network === 'mainnet') {
            return { error: false, data: clients['uniswap-v2'].mainnet };
          }
          return { error: false, data: null };
        }
        return { error: false, data: null };
      }
      return { error: false, data: null };
    }
    return { error: false, data: null };
  }
  return { error: null, data: null };
};

export default useEndpoint;

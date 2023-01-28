import { useCallback } from 'react';
import { setProtocol } from 'src/app/state/protocolSlice';
import { dictProtocols } from 'src/app/utils/constants';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import { useAppDispatch } from 'src/app/ui/hooks/useAppDispatch';

const useProtocol = () => {
  const dispatch = useAppDispatch();
  const protocol = useAppSelector((state) => state.protocol);
  const updateProtocol = useCallback(
    ({
      blockchainId,
      protocolId,
      networkId,
    }: {
      blockchainId: string | null;
      protocolId: string | null;
      networkId: string | null;
    }) => {
      if (blockchainId && protocolId) {
        if (
          Object.keys(dictProtocols).includes(blockchainId) &&
          Object.keys(dictProtocols.ethereum).includes(protocolId)
        ) {
          if (networkId) {
            if (
              blockchainId === 'ethereum' &&
              dictProtocols.ethereum[protocolId as keyof typeof dictProtocols.ethereum].includes(networkId) &&
              dictProtocols.ethereum[protocolId as keyof typeof dictProtocols.ethereum].includes(networkId)
            ) {
              dispatch(
                setProtocol({ error: false, data: { blockchain: blockchainId, name: protocolId, network: networkId } })
              );
            } else {
              dispatch(setProtocol({ error: true, data: null }));
            }
          } else {
            dispatch(
              setProtocol({ error: false, data: { blockchain: blockchainId, name: protocolId, network: 'mainnet' } })
            );
          }
        } else {
          dispatch(setProtocol({ error: true, data: null }));
        }
      } else {
        dispatch(setProtocol({ error: true, data: null }));
      }
    },
    [dispatch]
  );
  return { protocol, updateProtocol };
};

export default useProtocol;

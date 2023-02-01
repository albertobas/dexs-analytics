import { useCallback, useEffect } from 'react';
import { setProtocol } from 'src/app/state/protocolSlice';
import { dictProtocols } from 'src/app/utils/constants';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import { useAppDispatch } from 'src/app/ui/hooks/useAppDispatch';
import { BlockchainType, EthereumProtocolType } from 'src/app/utils/interfaces';

const useProtocol = (
  blockchainId: string | undefined,
  protocolId: string | undefined,
  networkId: string | undefined
) => {
  const dispatch = useAppDispatch();
  const protocol = useAppSelector((state) => state.protocol);

  const updateProtocol = useCallback(() => {
    dispatch(setProtocol({ error: null, data: null }));
    if (blockchainId && protocolId) {
      // if there is a blockchainId and a protocolId
      if (
        Object.keys(dictProtocols).includes(blockchainId) &&
        Object.keys(dictProtocols[blockchainId as BlockchainType]).includes(protocolId)
      ) {
        // if blockchainId exists in dictProtocols[blockchainId] and protocolId exists in dictProtocols[blockchainId]
        if (networkId) {
          // if there is a networkId
          if (
            blockchainId === 'ethereum' &&
            dictProtocols.ethereum[protocolId as EthereumProtocolType].includes(networkId)
          ) {
            // if blockchainId is ethereum and the networkId exists in dictProtocols.ethereum
            dispatch(
              setProtocol({ error: false, data: { blockchain: blockchainId, name: protocolId, network: networkId } })
            );
          } else {
            // if blockchainId is not ethereum or it is but the networkId does not exist in dictProtocols.ethereum UI will return not found
            dispatch(setProtocol({ error: false, data: null }));
          }
        } else {
          // if not assume it is mainnet
          dispatch(
            setProtocol({ error: false, data: { blockchain: blockchainId, name: protocolId, network: 'mainnet' } })
          );
        }
      } else {
        // if blockchainId is not in dictProtocols or it is but the networkId does not exist in dictProtocols[blockchainId] UI will return not found
        dispatch(setProtocol({ error: false, data: null }));
      }
    } else {
      // if there is no blockchainId and/or protocolId raise an error
      dispatch(setProtocol({ error: true, data: null }));
    }
  }, [dispatch, blockchainId, protocolId, networkId]);

  useEffect(() => {
    updateProtocol();
  }, [updateProtocol]);

  return protocol;
};

export default useProtocol;

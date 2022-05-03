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
      blockchainId: string | undefined;
      protocolId: string | undefined;
      networkId: string | undefined;
    }) => {
      const blockchain: string | null | undefined =
        blockchainId && Object.keys(dictProtocols).includes(blockchainId) ? blockchainId : undefined;
      const name: string | null | undefined =
        protocolId && blockchainId === 'ethereum'
          ? Object.keys(dictProtocols.ethereum).includes(protocolId)
            ? protocolId
            : undefined
          : undefined;

      const network: string | null | undefined =
        blockchainId && protocolId && networkId
          ? blockchainId === 'ethereum' &&
            dictProtocols.ethereum[protocolId as keyof typeof dictProtocols.ethereum].includes(networkId)
            ? networkId
            : undefined
          : blockchainId && protocolId && 'mainnet';
      dispatch(setProtocol({ blockchain, name, network }));
    },
    [dispatch]
  );
  return { protocol, updateProtocol };
};

export default useProtocol;

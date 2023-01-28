import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'src/app/ui/hooks/useAppDispatch';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import { setPairsUniswapV2 } from 'src/features/uniswapV2/state/pairsUniswapV2Slice';
import useEndpoint from 'src/app/ui/hooks/useEndpoint';
import queryPairsUniswapV2 from 'src/features/uniswapV2/core/interactors/queryPairs';
import { getTimestamps, shouldFetch } from 'src/features/shared/utils/helpers';
import { getFormattedPairsUniswapV2 } from 'src/features/uniswapV2/utils/helpers';
import useEndpointBlocks from 'src/app/ui/hooks/useEndpointBlocks';
import { setBlocks } from 'src/features/shared/blocks/state/blocksSlice';
import queryBlocksEthereum from 'src/features/shared/blocks/core/interactors/queryBlocksEthereum';
import { getFormattedBlocks } from 'src/features/shared/blocks/ui/utils/helpers';

export function usePairsUniswapV2() {
  const dispatch = useAppDispatch();
  const pairsState = useAppSelector((state) => state.pairsUniswapV2);
  const protocolState = useAppSelector((state) => state.protocol);
  const endpoint = useEndpoint();
  const endpointBlocks = useEndpointBlocks();
  const shouldFetchPairs = Boolean(protocolState.data && shouldFetch(pairsState.data, protocolState.data.network));

  // create a callback function with the use cases
  const fetchData = useCallback(async () => {
    dispatch(setBlocks({ loading: true, error: null }));
    dispatch(setPairsUniswapV2({ loading: true, error: null }));
    if (protocolState.error || endpoint.error || endpointBlocks.error) {
      dispatch(setPairsUniswapV2({ loading: false, error: true }));
    } else {
      if (protocolState.data && endpoint.data && endpointBlocks.data) {
        const { blockchain, network } = protocolState.data;
        const [t1D, t2D, t1W] = getTimestamps();
        const { error: errorBlock, data: blocks } = await queryBlocksEthereum(endpointBlocks.data, { t1D, t2D, t1W });
        if (errorBlock) {
          dispatch(setBlocks({ loading: false, error: true }));
          dispatch(setPairsUniswapV2({ loading: false, error: true }));
        } else if (blocks) {
          const formattedBlocks = getFormattedBlocks(blocks, blockchain, network);
          dispatch(setBlocks({ loading: false, error: false, data: formattedBlocks }));
          const { error, data } = await queryPairsUniswapV2(endpoint.data, blocks);
          if (error) {
            dispatch(setPairsUniswapV2({ loading: false, error: true }));
          } else {
            if (data) {
              const formattedData = getFormattedPairsUniswapV2(data, network);
              dispatch(setPairsUniswapV2({ loading: false, error: false, data: formattedData }));
            } else {
              dispatch(setPairsUniswapV2({ loading: false, error: false }));
            }
          }
        }
      } else {
        dispatch(setPairsUniswapV2({ loading: false, error: true }));
      }
    }
  }, [
    dispatch,
    endpoint.data,
    endpoint.error,
    endpointBlocks.data,
    endpointBlocks.error,
    protocolState.data,
    protocolState.error,
  ]);

  useEffect(() => {
    if (shouldFetchPairs) {
      fetchData();
    }
  }, [fetchData, shouldFetchPairs]);

  // return response and callback
  return pairsState;
}

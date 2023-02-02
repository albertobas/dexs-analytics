import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'src/app/ui/hooks/useAppDispatch';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import useEndpoint from 'src/app/ui/hooks/useEndpoint';
import { setPairsUniswapV2 } from 'src/features/uniswapV2/state/pairsUniswapV2Slice';
import queryBlocksEthereumWithDep from 'src/features/shared/blocks/core/interactors';
import { queryPairsTokensAndPricesUniswapV2WithDep } from 'src/features/uniswapV2/core/interactors';
import { setTokensUniswapV2 } from 'src/features/uniswapV2/state/tokensUniswapV2Slice';
import { getFormattedPairsUniswapV2 } from 'src/features/uniswapV2/utils/helpers';
import { getFormattedTokensUniswapV2 } from 'src/features/uniswapV2/utils/helpers';
import { getTimestamps, shouldFetch } from 'src/features/shared/utils/helpers';
import useEndpointBlocks from 'src/app/ui/hooks/useEndpointBlocks';
import { setBlocks } from 'src/features/shared/blocks/state/blocksSlice';
import { getFormattedBlocks } from 'src/features/shared/blocks/ui/utils/helpers';

export function usePairsTokensUniswapV2() {
  const dispatch = useAppDispatch();
  const pairsState = useAppSelector((state) => state.pairsUniswapV2);
  const tokensState = useAppSelector((state) => state.tokensUniswapV2);
  const protocolState = useAppSelector((state) => state.protocol);
  const endpoint = useEndpoint();
  const endpointBlocks = useEndpointBlocks();
  const shouldFetchData = Boolean(
    protocolState.data &&
      (shouldFetch(pairsState.data, protocolState.data.network) ||
        shouldFetch(tokensState.data, protocolState.data.network))
  );

  // create a callback function with the use cases
  const fetchData = useCallback(async () => {
    dispatch(setBlocks({ loading: true, error: null }));
    dispatch(setPairsUniswapV2({ loading: true, error: null }));
    dispatch(setTokensUniswapV2({ loading: true, error: null }));
    if (protocolState.error || endpoint.error || endpointBlocks.error) {
      dispatch(setPairsUniswapV2({ loading: false, error: true, data: null }));
      dispatch(setTokensUniswapV2({ loading: false, error: true, data: null }));
    } else {
      if (protocolState.data && endpoint.data && endpointBlocks.data) {
        const { blockchain, network } = protocolState.data;
        const [t1D, t2D, t1W] = getTimestamps();
        const { error: errorBlock, data: blocks } = await queryBlocksEthereumWithDep(endpointBlocks.data, {
          t1D,
          t2D,
          t1W,
        });
        if (errorBlock) {
          dispatch(setBlocks({ loading: false, error: true }));
          dispatch(setPairsUniswapV2({ loading: false, error: true }));
          dispatch(setTokensUniswapV2({ loading: false, error: true }));
        } else if (blocks) {
          const formattedBlocks = getFormattedBlocks(blocks, blockchain, network);
          dispatch(setBlocks({ loading: false, error: false, data: formattedBlocks }));
          const { error, data } = await queryPairsTokensAndPricesUniswapV2WithDep(endpoint.data, blocks);
          if (error) {
            dispatch(setPairsUniswapV2({ loading: false, error: true }));
            dispatch(setTokensUniswapV2({ loading: false, error: true }));
          } else {
            if (data) {
              const { pools, tokens, etherPrices } = data;
              const formattedPairs = getFormattedPairsUniswapV2(pools, network);
              const formattedTokens = getFormattedTokensUniswapV2(tokens, etherPrices, network);
              dispatch(setPairsUniswapV2({ loading: false, error: false, data: formattedPairs }));
              dispatch(setTokensUniswapV2({ loading: false, error: false, data: formattedTokens }));
            } else {
              dispatch(setPairsUniswapV2({ loading: false, error: false }));
              dispatch(setTokensUniswapV2({ loading: false, error: false }));
            }
          }
        }
      } else {
        dispatch(setPairsUniswapV2({ loading: false, error: true }));
        dispatch(setTokensUniswapV2({ loading: false, error: true }));
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
    // if should fetch pairs or tokens, fetch them both on the same query using the interactor queryPairsTokensAndPricesUniswapV2
    if (shouldFetchData) {
      fetchData();
    }
  }, [fetchData, shouldFetchData]);

  // return response and callback
  return { pairsState, tokensState };
}

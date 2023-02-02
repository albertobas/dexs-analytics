import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'src/app/ui/hooks/useAppDispatch';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import useEndpoint from 'src/app/ui/hooks/useEndpoint';
import { setTokensUniswapV2 } from 'src/features/uniswapV2/state/tokensUniswapV2Slice';
import { queryTokensAndPricesUniswapV2WithDep } from 'src/features/uniswapV2/core/interactors';
import { getFormattedTokensUniswapV2 } from 'src/features/uniswapV2/utils/helpers';
import { getTimestamps, shouldFetch } from 'src/features/shared/utils/helpers';
import useEndpointBlocks from 'src/app/ui/hooks/useEndpointBlocks';
import { setBlocks } from 'src/features/shared/blocks/state/blocksSlice';
import queryBlocksEthereumWithDep from 'src/features/shared/blocks/core/interactors';
import { getFormattedBlocks } from 'src/features/shared/blocks/ui/utils/helpers';

export function useTokensUniswapV2() {
  const dispatch = useAppDispatch();
  const tokensState = useAppSelector((state) => state.tokensUniswapV2);
  const protocolState = useAppSelector((state) => state.protocol);
  const endpoint = useEndpoint();
  const endpointBlocks = useEndpointBlocks();
  const shouldFetchTokens = Boolean(protocolState.data && shouldFetch(tokensState.data, protocolState.data.network));

  // create a callback function with the use cases
  const fetchData = useCallback(async () => {
    dispatch(setBlocks({ loading: true, error: null }));
    dispatch(setTokensUniswapV2({ loading: true, error: null }));
    if (protocolState.error || endpoint.error || endpointBlocks.error) {
      dispatch(setTokensUniswapV2({ loading: false, error: true }));
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
          dispatch(setTokensUniswapV2({ loading: false, error: true }));
        } else if (blocks) {
          const formattedBlocks = getFormattedBlocks(blocks, blockchain, network);
          dispatch(setBlocks({ loading: false, error: false, data: formattedBlocks }));
          const { error, data } = await queryTokensAndPricesUniswapV2WithDep(endpoint.data, blocks);
          if (error) {
            dispatch(setTokensUniswapV2({ loading: false, error: true }));
          } else {
            if (data) {
              const { tokens, etherPrices } = data;
              const formattedData = getFormattedTokensUniswapV2(tokens, etherPrices, network);
              dispatch(setTokensUniswapV2({ loading: false, error: false, data: formattedData }));
            } else {
              dispatch(setTokensUniswapV2({ loading: false, error: false }));
            }
          }
        }
      } else {
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
    if (shouldFetchTokens) {
      fetchData();
    }
  }, [fetchData, shouldFetchTokens]);

  // return response and callback
  return tokensState;
}

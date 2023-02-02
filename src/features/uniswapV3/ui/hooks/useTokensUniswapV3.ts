import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'src/app/ui/hooks/useAppDispatch';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import useEndpoint from 'src/app/ui/hooks/useEndpoint';
import useEndpointBlocks from 'src/app/ui/hooks/useEndpointBlocks';
import queryBlocksEthereumWithDep from 'src/features/shared/blocks/core/interactors';
import { queryTokensAndPricesUniswapV3WithDep } from 'src/features/uniswapV3/core/interactors';
import { setBlocks } from 'src/features/shared/blocks/state/blocksSlice';
import { setTokensUniswapV3 } from 'src/features/uniswapV3/state/tokensUniswapV3Slice';
import { getFormattedBlocks } from 'src/features/shared/blocks/ui/utils/helpers';
import { getFormattedTokensUniswapV3 } from 'src/features/uniswapV3/utils/helpers';
import { getTimestamps, shouldFetch } from 'src/features/shared/utils/helpers';

export function useTokensUniswapV3() {
  const dispatch = useAppDispatch();
  const tokensState = useAppSelector((state) => state.tokensUniswapV3);
  const protocolState = useAppSelector((state) => state.protocol);
  const endpoint = useEndpoint();
  const endpointBlocks = useEndpointBlocks();
  const shouldFetchTokens = Boolean(protocolState.data && shouldFetch(tokensState.data, protocolState.data.network));

  // create a callback function with the use cases
  const fetchData = useCallback(async () => {
    dispatch(setBlocks({ loading: true, error: null }));
    dispatch(setTokensUniswapV3({ loading: true, error: null }));
    if (protocolState.error || endpoint.error || endpointBlocks.error) {
      dispatch(setTokensUniswapV3({ loading: false, error: true, data: null }));
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
          dispatch(setBlocks({ loading: false, error: true, data: null }));
          dispatch(setTokensUniswapV3({ loading: false, error: true, data: null }));
        } else if (blocks) {
          const formattedBlocks = getFormattedBlocks(blocks, blockchain, network);
          dispatch(setBlocks({ loading: false, error: false, data: formattedBlocks }));
          const { error, data } = await queryTokensAndPricesUniswapV3WithDep(endpoint.data, blocks);
          if (error) {
            dispatch(setTokensUniswapV3({ loading: false, error: true, data: null }));
          } else {
            if (data) {
              const { tokens, etherPrices } = data;
              const formattedData = getFormattedTokensUniswapV3(tokens, etherPrices, network);
              dispatch(setTokensUniswapV3({ loading: false, error: false, data: formattedData }));
            } else {
              dispatch(setTokensUniswapV3({ loading: false, error: false, data: null }));
            }
          }
        }
      } else {
        dispatch(setTokensUniswapV3({ loading: false, error: true, data: null }));
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

import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'src/app/ui/hooks/useAppDispatch';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import useEndpoint from 'src/app/ui/hooks/useEndpoint';
import useEndpointBlocks from 'src/app/ui/hooks/useEndpointBlocks';
import queryBlocksEthereumWithDep from 'src/features/shared/blocks/core/interactors';
import { queryPoolsTokensAndPricesUniswapV3WithDep } from 'src/features/uniswapV3/core/interactors';
import { setPoolsUniswapV3 } from 'src/features/uniswapV3/state/poolsUniswapV3Slice';
import { setBlocks } from 'src/features/shared/blocks/state/blocksSlice';
import { setTokensUniswapV3 } from 'src/features/uniswapV3/state/tokensUniswapV3Slice';
import { getFormattedTokensUniswapV3 } from 'src/features/uniswapV3/utils/helpers';
import { getFormattedPoolsUniswapV3 } from 'src/features/uniswapV3/utils/helpers';
import { getTimestamps, shouldFetch } from 'src/features/shared/utils/helpers';
import { getFormattedBlocks } from 'src/features/shared/blocks/ui/utils/helpers';

export function usePoolsTokensUniswapV3() {
  const dispatch = useAppDispatch();
  const poolsState = useAppSelector((state) => state.poolsUniswapV3);
  const tokensState = useAppSelector((state) => state.tokensUniswapV3);
  const protocolState = useAppSelector((state) => state.protocol);
  const endpoint = useEndpoint();
  const endpointBlocks = useEndpointBlocks();
  const shouldFetchData = Boolean(
    protocolState.data &&
      (shouldFetch(poolsState.data, protocolState.data.network) ||
        shouldFetch(tokensState.data, protocolState.data.network))
  );

  // create a callback function with the use cases
  const fetchData = useCallback(async () => {
    dispatch(setBlocks({ loading: true, error: null }));
    dispatch(setPoolsUniswapV3({ loading: true, error: null }));
    dispatch(setTokensUniswapV3({ loading: true, error: null }));
    if (protocolState.error || endpoint.error || endpointBlocks.error) {
      dispatch(setPoolsUniswapV3({ loading: false, error: true }));
      dispatch(setTokensUniswapV3({ loading: false, error: true }));
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
          dispatch(setPoolsUniswapV3({ loading: false, error: true }));
          dispatch(setTokensUniswapV3({ loading: false, error: true }));
        } else if (blocks) {
          const formattedBlocks = getFormattedBlocks(blocks, blockchain, network);
          dispatch(setBlocks({ loading: false, error: false, data: formattedBlocks }));
          const { error, data } = await queryPoolsTokensAndPricesUniswapV3WithDep(endpoint.data, blocks);
          if (error) {
            dispatch(setPoolsUniswapV3({ loading: false, error: true }));
            dispatch(setTokensUniswapV3({ loading: false, error: true }));
          } else {
            if (data) {
              const { pools, tokens, etherPrices } = data;
              const formattedPools = getFormattedPoolsUniswapV3(pools, network);
              const formattedTokens = getFormattedTokensUniswapV3(tokens, etherPrices, network);
              dispatch(setPoolsUniswapV3({ loading: false, error: false, data: formattedPools }));
              dispatch(setTokensUniswapV3({ loading: false, error: false, data: formattedTokens }));
            } else {
              dispatch(setPoolsUniswapV3({ loading: false, error: false }));
              dispatch(setTokensUniswapV3({ loading: false, error: false }));
            }
          }
        }
      } else {
        dispatch(setPoolsUniswapV3({ loading: false, error: true }));
        dispatch(setTokensUniswapV3({ loading: false, error: true }));
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
    // if should fetch pools or tokens, fetch them both on the same query using the interactor queryPoolsTokensAndPricesUniswapV3
    if (shouldFetchData) {
      fetchData();
    }
  }, [fetchData, shouldFetchData]);

  // return response and callback
  return { poolsState, tokensState };
}

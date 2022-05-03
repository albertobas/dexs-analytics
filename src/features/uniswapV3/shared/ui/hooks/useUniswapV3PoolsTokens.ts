import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'src/app/ui/hooks/useAppDispatch';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import useEndpoint from 'src/app/ui/hooks/useEndpoint';
import useEndpointBlocks from 'src/app/ui/hooks/useEndpointBlocks';
import queryPools from 'src/features/uniswapV3/pools/core/interactors/queryPools';
import queryBlocksEthereum from 'src/features/shared/blocks/core/interactors/queryBlocksEthereum';
import queryEthPrices from 'src/features/uniswapV3/ethers/core/interactors/queryEthPrices';
import queryTokens from 'src/features/uniswapV3/tokens/core/interactors/queryTokens';
import { setPoolsUniswapV3 } from 'src/features/uniswapV3/pools/state/poolsUniswapV3Slice';
import { setBlocks } from 'src/features/shared/blocks/state/blocksSlice';
import { setTokensUniswapV3 } from 'src/features/uniswapV3/tokens/state/tokensUniswapV3Slice';
import { getFormattedTokensUniswapV3 } from 'src/features/uniswapV3/tokens/utils/utils';
import { getFormattedPoolsUniswapV3 } from 'src/features/uniswapV3/pools/utils/utils';
import { getTimestamps, shouldFetch } from 'src/features/shared/utils/utils';
import { getFormattedBlocks } from 'src/features/shared/blocks/ui/utils/utils';

export function useUniswapV3PoolsTokens() {
  const dispatch = useAppDispatch();
  const pools = useAppSelector((state) => state.poolsUniswapV3);
  const tokens = useAppSelector((state) => state.tokensUniswapV3);
  const { blockchain, network } = useAppSelector((state) => state.protocol);
  const endpoint = useEndpoint();
  const endpointBlocks = useEndpointBlocks();
  const shouldFetchPools = shouldFetch(pools, network);
  const shouldFetchTokens = shouldFetch(tokens, network);

  // create a callback function with the use cases
  const fetchData = useCallback(async () => {
    dispatch(setBlocks({ loading: true, error: false }));
    shouldFetchTokens && dispatch(setTokensUniswapV3({ loading: true, error: false }));
    shouldFetchPools && dispatch(setPoolsUniswapV3({ loading: true, error: false }));
    if (typeof endpoint !== 'undefined' && typeof endpointBlocks !== 'undefined' && blockchain && network) {
      const [t1D, t2D, t1W] = getTimestamps();
      const { error: errorBlock, data: blocks } = await queryBlocksEthereum(endpointBlocks, { t1D, t2D, t1W });
      if (errorBlock) {
        dispatch(setBlocks({ loading: false, error: true }));
        shouldFetchTokens && dispatch(setTokensUniswapV3({ loading: false, error: true }));
        shouldFetchPools && dispatch(setPoolsUniswapV3({ loading: false, error: true }));
      } else if (blocks) {
        const formattedBlocks = getFormattedBlocks(blocks, blockchain, network);
        dispatch(setBlocks({ loading: false, error: false, data: formattedBlocks }));
        const [{ error: errorEthers, data: ethers }, tokensResponse, poolsResponse] = await Promise.all([
          queryEthPrices(endpoint, blocks),
          shouldFetchTokens && queryTokens(endpoint, blocks),
          shouldFetchPools && queryPools(endpoint, blocks),
        ]);
        if ((tokensResponse && tokensResponse.error) || errorEthers) {
          dispatch(setTokensUniswapV3({ loading: false, error: true }));
        } else if (tokensResponse && tokensResponse.data && ethers) {
          const formattedTokens = getFormattedTokensUniswapV3(tokensResponse.data, ethers, network);
          dispatch(setTokensUniswapV3({ loading: false, error: false, data: formattedTokens }));
        }
        if (poolsResponse && poolsResponse.error) {
          dispatch(setPoolsUniswapV3({ loading: false, error: true }));
        } else if (poolsResponse && poolsResponse.data) {
          const formattedPools = getFormattedPoolsUniswapV3(poolsResponse.data, network);
          dispatch(setPoolsUniswapV3({ loading: false, error: false, data: formattedPools }));
        }
      }
    }
  }, [endpoint, endpointBlocks, dispatch, blockchain, network, shouldFetchPools, shouldFetchTokens]);

  useEffect(() => {
    if (shouldFetchPools) {
      fetchData();
    }
  }, [shouldFetchPools, fetchData]);

  useEffect(() => {
    if (shouldFetchTokens) {
      fetchData();
    }
  }, [shouldFetchTokens, fetchData]);

  // return response and callback
  return { pools, tokens };
}

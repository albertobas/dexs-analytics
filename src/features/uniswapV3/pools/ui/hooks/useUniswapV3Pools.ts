import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'src/app/ui/hooks/useAppDispatch';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import useEndpoint from 'src/app/ui/hooks/useEndpoint';
import useEndpointBlocks from 'src/app/ui/hooks/useEndpointBlocks';
import queryBlocksEthereum from 'src/features/shared/blocks/core/interactors/queryBlocksEthereum';
import queryPools from 'src/features/uniswapV3/pools/core/interactors/queryPools';
import { setBlocks } from 'src/features/shared/blocks/state/blocksSlice';
import { setPoolsUniswapV3 } from 'src/features/uniswapV3/pools/state/poolsUniswapV3Slice';
import { getFormattedPoolsUniswapV3 } from 'src/features/uniswapV3/pools/utils/utils';
import { getTimestamps, shouldFetch } from 'src/features/shared/utils/utils';
import { getFormattedBlocks } from 'src/features/shared/blocks/ui/utils/utils';

export function useUniswapV3Pools() {
  const dispatch = useAppDispatch();
  const pools = useAppSelector((state) => state.poolsUniswapV3);
  const { blockchain, network } = useAppSelector((state) => state.protocol);
  const endpoint = useEndpoint();
  const endpointBlocks = useEndpointBlocks();

  // create a callback function with the use cases
  const fetchPools = useCallback(async () => {
    dispatch(setBlocks({ loading: true, error: false }));
    dispatch(setPoolsUniswapV3({ loading: true, error: false }));
    if (typeof endpoint !== 'undefined' && typeof endpointBlocks !== 'undefined' && blockchain && network) {
      const [t1D, t2D, t1W] = getTimestamps();
      const { error: errorBlock, data: blocks } = await queryBlocksEthereum(endpointBlocks, { t1D, t2D, t1W });
      if (errorBlock) {
        dispatch(setBlocks({ loading: false, error: true }));
        dispatch(setPoolsUniswapV3({ loading: false, error: true }));
      } else if (blocks) {
        const formattedBlocks = getFormattedBlocks(blocks, blockchain, network);
        dispatch(setBlocks({ loading: false, error: false, data: formattedBlocks }));
        const { error, data } = await queryPools(endpoint, blocks);
        if (error) {
          dispatch(setPoolsUniswapV3({ loading: false, error: true }));
        } else if (data && network) {
          const formattedData = getFormattedPoolsUniswapV3(data, network);
          dispatch(setPoolsUniswapV3({ loading: false, error: false, data: formattedData }));
        } else {
          dispatch(setPoolsUniswapV3({ loading: false, error: true }));
        }
      }
    }
  }, [endpoint, endpointBlocks, dispatch, blockchain, network]);

  useEffect(() => {
    if (shouldFetch(pools, network)) {
      fetchPools();
    }
  }, [fetchPools, pools, network]);

  // return response and callback
  return pools;
}

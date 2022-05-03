import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'src/app/ui/hooks/useAppDispatch';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import { setPairsUniswapV2 } from 'src/features/uniswapV2/pairs/state/pairsUniswapV2Slice';
import useEndpoint from 'src/app/ui/hooks/useEndpoint';
import queryPairsUniswapV2 from 'src/features/uniswapV2/pairs/core/interactors/queryPairs';
import { getTimestamps, shouldFetch } from 'src/features/shared/utils/utils';
import { getFormattedPairsUniswapV2 } from 'src/features/uniswapV2/pairs/utils/utils';
import useEndpointBlocks from 'src/app/ui/hooks/useEndpointBlocks';
import { setBlocks } from 'src/features/shared/blocks/state/blocksSlice';
import queryBlocksEthereum from 'src/features/shared/blocks/core/interactors/queryBlocksEthereum';
import { getFormattedBlocks } from 'src/features/shared/blocks/ui/utils/utils';

export function useUniswapV2Pairs() {
  const dispatch = useAppDispatch();
  const pairs = useAppSelector((state) => state.pairsUniswapV2);
  const { blockchain, network } = useAppSelector((state) => state.protocol);
  const endpoint = useEndpoint();
  const endpointBlocks = useEndpointBlocks();

  // create a callback function with the use cases

  const fetchPairs = useCallback(async () => {
    dispatch(setBlocks({ loading: true, error: false }));
    dispatch(setPairsUniswapV2({ loading: true, error: false }));
    if (typeof endpoint !== 'undefined' && typeof endpointBlocks !== 'undefined' && blockchain && network) {
      const [t1D, t2D, t1W] = getTimestamps();
      const { error: errorBlock, data: blocks } = await queryBlocksEthereum(endpointBlocks, { t1D, t2D, t1W });
      if (errorBlock) {
        dispatch(setBlocks({ loading: false, error: true }));
        dispatch(setPairsUniswapV2({ loading: false, error: true }));
      } else if (blocks) {
        const formattedBlocks = getFormattedBlocks(blocks, blockchain, network);
        dispatch(setBlocks({ loading: false, error: false, data: formattedBlocks }));
        const { error, data } = await queryPairsUniswapV2(endpoint, blocks);
        if (error) {
          dispatch(setPairsUniswapV2({ loading: false, error: true }));
        } else if (data && network) {
          const formattedData = getFormattedPairsUniswapV2(data, network);
          dispatch(setPairsUniswapV2({ loading: false, error: false, data: formattedData }));
        } else {
          dispatch(setPairsUniswapV2({ loading: false, error: true }));
        }
      }
    }
  }, [endpoint, endpointBlocks, dispatch, blockchain, network]);

  useEffect(() => {
    if (shouldFetch(pairs, network)) {
      fetchPairs();
    }
  }, [fetchPairs, pairs, network]);

  // return response and callback
  return pairs;
}

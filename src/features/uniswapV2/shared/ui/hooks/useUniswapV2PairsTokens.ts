import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'src/app/ui/hooks/useAppDispatch';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import useEndpoint from 'src/app/ui/hooks/useEndpoint';
import { setPairsUniswapV2 } from 'src/features/uniswapV2/pairs/state/pairsUniswapV2Slice';
import queryPairs from 'src/features/uniswapV2/pairs/core/interactors/queryPairs';
import { setTokensUniswapV2 } from 'src/features/uniswapV2/tokens/state/tokensUniswapV2Slice';
import queryEthPrices from 'src/features/uniswapV2/ethers/core/interactors/queryEthPrices';
import queryTokens from 'src/features/uniswapV2/tokens/core/interactors/queryTokens';
import { getFormattedPairsUniswapV2 } from 'src/features/uniswapV2/pairs/utils/utils';
import { getFormattedTokensUniswapV2 } from 'src/features/uniswapV2/tokens/utils/utils';
import { getTimestamps, shouldFetch } from 'src/features/shared/utils/utils';
import useEndpointBlocks from 'src/app/ui/hooks/useEndpointBlocks';
import { setBlocks } from 'src/features/shared/blocks/state/blocksSlice';
import queryBlocksEthereum from 'src/features/shared/blocks/core/interactors/queryBlocksEthereum';
import { getFormattedBlocks } from 'src/features/shared/blocks/ui/utils/utils';

export function useUniswapV2PairsTokens() {
  const dispatch = useAppDispatch();
  const pairs = useAppSelector((state) => state.pairsUniswapV2);
  const tokens = useAppSelector((state) => state.tokensUniswapV2);
  const { blockchain, network } = useAppSelector((state) => state.protocol);
  const endpoint = useEndpoint();
  const endpointBlocks = useEndpointBlocks();
  const shouldFetchPairs = shouldFetch(pairs, network);
  const shouldFetchTokens = shouldFetch(tokens, network);

  // create a callback function with the use cases
  const fetchData = useCallback(async () => {
    dispatch(setBlocks({ loading: true, error: false }));
    shouldFetchTokens && dispatch(setTokensUniswapV2({ loading: true, error: false }));
    shouldFetchPairs && dispatch(setPairsUniswapV2({ loading: true, error: false }));
    if (typeof endpoint !== 'undefined' && typeof endpointBlocks !== 'undefined' && blockchain && network) {
      const [t1D, t2D, t1W] = getTimestamps();
      const { error: errorBlock, data: blocks } = await queryBlocksEthereum(endpointBlocks, { t1D, t2D, t1W });
      if (errorBlock) {
        dispatch(setBlocks({ loading: false, error: true }));
        shouldFetchTokens && dispatch(setTokensUniswapV2({ loading: false, error: true }));
        shouldFetchPairs && dispatch(setPairsUniswapV2({ loading: false, error: true }));
      } else if (blocks) {
        const formattedBlocks = getFormattedBlocks(blocks, blockchain, network);
        dispatch(setBlocks({ loading: false, error: false, data: formattedBlocks }));
        const [{ error: errorEthers, data: dataEthers }, tokensResponse, dataPairs] = await Promise.all([
          queryEthPrices(endpoint, blocks),
          shouldFetchTokens && queryTokens(endpoint, blocks),
          shouldFetchPairs && queryPairs(endpoint, blocks),
        ]);
        if ((tokensResponse && tokensResponse.error) || errorEthers) {
          dispatch(setTokensUniswapV2({ loading: false, error: true }));
        } else if (tokensResponse && tokensResponse.data && dataEthers) {
          const formattedTokens = getFormattedTokensUniswapV2(tokensResponse.data, dataEthers, network);
          dispatch(setTokensUniswapV2({ loading: false, error: false, data: formattedTokens }));
        }
        if (dataPairs && dataPairs.error) {
          dispatch(setPairsUniswapV2({ loading: false, error: true }));
        } else if (dataPairs && dataPairs.data && network) {
          const formattedPools = getFormattedPairsUniswapV2(dataPairs.data, network);
          dispatch(setPairsUniswapV2({ loading: false, error: false, data: formattedPools }));
        }
      }
    } else {
      dispatch(setPairsUniswapV2({ loading: false, error: true }));
      dispatch(setTokensUniswapV2({ loading: false, error: true }));
    }
  }, [endpoint, endpointBlocks, dispatch, blockchain, network, shouldFetchPairs, shouldFetchTokens]);

  useEffect(() => {
    if (shouldFetchPairs) {
      fetchData();
    }
  }, [fetchData, shouldFetchPairs]);
  useEffect(() => {
    if (shouldFetchTokens) {
      fetchData();
    }
  }, [fetchData, shouldFetchTokens]);

  // return response and callback
  return { pairs, tokens };
}

import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'src/app/ui/hooks/useAppDispatch';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import useEndpoint from 'src/app/ui/hooks/useEndpoint';
import useEndpointBlocks from 'src/app/ui/hooks/useEndpointBlocks';
import queryBlocksEthereum from 'src/features/shared/blocks/core/interactors/queryBlocksEthereum';
import queryEthPrices from 'src/features/uniswapV3/ethers/core/interactors/queryEthPrices';
import queryTokens from 'src/features/uniswapV3/tokens/core/interactors/queryTokens';
import { setBlocks } from 'src/features/shared/blocks/state/blocksSlice';
import { setTokensUniswapV3 } from 'src/features/uniswapV3/tokens/state/tokensUniswapV3Slice';
import { getFormattedBlocks } from 'src/features/shared/blocks/ui/utils/utils';
import { getFormattedTokensUniswapV3 } from 'src/features/uniswapV3/tokens/utils/utils';
import { getTimestamps, shouldFetch } from 'src/features/shared/utils/utils';

export function useUniswapV3Tokens() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.tokensUniswapV3);
  const { blockchain, network } = useAppSelector((state) => state.protocol);
  const endpoint = useEndpoint();
  const endpointBlocks = useEndpointBlocks();
  const shouldFetchTokens = shouldFetch(tokens, network);

  // create a callback function with the use cases
  const fetchTokens = useCallback(async () => {
    dispatch(setBlocks({ loading: true, error: false }));
    shouldFetchTokens && dispatch(setTokensUniswapV3({ loading: true, error: false }));
    if (typeof endpoint !== 'undefined' && typeof endpointBlocks !== 'undefined' && blockchain && network) {
      const [t1D, t2D, t1W] = getTimestamps();
      const { error: errorBlock, data: blocks } = await queryBlocksEthereum(endpointBlocks, { t1D, t2D, t1W });
      if (errorBlock) {
        dispatch(setBlocks({ loading: false, error: true }));
        shouldFetchTokens && dispatch(setTokensUniswapV3({ loading: false, error: true }));
      } else if (blocks) {
        const formattedBlocks = getFormattedBlocks(blocks, blockchain, network);
        dispatch(setBlocks({ loading: false, error: false, data: formattedBlocks }));
        const [{ error: errorEthers, data: dataEthers }, tokensResponse] = await Promise.all([
          queryEthPrices(endpoint, blocks),
          shouldFetchTokens && queryTokens(endpoint, blocks),
        ]);
        if (errorEthers || (tokensResponse && tokensResponse.error)) {
          dispatch(setTokensUniswapV3({ loading: false, error: true }));
        } else if (tokensResponse && tokensResponse.data && dataEthers) {
          const formattedData = getFormattedTokensUniswapV3(tokensResponse.data, dataEthers, network);
          dispatch(setTokensUniswapV3({ loading: false, error: false, data: formattedData }));
        }
      }
    }
  }, [endpoint, endpointBlocks, dispatch, blockchain, network, shouldFetchTokens]);

  useEffect(() => {
    if (shouldFetchTokens) {
      fetchTokens();
    }
  }, [fetchTokens, shouldFetchTokens]);

  // return response and callback
  return tokens;
}

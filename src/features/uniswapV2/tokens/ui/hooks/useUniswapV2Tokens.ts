import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'src/app/ui/hooks/useAppDispatch';
import { useAppSelector } from 'src/app/ui/hooks/useAppSelector';
import useEndpoint from 'src/app/ui/hooks/useEndpoint';
import { setTokensUniswapV2 } from 'src/features/uniswapV2/tokens/state/tokensUniswapV2Slice';
import queryTokensUniswapV2 from 'src/features/uniswapV2/tokens/core/interactors/queryTokens';
import queryEthPricesUniswapV2 from 'src/features/uniswapV2/ethers/core/interactors/queryEthPrices';
import { getFormattedTokensUniswapV2 } from 'src/features/uniswapV2/tokens/utils/utils';
import { getTimestamps, shouldFetch } from 'src/features/shared/utils/utils';
import useEndpointBlocks from 'src/app/ui/hooks/useEndpointBlocks';
import { setBlocks } from 'src/features/shared/blocks/state/blocksSlice';
import queryBlocksEthereum from 'src/features/shared/blocks/core/interactors/queryBlocksEthereum';
import { getFormattedBlocks } from 'src/features/shared/blocks/ui/utils/utils';

export function useUniswapV2Tokens() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.tokensUniswapV2);
  const { blockchain, network } = useAppSelector((state) => state.protocol);
  const endpoint = useEndpoint();
  const endpointBlocks = useEndpointBlocks();

  // create a callback function with the use cases
  const fetchTokens = useCallback(async () => {
    dispatch(setBlocks({ loading: true, error: false }));
    dispatch(setTokensUniswapV2({ loading: true, error: false, data: null }));
    if (typeof endpoint !== 'undefined' && typeof endpointBlocks !== 'undefined' && blockchain && network) {
      const [t1D, t2D, t1W] = getTimestamps();
      const { error: errorBlock, data: blocks } = await queryBlocksEthereum(endpointBlocks, { t1D, t2D, t1W });
      if (errorBlock) {
        dispatch(setBlocks({ loading: false, error: true }));
        dispatch(setTokensUniswapV2({ loading: false, error: true, data: null }));
      } else if (blocks) {
        const formattedBlocks = getFormattedBlocks(blocks, blockchain, network);
        dispatch(setBlocks({ loading: false, error: false, data: formattedBlocks }));
        const [{ error: errorEthers, data: dataEthers }, { error: errorTokens, data: dataTokens }] = await Promise.all([
          queryEthPricesUniswapV2(endpoint, blocks),
          queryTokensUniswapV2(endpoint, blocks),
        ]);
        if (errorTokens || errorEthers) {
          dispatch(setTokensUniswapV2({ loading: false, error: true, data: null }));
        } else if (dataTokens && dataEthers && network) {
          const formattedData = getFormattedTokensUniswapV2(dataTokens, dataEthers, network);
          dispatch(setTokensUniswapV2({ loading: false, error: false, data: formattedData }));
        } else {
          dispatch(setTokensUniswapV2({ loading: false, error: true, data: null }));
        }
      }
    }
  }, [endpoint, endpointBlocks, dispatch, blockchain, network]);

  useEffect(() => {
    if (shouldFetch(tokens, network)) {
      fetchTokens();
    }
  }, [fetchTokens, tokens, network]);

  // return response and callback
  return tokens;
}

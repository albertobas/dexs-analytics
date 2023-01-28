import { configureStore } from '@reduxjs/toolkit';
import poolsUniswapV3SliceReducer from 'src/features/uniswapV3/state/poolsUniswapV3Slice';
import tokensUniswapV3SliceReducer from 'src/features/uniswapV3/state/tokensUniswapV3Slice';
import protocolSlice from 'src/app/state/protocolSlice';
import searchSliceReducer from 'src/app/state/searchSlice';
import pairsUniswapV2SliceReducer from 'src/features/uniswapV2/state/pairsUniswapV2Slice';
import tokensUniswapV2SliceReducer from 'src/features/uniswapV2/state/tokensUniswapV2Slice';
import blocksSliceReducer from 'src/features/shared/blocks/state/blocksSlice';

export const store = configureStore({
  reducer: {
    protocol: protocolSlice,
    search: searchSliceReducer,
    poolsUniswapV3: poolsUniswapV3SliceReducer,
    tokensUniswapV3: tokensUniswapV3SliceReducer,
    pairsUniswapV2: pairsUniswapV2SliceReducer,
    tokensUniswapV2: tokensUniswapV2SliceReducer,
    blocks: blocksSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

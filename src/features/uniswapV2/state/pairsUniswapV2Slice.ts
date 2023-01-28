import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PoolsState } from 'src/features/shared/pools/core/entities/Pools';

// initial state
const initialState: PoolsState = {
  loading: null,
  error: null,
  data: null,
};

// slice
const pairsUniswapV2Slice = createSlice({
  name: 'pairsUniswapV2',
  initialState,
  reducers: {
    setPairsUniswapV2(state, { payload: { loading, error, data } }: PayloadAction<PoolsState>) {
      state.loading = loading;
      state.error = error;
      state.data = { ...state.data, ...data };
    },
  },
});

export const { setPairsUniswapV2 } = pairsUniswapV2Slice.actions;
export default pairsUniswapV2Slice.reducer;

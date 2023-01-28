import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PoolsState } from 'src/features/shared/pools/core/entities/Pools';

// initial state
const initialState: PoolsState = {
  loading: null,
  error: null,
  data: null,
};

// slice
const poolsUniswapV3Slice = createSlice({
  name: 'poolsUniswapV3',
  initialState,
  reducers: {
    setPoolsUniswapV3(state, { payload: { loading, error, data } }: PayloadAction<PoolsState>) {
      state.loading = loading;
      state.error = error;
      state.data = { ...state.data, ...data };
    },
  },
});

export const { setPoolsUniswapV3 } = poolsUniswapV3Slice.actions;
export default poolsUniswapV3Slice.reducer;

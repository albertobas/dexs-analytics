import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokensState } from 'src/features/shared/state/core/entities/Tokens';

// initial state
const initialState: TokensState = {
  loading: null,
  error: null,
  data: null,
};

// slice
const tokensUniswapV2Slice = createSlice({
  name: 'tokensUniswapV2',
  initialState,
  reducers: {
    setTokensUniswapV2(state, { payload: { loading, error, data } }: PayloadAction<TokensState>) {
      state.loading = loading;
      state.error = error;
      state.data = data;
    },
  },
});

export const { setTokensUniswapV2 } = tokensUniswapV2Slice.actions;
export default tokensUniswapV2Slice.reducer;

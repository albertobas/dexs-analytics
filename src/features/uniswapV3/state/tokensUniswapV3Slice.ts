import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokensState } from 'src/features/shared/tokens/core/entities/Tokens';

// initial state
const initialState: TokensState = {
  loading: null,
  error: null,
  data: null,
};

// slice
const tokensUniswapV3Slice = createSlice({
  name: 'tokensUniswapV3',
  initialState,
  reducers: {
    setTokensUniswapV3(state, { payload: { loading, error, data } }: PayloadAction<TokensState>) {
      state.loading = loading;
      state.error = error;
      state.data = { ...state.data, ...data };
    },
  },
});

export const { setTokensUniswapV3 } = tokensUniswapV3Slice.actions;
export default tokensUniswapV3Slice.reducer;

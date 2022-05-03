import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuerySearch {
  queryUniswapV2: string | null;
  queryUniswapV3: string | null;
}

// initial state
const initialState: QuerySearch = {
  queryUniswapV2: null,
  queryUniswapV3: null,
};

// slice
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQueryUniswapV2(state, { payload }: PayloadAction<string | null>) {
      state.queryUniswapV2 = payload;
    },
    setQueryUniswapV3(state, { payload }: PayloadAction<string | null>) {
      state.queryUniswapV3 = payload;
    },
  },
});

export const { setQueryUniswapV2, setQueryUniswapV3 } = searchSlice.actions;
export default searchSlice.reducer;

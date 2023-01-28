import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Protocol {
  error: boolean | null;
  data: {
    blockchain: string;
    name: string;
    network: string;
  } | null;
}

const initialState: Protocol = {
  error: null,
  data: null,
};

const protocolSlice = createSlice({
  name: 'protocol',
  initialState,
  reducers: {
    setProtocol(state, { payload: { error, data } }: PayloadAction<Protocol>) {
      state.error = error;
      state.data = data ? data : null;
    },
  },
});

export const { setProtocol } = protocolSlice.actions;
export default protocolSlice.reducer;

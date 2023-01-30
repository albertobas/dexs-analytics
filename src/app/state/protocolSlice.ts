import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProtocolState {
  error: boolean | null;
  data: {
    blockchain: string;
    name: string;
    network: string;
  } | null;
}

const initialState: ProtocolState = {
  error: null,
  data: null,
};

const protocolSlice = createSlice({
  name: 'protocol',
  initialState,
  reducers: {
    setProtocol(state, { payload: { error, data } }: PayloadAction<ProtocolState>) {
      state.error = error;
      state.data = data ? data : null;
    },
  },
});

export const { setProtocol } = protocolSlice.actions;
export default protocolSlice.reducer;

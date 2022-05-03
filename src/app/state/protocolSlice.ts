import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Protocol {
  blockchain: string | null | undefined;
  name: string | null | undefined;
  network: string | null | undefined;
}

const initialState: Protocol = {
  blockchain: null,
  name: null,
  network: null,
};

const protocolSlice = createSlice({
  name: 'protocol',
  initialState,
  reducers: {
    setProtocol(state, { payload: { blockchain, name, network } }: PayloadAction<Protocol>) {
      state.blockchain = blockchain;
      state.name = name;
      state.network = network;
    },
  },
});

export const { setProtocol } = protocolSlice.actions;
export default protocolSlice.reducer;

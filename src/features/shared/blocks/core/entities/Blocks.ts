export interface Blocks {
  t1D: { timestamp: number; number: number };
  t2D: { timestamp: number; number: number };
  t1W: { timestamp: number; number: number };
  current: { timestamp: number; number: number };
}

export interface BlocksStateData {
  [blockchainId: string]: {
    [networkId: string]: {
      blocks: Blocks;
      lastUpdated: number;
    };
  };
}

export interface BlocksState {
  loading: boolean | null;
  error: boolean | null;
  data?: BlocksStateData | null;
}

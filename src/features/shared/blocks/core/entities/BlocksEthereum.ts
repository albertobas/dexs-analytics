export interface BlocksEthereumFromTimestamp {
  t1D: {
    timestamp: string;
    number: string;
  }[];
  t2D: {
    timestamp: string;
    number: string;
  }[];
  t1W: {
    timestamp: string;
    number: string;
  }[];
}
export interface BlocksEthereumCurrent {
  current: {
    timestamp: string;
    number: string;
  }[];
}

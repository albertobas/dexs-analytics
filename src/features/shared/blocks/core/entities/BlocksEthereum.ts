export interface BlocksEthereum {
  current: {
    timestamp: string;
    number: string;
  }[];
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

export interface Token {
  address: string;
  name: string;
  symbol: string;
  volume: number | null;
  tvl: number;
  derivedETH: number;
}

export interface Tokens {
  current: Record<string, Token>;
  t1D: Record<string, Token>;
  t2D: Record<string, Token>;
  t1W: Record<string, Token>;
}

export type TokenExtended = Token & {
  volumeChange: number | null;
  volume1W: number | null;
  tvlChange: number | null;
  price: number;
  priceChange: number | null;
  priceChange1W: number | null;
};

export interface TokensObject {
  [tokenId: string]: TokenExtended;
}

export interface TokensStateData {
  [networkId: string]: {
    tokens: TokensObject;
    lastUpdated: number;
  };
}

export interface TokensState {
  loading: boolean | null;
  error: boolean | null;
  data?: TokensStateData | null;
}

import { TokenExtended } from 'src/features/shared/tokens/core/entities/Tokens';

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

import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';

export interface BlocksStateData {
  [blockchainkId: string]: {
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

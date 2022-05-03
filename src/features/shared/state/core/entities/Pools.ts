import { PoolExtended } from 'src/features/shared/pools/entities/Pools';

export interface PoolsObject {
  [poolId: string]: PoolExtended;
}

export interface PoolsStateData {
  [networkId: string]: {
    pools: PoolsObject;
    lastUpdated: number;
  };
}

export interface PoolsState {
  loading: boolean | null;
  error: boolean | null;
  data?: PoolsStateData | null;
}

import { EtherPrices } from 'src/features/shared/ethers/core/entities/EtherPrices';
import { Pools } from 'src/features/shared/pools/core/entities/Pools';
import { Tokens } from 'src/features/shared/tokens/core/entities/Tokens';

export interface PoolsTokensAndPrices {
  pools: Pools | null;
  tokens: Tokens | null;
  etherPrices: EtherPrices | null;
}

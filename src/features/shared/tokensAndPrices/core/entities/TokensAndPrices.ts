import { EtherPrices } from 'src/features/shared/ethers/core/entities/EtherPrices';
import { Tokens } from 'src/features/shared/tokens/core/entities/Tokens';

export interface TokensAndPrices {
  tokens: Tokens;
  etherPrices: EtherPrices;
}

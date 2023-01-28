import { BlocksEthereum } from 'src/features/shared/blocks/core/entities/BlocksEthereum';

interface BlocksEthereumRepository {
  getBlocks(
    endpoint: string,
    timestamps: { t1D: number; t2D: number; t1W: number }
  ): Promise<BlocksEthereum | undefined>;
}

export default BlocksEthereumRepository;

import {
  BlocksEthereumCurrent,
  BlocksEthereumFromTimestamp,
} from 'src/features/shared/blocks/core/entities/BlocksEthereum';

interface BlocksEthereumRepository {
  getBlocksFromTimestamp(
    endpoint: string,
    timestamps: { t1D: number; t2D: number; t1W: number }
  ): Promise<BlocksEthereumFromTimestamp | undefined>;
  getCurrentBlock(endpoint: string): Promise<BlocksEthereumCurrent | undefined>;
}

export default BlocksEthereumRepository;

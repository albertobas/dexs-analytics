import BlocksEthereumRepository from 'src/features/shared/blocks/core/repositories/BlocksEthereum.repository';
import blocksEthereumAdapter from 'src/features/shared/blocks/core/adapters/blocksEthereum.adapter';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';

const queryBlocksEthereum =
  (blocksRepository: BlocksEthereumRepository) =>
  async (
    endpoint: string,
    timestamps: { t1D: number; t2D: number; t1W: number }
  ): Promise<{ error: boolean; data: Blocks | null }> => {
    try {
      const [blocksFromTimestamp, blockCurrent] = await Promise.all([
        blocksRepository.getByTimestamps(endpoint, timestamps),
        blocksRepository.getCurrentBlock(endpoint),
      ]);
      const blocks = blockCurrent && blocksFromTimestamp ? { ...blockCurrent, ...blocksFromTimestamp } : null;
      return blocks ? { error: false, data: blocksEthereumAdapter(blocks) } : { error: true, data: null };
    } catch (e) {
      console.log(e);
      return { error: true, data: null };
    }
  };

export default queryBlocksEthereum;

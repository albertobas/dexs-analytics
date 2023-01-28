import BlocksEthereumRepository from 'src/features/shared/blocks/core/repositories/BlocksEthereum.repository';
import blocksEthereumAdapter from 'src/features/shared/blocks/core/adapters/blocksEthereum.adapter';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';

const queryBlocksEthereum =
  (repository: BlocksEthereumRepository) =>
  async (
    endpoint: string,
    timestamps: { t1D: number; t2D: number; t1W: number }
  ): Promise<{ error: boolean; data: Blocks | null }> => {
    try {
      const data = await repository.getBlocks(endpoint, timestamps);
      return { error: false, data: blocksEthereumAdapter(data) };
    } catch (e) {
      console.error(e);
      return { error: true, data: null };
    }
  };

export default queryBlocksEthereum;

import { getTime } from 'src/features/shared/utils/helpers';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import { BlocksStateData } from 'src/features/shared/blocks/state/blocksSlice';

export const getFormattedBlocks = (blocks: Blocks, blockchainId: string, networkId: string): BlocksStateData => {
  const blocksStateData: BlocksStateData = {};
  blocksStateData[blockchainId] = {};
  blocksStateData[blockchainId][networkId] = {
    blocks: blocks,
    lastUpdated: getTime(),
  };
  return blocksStateData;
};

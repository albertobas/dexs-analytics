import { BlocksStateData } from 'src/features/shared/state/core/entities/Blocks';
import { getTime } from 'src/features/shared/utils/utils';
import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';

export const getFormattedBlocks = (blocks: Blocks, blockchainId: string, networkId: string): BlocksStateData => {
  const blocksStateData: BlocksStateData = {};
  blocksStateData[blockchainId] = {};
  blocksStateData[blockchainId][networkId] = {
    blocks: blocks,
    lastUpdated: getTime(),
  };
  return blocksStateData;
};

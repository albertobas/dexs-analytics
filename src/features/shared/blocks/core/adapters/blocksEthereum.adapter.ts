import { Blocks } from 'src/features/shared/blocks/core/entities/Blocks';
import {
  BlocksEthereumCurrent,
  BlocksEthereumFromTimestamp,
} from 'src/features/shared/blocks/core/entities/BlocksEthereum';

const blocksEthereumAdapter = (data: BlocksEthereumCurrent & BlocksEthereumFromTimestamp): Blocks | null => {
  if (data) {
    return {
      t1D: {
        timestamp: parseInt(data.t1D[0].timestamp),
        number: parseInt(data.t1D[0].number),
      },
      t2D: {
        timestamp: parseInt(data.t2D[0].timestamp),
        number: parseInt(data.t2D[0].number),
      },
      t1W: {
        timestamp: parseInt(data.t1W[0].timestamp),
        number: parseInt(data.t1W[0].number),
      },
      current: {
        timestamp: parseInt(data.current[0].timestamp),
        number: parseInt(data.current[0].number),
      },
    };
  } else return null;
};

export default blocksEthereumAdapter;

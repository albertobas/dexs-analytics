import BlocksEthereumDataSource from 'src/features/shared/blocks/dataSources/blocksEthereum.datasource';
import queryBlocksEthereum from 'src/features/shared/blocks/core/interactors/queryBlocksEthereum/queryBlocksEthereum.interactor';

const blocksRepository = new BlocksEthereumDataSource();

export default queryBlocksEthereum(blocksRepository);

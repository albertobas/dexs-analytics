import BlocksDataSource from 'src/features/shared/blocks/dataSources/blocks.datasource';
import queryBlocksEthereum from 'src/features/shared/blocks/core/interactors/queryBlocksEthereum.interactor';

const repository = new BlocksDataSource();

export default queryBlocksEthereum(repository);

import { gql, GraphQLClient } from 'graphql-request';
import {
  BlocksEthereumCurrent,
  BlocksEthereumFromTimestamp,
} from 'src/features/shared/blocks/core/entities/BlocksEthereum';
import BlocksEthereumRepository from 'src/features/shared/blocks/core/repositories/BlocksEthereum.repository';

class BlocksDataSource implements BlocksEthereumRepository {
  public async getByTimestamps(
    endpoint: string,
    timestamps: { t1D: number; t2D: number; t1W: number }
  ): Promise<BlocksEthereumFromTimestamp | undefined> {
    const client = new GraphQLClient(endpoint);
    let BLOCKS_ETHEREUM = 'query BlocksEthereum {';
    for (const timestamp of Object.keys(timestamps)) {
      const t = timestamps[timestamp as keyof typeof timestamps];
      BLOCKS_ETHEREUM += `${timestamp}:
        blocks(
          first: 1, 
          orderBy: timestamp, 
          orderDirection: desc, 
          where: {
            timestamp_gte: ${t}, 
            timestamp_lt: ${t + 600}
          }){
            timestamp
            number
      }`;
    }
    //let poolString = 'query blocks {';
    BLOCKS_ETHEREUM += '}';
    return client.request(
      gql`
        ${BLOCKS_ETHEREUM}
      `
    );
  }
  public async getCurrentBlock(endpoint: string): Promise<BlocksEthereumCurrent | undefined> {
    const client = new GraphQLClient(endpoint);
    return client.request(
      gql`
        query BlocksEthereum {
          current: blocks(first: 1, orderBy: timestamp, orderDirection: desc) {
            timestamp
            number
          }
        }
      `
    );
  }
}

export default BlocksDataSource;

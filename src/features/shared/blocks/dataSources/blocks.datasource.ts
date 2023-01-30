import { GraphQLClient } from 'graphql-request';
import { BlocksEthereum } from 'src/features/shared/blocks/core/entities/BlocksEthereum';
import BlocksRepository from 'src/features/shared/blocks/core/repositories/Blocks.repository';

class BlocksDataSource implements BlocksRepository {
  public async getBlocksEthereum(
    endpoint: string,
    timestamps: { t1D: number; t2D: number; t1W: number }
  ): Promise<BlocksEthereum | undefined> {
    const client = new GraphQLClient(endpoint);
    let QUERY = 'query BlocksEthereum {';
    for (const timestamp of Object.keys(timestamps)) {
      const t = timestamps[timestamp as keyof typeof timestamps];
      QUERY += `${timestamp}: blocks(
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
    QUERY += `current: blocks(
      first: 1, 
      orderBy: timestamp, 
      orderDirection: desc) {
        timestamp
        number
      }
    }`;
    return client.request(QUERY);
  }
}

export default BlocksDataSource;

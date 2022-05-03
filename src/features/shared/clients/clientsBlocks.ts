/*
import { GraphQLClient } from 'graphql-request';

const mainnet = new GraphQLClient('https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks');

const arbitrum = new GraphQLClient('https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-one-blocks');

const optimism = new GraphQLClient('https://api.thegraph.com/subgraphs/name/ianlapham/uni-testing-subgraph');

const polygon = new GraphQLClient('https://api.thegraph.com/subgraphs/name/ianlapham/polygon-blocks');
*/
export const clientsBlocks = {
  ethereum: {
    mainnet: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
    arbitrum: 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-one-blocks',
    optimism: 'https://api.thegraph.com/subgraphs/name/ianlapham/uni-testing-subgraph',
    polygon: 'https://api.thegraph.com/subgraphs/name/ianlapham/polygon-blocks',
  },
};

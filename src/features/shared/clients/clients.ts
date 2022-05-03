/*import { GraphQLClient } from 'graphql-request';

const uniswapV3Mainnet = new GraphQLClient('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3');

const uniswapV3Arbitrum = new GraphQLClient('https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-dev');

const uniswapV3Optimism = new GraphQLClient(
  'https://api.thegraph.com/subgraphs/name/ianlapham/optimism-post-regenesis'
);

const uniswapV3Polygon = new GraphQLClient('https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon');

const uniswapV2 = new GraphQLClient('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2');

export const clients2 = {
  'uniswap-v3': {
    mainnet: uniswapV3Mainnet,
    arbitrum: uniswapV3Arbitrum,
    optimism: uniswapV3Optimism,
    polygon: uniswapV3Polygon,
  },
  'uniswap-v2': { mainnet: uniswapV2 },
};*/
export const clients = {
  'uniswap-v3': {
    mainnet: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    arbitrum: 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-dev',
    optimism: 'https://api.thegraph.com/subgraphs/name/ianlapham/optimism-post-regenesis',
    polygon: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon',
  },
  'uniswap-v2': { mainnet: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2' },
};

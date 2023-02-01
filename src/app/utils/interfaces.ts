import { dictProtocols } from 'src/app/utils/constants';

export type BlockchainType = keyof typeof dictProtocols;

export type EthereumProtocolType = keyof typeof dictProtocols.ethereum;

type UnionKeys<T> = T extends any ? keyof T : never;

export type ProtocolType = UnionKeys<(typeof dictProtocols)[BlockchainType]>;

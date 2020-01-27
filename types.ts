export interface PooldaoOptions {
  host: string;
  contractAddresses: {
    proxy: string;
    operatorManager: string;
    nodeManager: string;
    oracle: string;
  };
}

export type AbiName = 'OperatorManager' | 'NodeManager' | 'Oracle' | 'PoolETHToken';

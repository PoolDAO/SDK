import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

export interface PooldaoOptions {
  host: string;
  proxyAddress: string;
}

export type AbiName = 'OperatorManager' | 'NodeManager' | 'Oracle' | 'PoolETHToken' | 'Node';

export interface ContractDetail {
  name: AbiName;
  address: string;
  abi: AbiItem;
  contract: Contract;
}

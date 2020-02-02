import Pooldao from './index';

import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { PromiEvent, TransactionReceipt } from 'web3-core';
import { ContractSendMethod, SendOptions } from 'web3-eth-contract';

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

export interface SendMethod extends Omit<ContractSendMethod, 'send'> {
  send(options: SendOptions, callback?: (err: Error, transactionHash: string) => void): PromiEvent<TransactionReceipt>;
}

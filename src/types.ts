import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { PromiEvent, TransactionReceipt } from 'web3-core';
import { ContractSendMethod, SendOptions } from 'web3-eth-contract';

export interface PooldaoOptions {
  host: string;
  proxyAddress: string;
}

export type AbiName = 'OperatorManager' | 'NodeManager' | 'Oracle' | 'PoolETHToken' | 'Node' | 'Operator';

export interface ContractDetail {
  name: AbiName;
  address: string;
  abi: AbiItem;
  contract: Contract;
}

export interface SendMethod extends Omit<ContractSendMethod, 'send'> {
  send(options: SendOptions, callback?: (err: Error, transactionHash: string) => void): PromiEvent<TransactionReceipt>;
}

export interface OperatorInfo {
  id: string;
  info: string;
  name: string;
  version: string;
  owner: string;
  operatorManagerApi: string;
  depositTotal: string;
  reputation: string;
  totalNode: string;
  withdrawTotal: string;
  nodeIDs: string[];
}

export interface NodeInfo {
  balance: string;
  dao: string;
  daoFee: string;
  daoFeePercentage: string;
  depositCapacity: string;
  deposit_data: string;
  duration: string;
  feePercentage: string;
  id: string;
  info: string;
  minShardingDeposit: string;
  name: string;
  nodeManagerApi: string;
  operator: string;
  operatorDeposit: string;
  owner: string;
  ownerFee: string;
  partner: string;
  partnerFee: string;
  partnerFeePercentage: string;
  reward: string;
  status: string;
  userDepositTotal: string;
  validatorPubkey: string;
  validatorSignature: string;
  version: string;
  withdrawal_credentials: string;
}

import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import Operator from './Operator';
import User from './User';
import Oracle from './Oracle';
import { decompressABI } from './utils';
import proxyAbi from './proxyAbi.json';
import { PooldaoOptions, AbiName, ContractDetail, OperatorInfo, NodeInfo } from './types';

class Pooldao {
  public contractNames: AbiName[];

  public AbiNode?: AbiItem;
  public AbiOperator?: AbiItem;
  public web3: Web3;
  public proxy: Contract;
  public contracts: Record<AbiName, ContractDetail | null>;
  public operator: Operator;
  public user: User;
  public oracle: Oracle;

  constructor({ provider, proxyAddress = '0x3bc5E5f63a91C0B23Ee82733321a971Add3c2Cb7' }: PooldaoOptions = {}) {
    this.web3 = new Web3(provider);
    this.proxy = new this.web3.eth.Contract(proxyAbi.abi as any, proxyAddress);
    this.contractNames = ['OperatorManager', 'NodeManager', 'Oracle', 'PoolETHToken'];
    this.contracts = this.contractNames.reduce((r, k) => ({ ...r, [k]: null }), {}) as Record<AbiName, null>;
    this.operator = new Operator(this);
    this.user = new User(this);
    this.oracle = new Oracle(this);
  }

  public async init() {
    const requests = [];
    requests.push(
      this.getAbi('Node').then(result => {
        this.AbiNode = result;
      })
    );
    requests.push(
      this.getAbi('Operator').then(result => {
        this.AbiOperator = result;
      })
    );
    for (const contractName of this.contractNames) {
      requests.push(
        Promise.all([this.getAddress(contractName), this.getAbi(contractName)]).then(([address, abi]) => {
          this.contracts[contractName] = {
            name: contractName,
            address,
            abi,
            contract: new this.web3.eth.Contract(abi, address)
          };
        })
      );
    }
    await Promise.all(requests);
  }

  public async getAbi(abiName: AbiName): Promise<AbiItem> {
    return JSON.parse(decompressABI(await this.proxy.methods.getAbi(abiName).call()));
  }

  public async getAddress(abiName: AbiName) {
    return this.proxy.methods.getContract(abiName).call();
  }

  public async getNodeAddress(nodeId: string) {
    return this.contracts.NodeManager?.contract.methods.getNodeByID(nodeId).call();
  }

  public getNodeContract(nodeAddress: string) {
    return new this.web3.eth.Contract(this.AbiNode as AbiItem, nodeAddress);
  }

  public async getOperatorContract(operatorId: string) {
    const operatorAddress = await this.contracts.OperatorManager?.contract.methods.getOperatorById(operatorId).call();
    return new this.web3.eth.Contract(this.AbiOperator as AbiItem, operatorAddress);
  }

  public async getTotalOperator(): Promise<number> {
    return this.contracts.OperatorManager?.contract.methods.getTotal().call();
  }

  public async getTotalNode(): Promise<number> {
    return this.contracts.NodeManager?.contract.methods.getTotal().call();
  }

  public async getOperatorInfo(operatorId: string, filterArray?: string[]): Promise<OperatorInfo> {
    const operatorContract = await this.getOperatorContract(operatorId);

    const calls = [
      'id',
      'info',
      'name',
      'version',
      'owner',
      'depositTotal',
      'reputation',
      'totalNode',
      'withdrawTotal'
    ].filter(name => {
      if (!filterArray) return true;
      return filterArray.includes(name);
    });

    const result = (await Promise.all(calls.map(methodName => operatorContract.methods[methodName]().call()))).reduce(
      (r, c, i) => ({
        ...r,
        [calls[i]]: c
      }),
      {}
    );

    result.nodeIDs = await Promise.all(
      [...new Array(Number(result.totalNode))].map((_, nodeIndex) => operatorContract.methods.nodeIDs(nodeIndex).call())
    );

    return result;
  }

  public async getNodeInfo(nodeId: string, filterArray?: string[]): Promise<NodeInfo> {
    const nodeAddress = await this.getNodeAddress(nodeId);
    const nodeContract = this.getNodeContract(nodeAddress);

    const calls = [
      'balance',
      'dao',
      'daoFee',
      'daoFeePercentage',
      'depositCapacity',
      'deposit_data',
      'duration',
      'feePercentage',
      'id',
      'info',
      'minShardingDeposit',
      'name',
      'nodeManagerApi',
      'operator',
      'operatorDeposit',
      'owner',
      'ownerFee',
      'partner',
      'partnerFee',
      'partnerFeePercentage',
      'reward',
      'status',
      'userDepositTotal',
      'validatorPubkey',
      'validatorSignature',
      'version',
      'withdrawal_credentials'
    ].filter(name => {
      if (!filterArray) return true;
      return filterArray.includes(name);
    });

    const result = (await Promise.all(calls.map(methodName => nodeContract.methods[methodName]().call()))).reduce(
      (r, c, i) => ({
        ...r,
        [calls[i]]: c
      }),
      {}
    );

    // result.nodeIDs = Promise.all(
    //   ['withdrawList', 'depositList', 'statusTime'].map(async methodName => {
    //     return await Promise.all(
    //       [...new Array(Number(result.totalNode))].map((_, nodeIndex) => nodeContract.methods.nodeIDs(nodeIndex).call())
    //     );
    //   })
    // );

    return result;

    // 'withdrawList',
    // 'depositList',
    // 'statusTime',
  }

  public getEthBalance(address: string): Promise<string> {
    return this.web3.eth.getBalance(address);
  }

  public getPoolEthBalance(address: string): Promise<string> {
    return this.contracts.PoolETHToken?.contract.methods.balanceOf(address).call();
  }
}

export default Pooldao;

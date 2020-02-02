import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import Operator from './Operator';
import User from './User';
import Oracle from './Oracle';
import { decompressABI } from '../utils';
import proxyAbi from '../proxyAbi.json';
import { PooldaoOptions, AbiName, ContractDetail } from './types';

class Pooldao {
  public contractNames: AbiName[];

  public AbiNode?: AbiItem;
  public web3: Web3;
  public proxy: Contract;
  public contracts: Record<AbiName, ContractDetail | null>;
  public operator: Operator;
  public user: User;
  public oracle: Oracle;

  constructor({ host, proxyAddress }: PooldaoOptions) {
    this.web3 = new Web3(host);
    this.proxy = new this.web3.eth.Contract(proxyAbi.abi as any, proxyAddress);
    this.contractNames = ['OperatorManager', 'NodeManager', 'Oracle', 'PoolETHToken'];
    this.contracts = this.contractNames.reduce((r, k) => ({ ...r, [k]: null }), {}) as Record<AbiName, null>;
    this.operator = new Operator(this);
    this.user = new User(this);
    this.oracle = new Oracle(this);
  }

  public async init() {
    this.AbiNode = await this.getAbi('Node');
    for (const contractName of this.contractNames) {
      const address = await this.getAddress(contractName);
      const abi = await this.getAbi(contractName);
      this.contracts[contractName] = {
        name: contractName,
        address,
        abi,
        contract: new this.web3.eth.Contract(abi, address)
      };
    }
  }

  public async getAbi(abiName: AbiName): Promise<AbiItem> {
    return JSON.parse(decompressABI(await this.proxy.methods.getAbi(abiName).call()));
  }

  public async getAddress(abiName: AbiName) {
    return this.proxy.methods.getContract(abiName).call();
  }

  public async getNodeContract(id: string) {
    const node = await this.contracts.NodeManager?.contract.methods.getNodeByID(id).call();
    return new this.web3.eth.Contract(this.AbiNode as AbiItem, node);
  }
}

export default Pooldao;

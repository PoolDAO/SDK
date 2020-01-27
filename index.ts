import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import { decompressABI } from './utils';
import proxyAbi from './proxyAbi.json';
import { PooldaoOptions, AbiName, ContractDetail } from './types';

class Pooldao {
  public contractNames: AbiName[];

  public web3: Web3;
  public proxy: Contract;
  public contracts: Record<AbiName, ContractDetail | null>;

  constructor({ host, proxyAddress }: PooldaoOptions) {
    this.web3 = new Web3(host);
    this.proxy = new this.web3.eth.Contract(proxyAbi.abi as any, proxyAddress);
    this.contractNames = ['OperatorManager', 'NodeManager', 'Oracle', 'PoolETHToken'];
    this.contracts = this.contractNames.reduce((r, k) => ({ ...r, [k]: null }), {}) as Record<AbiName, null>;
  }

  public async init() {
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
}

export default Pooldao;

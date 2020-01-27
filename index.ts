import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

import proxyAbi from './proxyAbi.json';
import { PooldaoOptions, AbiName } from './types';

class Pooldao {
  public web3: Web3;
  public proxy: Contract;

  constructor({ host, proxyAddress }: PooldaoOptions) {
    this.web3 = new Web3(host);
    this.proxy = new this.web3.eth.Contract(proxyAbi.abi as any, proxyAddress);
  }

  public async getAbi(abiName: AbiName) {
    return this.proxy.methods.getAbi(abiName).call();
  }

  public async getAddress(abiName: AbiName) {
    return this.proxy.methods.getContract(abiName).call();
  }
}

export default Pooldao;

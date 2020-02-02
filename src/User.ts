import Pooldao from './index';
import { ContractSendMethod } from 'web3-eth-contract';

class User {
  private provider: Pooldao;

  constructor(pooldao: Pooldao) {
    this.provider = pooldao;
  }

  public deposit(id: any): ContractSendMethod {
    const nodeContract = this.provider.getNodeContract(id);
    return nodeContract.methods.startStaking();
  }

  public refund(id: any): ContractSendMethod {
    const nodeContract = this.provider.getNodeContract(id);
    return nodeContract.methods.refund();
  }

  public swap(value: string): ContractSendMethod {
    return this.provider.contracts.PoolETHToken?.contract.methods.swap(value);
  }
}

export default User;

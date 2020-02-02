import Pooldao from './index';
import { SendMethod } from './types';
import { Contract } from 'web3-eth-contract';

class User {
  private provider: Pooldao;

  constructor(pooldao: Pooldao) {
    this.provider = pooldao;
  }

  public deposit(contract: Contract): SendMethod {
    return contract.methods.deposit();
  }

  public refund(contract: Contract): SendMethod {
    return contract.methods.refund();
  }

  public swap(value: string): SendMethod {
    return this.provider.contracts.PoolETHToken?.contract.methods.swap(value);
  }
}

export default User;

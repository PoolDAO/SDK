import Pooldao from './index';
import { ContractSendMethod } from 'web3-eth-contract';

class Oracle {
  private provider: Pooldao;

  constructor(pooldao: Pooldao) {
    this.provider = pooldao;
  }

  public reputationChange(operator: any, change: any): ContractSendMethod {
    return this.provider.contracts.Oracle?.contract.methods.reputationChange(operator, change);
  }

  public validatorExit(validatorPubkey: string): ContractSendMethod {
    return this.provider.contracts.Oracle?.contract.methods.validatorExit(validatorPubkey);
  }

  public validatorSettlement(validatorPubkey: string, finalBalance: string): ContractSendMethod {
    return this.provider.contracts.Oracle?.contract.methods.validatorSettlement(validatorPubkey, finalBalance);
  }
}

export default Oracle;

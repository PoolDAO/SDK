import Pooldao from './Pooldao';
import { SendMethod } from './types';

class Oracle {
  private provider: Pooldao;

  constructor(pooldao: Pooldao) {
    this.provider = pooldao;
  }

  public reputationChange(operator: string, change: string): SendMethod {
    return this.provider.contracts.Oracle?.contract.methods.reputationChange(operator, change);
  }

  public validatorExit(validatorPubkey: string): SendMethod {
    return this.provider.contracts.Oracle?.contract.methods.validatorExit(validatorPubkey);
  }

  public validatorSettlement(validatorPubkey: string, finalBalance: string): SendMethod {
    return this.provider.contracts.Oracle?.contract.methods.validatorSettlement(validatorPubkey, finalBalance);
  }
}

export default Oracle;

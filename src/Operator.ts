import Pooldao from './Pooldao';
import { SendMethod } from './types';
import { Contract } from 'web3-eth-contract';

class Operator {
  private provider: Pooldao;

  constructor(pooldao: Pooldao) {
    this.provider = pooldao;
  }

  public createOperator(name: string): SendMethod {
    return this.provider.contracts.OperatorManager?.contract.methods.createOperator(name);
  }

  public createNode(info: string, duration: number, feePercentage: number, partner: string): SendMethod {
    return this.provider.contracts.NodeManager?.contract.methods.createNode(info, duration, feePercentage, partner);
  }

  public initNode(
    id: string,
    validatorPubkey: string,
    validatorSignature: string,
    withdrawalCredentials: string,
    depositData: string
  ): SendMethod {
    return this.provider.contracts.NodeManager?.contract.methods.initNode(
      id,
      validatorPubkey,
      validatorSignature,
      withdrawalCredentials,
      depositData
    );
  }

  public revoked(contract: Contract): SendMethod {
    return contract.methods.revoked();
  }

  public startStaking(contract: Contract): SendMethod {
    return contract.methods.startStaking();
  }
}

export default Operator;

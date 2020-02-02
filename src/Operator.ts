import Pooldao from './index';
import { ContractSendMethod } from 'web3-eth-contract';

class Operator {
  private provider: Pooldao;

  constructor(pooldao: Pooldao) {
    this.provider = pooldao;
  }

  public createOperator(name: string): ContractSendMethod {
    return this.provider.contracts.OperatorManager?.contract.methods.createOperator(name);
  }

  public createNode(info: string, duration: number, feePercentage: number, partner: string): ContractSendMethod {
    return this.provider.contracts.NodeManager?.contract.methods.createNode(info, duration, feePercentage, partner);
  }

  public initNode(
    id: any,
    validatorPubkey: string,
    validatorSignature: string,
    withdrawalCredentials: string,
    depositData: string
  ): ContractSendMethod {
    return this.provider.contracts.NodeManager?.contract.methods.createNode(
      id,
      validatorPubkey,
      validatorSignature,
      withdrawalCredentials,
      depositData
    );
  }

  public revoked(id: any): ContractSendMethod {
    const nodeContract = this.provider.getNodeContract(id);
    return nodeContract.methods.revoked();
  }

  public startStaking(id: any): ContractSendMethod {
    const nodeContract = this.provider.getNodeContract(id);
    return nodeContract.methods.startStaking();
  }
}

export default Operator;

import _Pooldao from '../src';
import { fromWei, toWei } from 'web3-utils';
import BN from 'bn.js';
import randomHex from './randomHex';

const Ether = Math.pow(10, 18);

export default class Pooldao extends _Pooldao {
  async depositToFull(account: any, nodeId: any) {
    const balance = (await this.getNodeInfo(nodeId, ['balance'])).balance;
    const target = new BN('3200000000000000000').sub(new BN(balance));
    console.log('target:', target.toString());
    const nodeAddress = await this.getNodeAddress(nodeId);
    const contract = this.getNodeContract(nodeAddress);
    await this.user.deposit(contract).send({
      from: account,
      value: target,
      gas: 1000000
    });
    console.log('depositToFull');
  }

  async createOperator(account: any, name: string) {
    await this.operator.createOperator(name).send({
      from: account,
      gas: 10000000
    });
  }

  async createNode(account: any, name: string) {
    await this.operator.createNode(name, 4, 16).send({
      from: account,
      gas: 10000000
    });
    console.log('node create');
  }

  async initNode(account: any, nodeId: string) {
    await this.operator.initNode(nodeId, randomHex(), randomHex(), randomHex(), randomHex()).send({
      value: 0.4 * Ether,
      from: account,
      gas: 10000000
    });

    console.log('node init');
  }

  async startStaking(account: any, nodeId: string) {
    const nodeAddress = await this.getNodeAddress(nodeId);
    const contract = this.getNodeContract(nodeAddress);

    await this.operator.startStaking(contract).send({
      from: account,
      gas: 100000000
    });

    console.log('startStaking');
  }

  async validatorExit(account: any) {
    await this.oracle.validatorExit('0xc7c7a6e052f4f8cb051f23d6634f173664a7e329').send({
      from: account,
      gas: 10000000
    });
    console.log('validatorExit');
  }

  async validatorSettlement(account: any) {
    await this.oracle.validatorSettlement('0xc7c7a6e052f4f8cb051f23d6634f173664a7e329', '10000000').send({
      from: account,
      gas: 10000000
    });
    console.log('validatorSettlement');
  }
}

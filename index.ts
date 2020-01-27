import Web3 from 'web3';

import { PooldaoOptions } from './types';

class Pooldao {
  public web3: Web3;

  constructor({ host }: PooldaoOptions) {
    this.web3 = new Web3(host);
  }

}

export default Pooldao;

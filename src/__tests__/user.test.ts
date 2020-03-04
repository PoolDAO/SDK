import Web3 from 'web3';
import Pooldao from '../Pooldao';

import { TEST_OPERATOR, TEST } from './testAccounts';

describe('user', () => {
  let pooldao: Pooldao;
  const Ether = Math.pow(10, 18);

  beforeAll(async () => {
    jest.setTimeout(100000);

    pooldao = new Pooldao({
      provider: new Web3.providers.HttpProvider('http://47.106.144.61:8545'),
      proxyAddress: '0x3bc5E5f63a91C0B23Ee82733321a971Add3c2Cb7'
    });

    await pooldao.init();
  });

  it.only('deposit', async () => {
    const contract = pooldao.getNodeContract('0x424a7f6E900052e1E1e1BD6250007c1BD97d9FcC');
    const result = await pooldao.user.deposit(contract).send({
      from: TEST[6],
      value: 1 * Ether,
      gas: 1000000
    });
    console.log(result);
  });

  it('refund', async () => {
    const contract = await pooldao.getNodeContract('15');
    const result = await pooldao.user.refund(contract).send({
      from: TEST_OPERATOR,
      gas: 1000000000
    });
    console.log(result);
  });

  it('swap', async () => {
    const result = await pooldao.user.swap('1').send({
      from: TEST_OPERATOR,
      gas: 1000000000
    });
    console.log(result);
  });
});

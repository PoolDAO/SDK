import Pooldao from '../index';

import { TEST_OPERATOR } from './testAccounts';

describe('user', () => {
  let pooldao: Pooldao;

  beforeAll(async () => {
    jest.setTimeout(100000);

    pooldao = new Pooldao({
      host: 'http://47.106.144.61:8545',
      proxyAddress: '0x1e92877766c94c9913A4EcC90B45E18968dc662D'
    });

    await pooldao.init();
  });

  it('deposit', async () => {
    const contract = await pooldao.getNodeContract('15');
    const result = await pooldao.user.deposit(contract).send({
      from: TEST_OPERATOR,
      value: 1000000,
      gas: 1000000000
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

import Pooldao from '../Pooldao';

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

  it('validatorExit', async () => {
    const result = await pooldao.oracle.validatorExit('0x0000000000000000000000000000000000000000').send({
      from: TEST_OPERATOR,
      gas: 1000000000
    });
    console.log(result);
  });

  it('validatorExit', async () => {
    const result = await pooldao.oracle
      .validatorSettlement('0x0000000000000000000000000000000000000000', '10000000')
      .send({
        from: TEST_OPERATOR,
        gas: 1000000000
      });
    console.log(result);
  });

  it.only('reputationChange', async () => {
    const result = await pooldao.oracle
      .reputationChange('0x0000000000000000000000000000000000000000', '10000000')
      .send({
        from: TEST_OPERATOR,
        gas: 1000000000
      });
    console.log(result);
  });
});

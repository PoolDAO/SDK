import Pooldao from '../index';

import { TEST_OPERATOR } from './testAccounts';

describe('operator', () => {
  let pooldao: Pooldao;

  jest.setTimeout(100000);

  beforeAll(async () => {
    pooldao = new Pooldao({
      host: 'http://47.106.144.61:8545',
      proxyAddress: '0x1e92877766c94c9913A4EcC90B45E18968dc662D'
    });

    await pooldao.init();
  });

  it('createOperator', async () => {
    const result = await pooldao.operator.createOperator('哈哈哈哈').send({
      from: TEST_OPERATOR,
      gas: 1000000000
    });
    console.log(result);
  });

  it.only('createNode', async () => {
    console.log(pooldao.operator.createNode('哈哈哈哈', 2, 30, '0x0000000000000000000000000000000000000000'));
    // const result = await pooldao.operator
    //   .createNode('哈哈哈哈', 2, 30, '0x0000000000000000000000000000000000000000')
    //   .send({
    //     from: TEST_OPERATOR,
    //     gas: 1000000000,
    //     chainId: 1
    //   });
    // console.log(result);
  });
});

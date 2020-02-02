import Pooldao from '../Pooldao';

import { TEST_OPERATOR } from './testAccounts';

describe('operator', () => {
  let pooldao: Pooldao;

  beforeAll(async () => {
    jest.setTimeout(100000);

    pooldao = new Pooldao({
      host: 'http://47.106.144.61:8545',
      proxyAddress: '0x1e92877766c94c9913A4EcC90B45E18968dc662D'
    });

    await pooldao.init();
  });

  it('createOperator', async () => {
    const sendMethod = pooldao.operator.createOperator('哈哈哈哈');

    const result = await sendMethod.send({
      from: TEST_OPERATOR,
      gas: 1000000000
    });
  });

  it('createNode', async () => {
    const result = await pooldao.operator
      .createNode('哈哈哈哈', 2, 30, '0x0000000000000000000000000000000000000000')
      .send({
        from: TEST_OPERATOR,
        gas: 1000000000
      });

    expect(result.status).toBe(true);
  });

  it('initNode', async () => {
    const result = await pooldao.operator
      .initNode(
        '1',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000'
      )
      .send({
        value: '4000000000000',
        from: TEST_OPERATOR,
        gas: 1000000000
      });
  });

  it('revoked', async () => {
    const contract = await pooldao.getNodeContract('18');
    const result = await pooldao.operator.revoked(contract).send({
      from: TEST_OPERATOR,
      gas: 1000000000
    });
    console.log(result);
  });

  it.only('startStaking', async () => {
    const contract = await pooldao.getNodeContract('15');
    const result = await pooldao.operator.startStaking(contract).send({
      from: TEST_OPERATOR,
      gas: 1000000000
    });
    console.log(result);
  });
});

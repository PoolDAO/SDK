import Pooldao from '../index';

describe('pooldao', () => {
  let pooldao: Pooldao;

  beforeAll(async () => {
    pooldao = new Pooldao({
      host: 'http://47.106.144.61:8545',
      proxyAddress: '0x1e92877766c94c9913A4EcC90B45E18968dc662D'
    });

    await pooldao.init()
  });

  it('getAbi', async () => {
    expect(await pooldao.getAbi('OperatorManager')).toBeDefined();
    expect(await pooldao.getAbi('NodeManager')).toBeDefined();
    expect(await pooldao.getAbi('Oracle')).toBeDefined();
    expect(await pooldao.getAbi('PoolETHToken')).toBeDefined();
  });

  it('getAddress', async () => {
    expect(await pooldao.getAddress('OperatorManager')).toBeDefined();
    expect(await pooldao.getAddress('NodeManager')).toBeDefined();
    expect(await pooldao.getAddress('Oracle')).toBeDefined();
    expect(await pooldao.getAddress('PoolETHToken')).toBeDefined();
  });
});

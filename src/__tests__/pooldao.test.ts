import Web3 from 'web3';
import Pooldao from '../Pooldao';

describe('pooldao', () => {
  let pooldao: Pooldao;
  jest.setTimeout(800000);

  beforeAll(async () => {
    pooldao = new Pooldao({
      provider: new Web3.providers.HttpProvider('http://47.106.144.61:8545'),
      proxyAddress: '0x1e92877766c94c9913A4EcC90B45E18968dc662D'
    });

    await pooldao.init();
  });

  it('getAbi', async () => {
    expect(await pooldao.getAbi('OperatorManager')).toBeDefined();
    expect(await pooldao.getAbi('NodeManager')).toBeDefined();
    expect(await pooldao.getAbi('Oracle')).toBeDefined();
    expect(await pooldao.getAbi('PoolETHToken')).toBeDefined();
    expect(await pooldao.getAbi('Node')).toBeDefined();
  });

  it('getAddress', async () => {
    // expect(await pooldao.getAddress('OperatorManager')).toBeDefined();
    // expect(await pooldao.getAddress('NodeManager')).toBeDefined();
    // expect(await pooldao.getAddress('Oracle')).toBeDefined();
    // expect(await pooldao.getAddress('PoolETHToken')).toBeDefined();
  });

  it('getOperatorInfo', async () => {
    console.log(await pooldao.getOperatorInfo('0'));
  });

  it('getNodeInfo', async () => {
    console.log(await pooldao.getNodeInfo('1'));
  });
});

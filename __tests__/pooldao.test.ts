import Pooldao from '../index';

describe('pooldao', () => {
  let pooldao: Pooldao;

  beforeAll(() => {
    pooldao = new Pooldao({
      host: 'http://47.106.144.61:8545',
      contractAddresses: {
        proxy: '0x1e92877766c94c9913A4EcC90B45E18968dc662D',
        operatorManager: '0x0FE5E87D761A96847c7D50a06Cf71f78Af01d788',
        nodeManager: '0x609E1ad74eCDA2D8224424d35AA5b1F220d9beBC',
        oracle: '0x834Cebc3ef474589473fbDC0B3d9eFc9166c024E'
      }
    });
  });

  it('getAbi', async () => {
    expect(await pooldao.getAbi('OperatorManager')).toBeDefined();
    expect(await pooldao.getAbi('NodeManager')).toBeDefined();
    expect(await pooldao.getAbi('Oracle')).toBeDefined();
    expect(await pooldao.getAbi('PoolETHToken')).toBeDefined();
  });
});

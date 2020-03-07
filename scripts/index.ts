import Web3 from 'web3';
import Pooldao from './Pooldao';
import { TEST } from './testAccounts';

const pooldao = new Pooldao({
  provider: new Web3.providers.HttpProvider('http://47.106.144.61:8545'),
  proxyAddress: '0x3bc5E5f63a91C0B23Ee82733321a971Add3c2Cb7'
});

(async () => {
  await pooldao.init();
  // await pooldao.createOperator(TEST[1], '中文运营商')
  // await pooldao.createNode(TEST[1], '清算清算')
  // await pooldao.initNode(TEST[1], '9')
  await pooldao.startStaking(TEST[1], '8');
  // await pooldao.validatorExit(TEST[1]);
  // await pooldao.validatorSettlement(TEST[1]);
  // console.log('ssss');
  // await pooldao.depositToFull(TEST[8], '8');
})();

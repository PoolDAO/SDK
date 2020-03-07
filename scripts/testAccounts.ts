import Web3 from 'web3';

const privatekeys = [
  '0x671f8871a16f18524e0795cba2793fade1a8f94c0f7e9b140c9f3230e0801161',
  '0xfb2d1b223d277456257529ac9a56640ab82a9e5ea409cd788e5f52f8905332e3',
  '0xcbb69e72b5103c6fd40c5dd227a4309afbd08ce7adadf9d77f5b6d1d666ac742',
  '0x323441960b52f366b2853df6859b9c1a973a61278d763dd58sc30d566ef3356f6',
  '0xd902f6763884eaee1d752c06510618906fcfb3f4291c1ad2ae56a4e4d438a952',
  '0xc900d4716bc4f13d530eb6af6be342ae2b733276e96e6cb2cb158c23a099f293',
  '0x027056bc87986b6d6c9bd06d0957326eca90664276bf2407d4cd5fa920c7aec2',
  '0x602ffe156e4eb0e1d176cbd427344c7e6a2f8ebc1b7e51ff11268cacc5fa0f29',
  '0x6d558da3e3462913d98c576df16a43f5d025b63c83b133ddcc393961c6c16143',
  '0x92596faed4840814d695d7b77ba1ad10d417a182d823b06eed879d9b66061d0e'
];

const web3 = new Web3(new Web3.providers.HttpProvider('http://47.106.144.61:8545'));

for (var i = 0; i < privatekeys.length; i++) {
  web3.eth.accounts.wallet.add(privatekeys[i]);
}

export const TEST = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => web3.eth.accounts.wallet[index].address);

/* istanbul ignore file */

import Web3 from 'web3';

const privatekeys = [
  '0x671f8871a16f18524e0795cba2793fade1a8f94c0f7e9b140c9f3230e0801161',
  '0xfb2d1b223d277456257529ac9a56640ab82a9e5ea409cd788e5f52f8905332e3',
  '0xcbb69e72b5103c6fd40c5dd227a4309afbd08ce7adadf9d77f5b6d1d666ac742',
  '0x323441960b52f366b2853df6859b9c1a973a61278d763dd58c30d566ef3356f6',
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
// [
//   '0x19660C819eF9951CDB4208Bb9631C3E3b1334984',
//   '0x438bF5a338d04D6521Ab7f167f958703269c1F35',
//   '0xC57496c978FAa963b5a8e4c5FAF12fC68a201B8c',
//   '0xb14b61399790AF5B539f4Be50966007b20ab95E2',
//   '0xb3c428015A001E860865E59B94ad8C13395f7971',
//   '0x1D41bF01218d7e3Fb78fbb843e370028f070348D',
//   '0x550b996b7633B823Fac339c3C6B6147429b7660d',
//   '0x355fD32a664Ff862446C0723B4B1D184979cE635',
//   '0xb446D06a5deaB1CACFdc9Eb767Afe8236A4BD673',
//   '0x806334c880B4631F62A9321F7404630e27467D03'
// ];
// export const TEST_TRUST = web3.eth.accounts.wallet[1].address;
export const TEST_OPERATOR = web3.eth.accounts.wallet[6].address;
export const TEST_USER = web3.eth.accounts.wallet[3].address;

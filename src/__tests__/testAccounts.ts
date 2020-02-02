import Web3 from 'web3';

const privatekeys = [
  '0xfbb2dff8ba2a02a1a590d6c120ba0e3ecf5865e7727aad3f3c072aca970eeb0f',
  '0xfd193817ab93c3f84dceffa88889819bc0d4ac741cb81d1db7f62d632c9ac40a',
  '0xb966a6bddfae3a79aaa41c34934cd3378c2e0126608c5a1b131bea73c176563c',
  '0x362661b390441a04b91ec8a94ea21a4419cbc55a9f975797dc36d4cbbe729d64',
  '0xbc3576aa53800c3278bb327b3e386c5ec642214fabeab4ec95560c550566e23e',
  '0x1df22d6e0c5b166e50aa6143e109263790ca27337cd5e31303cfd56e1a4a5bbd',
  '0x53d18d5807bb9521d95e5f2b45d7a67d0b13b49d9ddc6733616e17ea930eb549',
  '0x763458989f354da3f57232780f865cf8d7ac64e6997d4264a4af9130245bc8d0',
  '0x42edef576abdb987c7f16e798e3c08655427ca07abfd754eb909934db4c03d6d',
  '0x1fb8c41548649632d18b3181b5796cdf34ae1640cd25b6a78b5910d14baa1bef'
];

const web3 = new Web3(new Web3.providers.HttpProvider('http://47.106.144.61:8545'));

for (var i = 0; i < privatekeys.length; i++) {
  web3.eth.accounts.wallet.add(privatekeys[i]);
}

export const TEST_TRUST = web3.eth.accounts.wallet[1].address;
export const TEST_OPERATOR = web3.eth.accounts.wallet[5].address;
export const TEST_USER = web3.eth.accounts.wallet[3].address;

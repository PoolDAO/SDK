import nacl from 'tweetnacl';

export default (length: number = 20) => {
  return '0x' + Buffer.from(nacl.randomBytes(length)).toString('hex');
};

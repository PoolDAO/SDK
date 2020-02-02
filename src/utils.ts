import pako from 'pako';

export const decompressABI = (abi: string): string => {
  return JSON.parse(
    pako.inflate(Buffer.from(abi, 'base64'), {
      to: 'string'
    })
  );
};

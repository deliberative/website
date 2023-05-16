export const uint8ToHex = (array: Uint8Array) => {
  return array.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
};

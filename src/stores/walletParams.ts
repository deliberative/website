import { writable, get, type Writable } from 'svelte/store';

import { uint8ToHex } from '../storage/utils/uint8ToHex';

const validateChars = (value: string): boolean => {
  const hasOnlyLetters = /^[a-zA-Z]+$/.test(value);
  if (!hasOnlyLetters) {
    if (value.indexOf(' ') !== -1) {
      value.replaceAll(' ', '');
      const hasOnlyLettersAgain = /^[a-zA-Z]+$/.test(value);
      if (!hasOnlyLettersAgain) return false;
    }
  }

  return true;
};

export const bits = [128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 480, 512];

export let mnemonic: Writable<string[]> = writable([
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  ''
]);
export let password: Writable<string> = writable('');
export let entropy: Writable<
  128 | 160 | 192 | 224 | 256 | 288 | 320 | 352 | 384 | 416 | 448 | 480 | 512
> = writable(128);
export let isValid: Writable<boolean> = writable(false);
export let reasonIsNotValid: Writable<string> = writable('Minimum number of words is 12.');

entropy.subscribe((value) => {
  if (!bits.includes(value)) entropy.set(128);
});

entropy.subscribe((value) => {
  const len = get(mnemonic).length;

  switch (value) {
    case 128: {
      if (len > 12) {
        mnemonic.update((m) => {
          return m.slice(0, 12);
        });
      } else if (len < 12) {
        const arr: string[] = [];
        for (let i = len; i < 12; i++) {
          arr.push('');
        }
        mnemonic.update((m) => {
          return m.concat(arr);
        });
      }

      break;
    }

    case 160: {
      if (len > 15) {
        mnemonic.update((m) => {
          return m.slice(0, 15);
        });
      } else if (len < 15) {
        const arr: string[] = [];
        for (let i = len; i < 15; i++) {
          arr.push('');
        }
        mnemonic.update((m) => {
          return m.concat(arr);
        });
      }

      break;
    }

    case 192: {
      if (len > 18) {
        mnemonic.update((m) => {
          return m.slice(0, 18);
        });
      } else if (len < 18) {
        const arr: string[] = [];
        for (let i = len; i < 18; i++) {
          arr.push('');
        }
        mnemonic.update((m) => {
          return m.concat(arr);
        });
      }

      break;
    }

    case 224: {
      if (len > 21) {
        mnemonic.update((m) => {
          return m.slice(0, 21);
        });
      } else if (len < 21) {
        const arr: string[] = [];
        for (let i = len; i < 21; i++) {
          arr.push('');
        }
        mnemonic.update((m) => {
          return m.concat(arr);
        });
      }

      break;
    }

    case 256: {
      if (len > 24) {
        mnemonic.update((m) => {
          return m.slice(0, 24);
        });
      } else if (len < 24) {
        const arr: string[] = [];
        for (let i = len; i < 24; i++) {
          arr.push('');
        }
        mnemonic.update((m) => {
          return m.concat(arr);
        });
      }

      break;
    }

    case 288: {
      if (len > 27) {
        mnemonic.update((m) => {
          return m.slice(0, 27);
        });
      } else if (len < 27) {
        const arr: string[] = [];
        for (let i = len; i < 27; i++) {
          arr.push('');
        }
        mnemonic.update((m) => {
          return m.concat(arr);
        });
      }

      break;
    }

    case 320: {
      if (len > 30) {
        mnemonic.update((m) => {
          return m.slice(0, 30);
        });
      } else if (len < 30) {
        const arr: string[] = [];
        for (let i = len; i < 30; i++) {
          arr.push('');
        }
        mnemonic.update((m) => {
          return m.concat(arr);
        });
      }

      break;
    }

    case 352: {
      if (len > 33) {
        mnemonic.update((m) => {
          return m.slice(0, 33);
        });
      } else if (len < 33) {
        const arr: string[] = [];
        for (let i = len; i < 33; i++) {
          arr.push('');
        }
        mnemonic.update((m) => {
          return m.concat(arr);
        });
      }

      break;
    }

    case 384: {
      if (len > 36) {
        mnemonic.update((m) => {
          return m.slice(0, 36);
        });
      } else if (len < 36) {
        const arr: string[] = [];
        for (let i = len; i < 36; i++) {
          arr.push('');
        }
        mnemonic.update((m) => {
          return m.concat(arr);
        });
      }

      break;
    }

    case 416: {
      if (len > 39) {
        mnemonic.update((m) => {
          return m.slice(0, 39);
        });
      } else if (len < 39) {
        const arr: string[] = [];
        for (let i = len; i < 39; i++) {
          arr.push('');
        }
        mnemonic.update((m) => {
          return m.concat(arr);
        });
      }

      break;
    }

    case 448: {
      if (len > 42) {
        mnemonic.update((m) => {
          return m.slice(0, 42);
        });
      } else if (len < 42) {
        const arr: string[] = [];
        for (let i = len; i < 42; i++) {
          arr.push('');
        }
        mnemonic.update((m) => {
          return m.concat(arr);
        });
      }

      break;
    }

    case 480: {
      if (len > 45) {
        mnemonic.update((m) => {
          return m.slice(0, 45);
        });
      } else if (len < 45) {
        const arr: string[] = [];
        for (let i = len; i < 45; i++) {
          arr.push('');
        }
        mnemonic.update((m) => {
          return m.concat(arr);
        });
      }

      break;
    }

    case 512: {
      if (len > 48) {
        mnemonic.update((m) => {
          return m.slice(0, 48);
        });
      } else if (len < 48) {
        const arr: string[] = [];
        for (let i = len; i < 48; i++) {
          arr.push('');
        }
        mnemonic.update((m) => {
          return m.concat(arr);
        });
      }

      break;
    }
  }
});

export const zeroMnemonic = async () => {
  const len = get(mnemonic).length;
  mnemonic.update((value) => {
    for (let i = 0; i < len; i++) {
      value[i] = '';
    }

    return value;
  });
  isValid.set(false);
  reasonIsNotValid.set('Words not in wordlist');
};

export const generateMnemonic = async (
  bits: 128 | 160 | 192 | 224 | 256 | 288 | 320 | 352 | 384 | 416 | 448 | 480 | 512 = 128
) => {
  const m = await dcrypto.generateMnemonic(bits);
  const mArr = m.split(' ');
  const len = get(mnemonic).length;
  mnemonic.update((value) => {
    for (let i = 0; i < len; i++) {
      value[i] = mArr[i];
    }

    return value;
  });
  isValid.set(true);
  reasonIsNotValid.set('');
};

export const generateNonce = async (len = 32) => {
  const nonce = await dcrypto.randomBytes(len);
  const nonceHex = uint8ToHex(nonce);
  password.set(nonceHex);
};

export const addWordToMnemonic = (word: string, position = 0) => {
  console.log(word);
  console.log(position);

  const hasValidChars = validateChars(word);
  if (!hasValidChars) {
    if (get(isValid)) isValid.set(false);
    reasonIsNotValid.set('Invalid character(s) in word');
  }

  if (!dcrypto.wordlist.includes(word)) {
    if (get(isValid)) isValid.set(false);
    reasonIsNotValid.set('Word not on the wordlist');
  }

  mnemonic.update((m) => {
    m[position] = word;

    return m;
  });
};

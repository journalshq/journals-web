import * as passphrase from '@liskhq/lisk-passphrase';
const { Mnemonic } = passphrase;

const MAX_WORD_LENGTH = 8;

export const isValidPassphrase = (passphrase: string[]) => {
  const normalizedValue = passphrase.join(' ') || '';
  let isValid;
  try {
    isValid =
      passphrase.length >= 12 && Mnemonic.validateMnemonic(normalizedValue);
  } catch (e) {
    // If the mnemonic check throws an error, we assume that the
    // passphrase being entered isn't valid
    isValid = false;
  }
  return isValid;
};

export const getPassphraseValidationErrors = (passphrase: string[]) => {
  const partialPassphraseError: boolean[] = [];
  const invalidWords = passphrase.filter(word => {
    const isNotInDictionary = word !== '' && !inDictionary(word);
    partialPassphraseError[passphrase.indexOf(word)] = isNotInDictionary;
    return isNotInDictionary;
  });

  const filteredPassphrase = passphrase.filter(word => !!word);

  let validationError = 'Passphrase is not valid';

  if (filteredPassphrase.length < 12) {
    validationError = `Passphrase should have 12 words, entered passphrase has ${filteredPassphrase.length}`;
  }

  if (invalidWords.length > 0) {
    validationError =
      'Please check the highlighted word and make sure it’s correct.';
  }

  return {
    validationError,
    partialPassphraseError,
    passphraseIsInvalid: invalidWords.length > 0
  };
};

export const levenshteinDistance = (word1: string, word2: string) => {
  // @ts-ignore
  const calculateDistance = (i: number, j: number) => {
    if (Math.min(i, j) === 0) return Math.max(i, j);

    return Math.min(
      calculateDistance(i, j - 1) + 1,
      calculateDistance(i - 1, j) + 1,
      calculateDistance(i - 1, j - 1) + (word1[i] !== word2[j] ? 1 : 0)
    );
  };
  return calculateDistance(word1.length, word2.length);
};

/**
 * @param {string} word
 * @returns {bool}
 */
export const inDictionary = (word: string) =>
  Mnemonic.wordlists.english.indexOf(word) !== -1;

export const reducedDictByWordLength = Mnemonic.wordlists.english.reduce(
  (acc, el) => {
    const len = el.length;
    if (acc[len]) {
      acc[len].push(el);
    } else {
      acc[len] = [el];
    }
    return acc;
  },
  {}
);

const getByKey = (key: number) => [
  reducedDictByWordLength[key - 1],
  reducedDictByWordLength[key],
  reducedDictByWordLength[key + 1]
];

export const getWordsFromDictByLength = (len: number) => {
  const n = len > MAX_WORD_LENGTH ? MAX_WORD_LENGTH : len;
  return getByKey(n)
    .filter(el => el)
    .reduce((acc, el) => acc.concat(el), []);
};

const matchPartOfString = (word: string, begin: string, end: string) =>
  word.startsWith(begin) || word.endsWith(end);

/**
 * Find the similar word based on invalid word
 * @param {string} invalidWord
 * @returns {string} Similar word
 */
export const findSimilarWord = (invalidWord: string) => {
  // eslint-disable-line max-statements
  let similarWorld;
  let prevDistance = 100;
  const n = Math.floor((invalidWord.length - 1) / 2);

  const beginWith = invalidWord.slice(0, n);
  const endsWith = invalidWord.slice(-n);

  const dictionary = getWordsFromDictByLength(invalidWord.length);

  for (let i = 0; i < dictionary.length; i++) {
    const validWord = dictionary[i];
    if (validWord.indexOf(invalidWord) !== -1) {
      return validWord;
    }
    if (matchPartOfString(validWord, beginWith, endsWith)) {
      const distance = levenshteinDistance(invalidWord, validWord);
      if (distance < prevDistance) {
        prevDistance = distance;
        similarWorld = validWord;
      }
    }
  }
  return similarWorld;
};

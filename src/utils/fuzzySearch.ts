export const fuzzySearch = (
  word: string,
  wordlist: string[]
): Promise<{ match: string; score: number }[]> => {
  const needle = word.toLowerCase();

  return new Promise((resolve) => {
    const filteredSuggestions = wordlist
      .filter((str) => {
        let i = 0,
          n = -1,
          l;
        str = str.toLowerCase();

        for (; (l = needle[i++]); ) if (!~(n = str.indexOf(l, n + 1))) return false;

        return true;
      })
      .map((match) => {
        const score = match.split('').reduce((acc, l, idx) => {
          return needle[idx] === l ? acc + 1 : acc;
        }, 0);

        return { match, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    resolve(filteredSuggestions);
  });
};

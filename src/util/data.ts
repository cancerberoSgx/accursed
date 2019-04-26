export const arr = (a: number = number(10, 20), b = a) => new Array(Math.trunc(number(a, b) || 1)).fill(0)

export const string = (length: number = number(10, 20)) =>
  arr(length / 5 + 1)
    .map(i =>
      Math.random()
        .toString(36)
        .substr(2, 5)
    )
    .reduce((a, b) => a.concat(b))

export const words = (
  wordCount = number(10, 20),
  wordLength = number(5, 10),
  wordCountB = wordCount,
  wordLengthB = wordLength
) => arr(wordCount, wordCountB).map(i => string(number(wordLength, wordLengthB)))

export const number = (a = 10, b = a) => Math.floor(Math.random() * b) + (a === b ? 0 : a)

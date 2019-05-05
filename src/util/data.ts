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

// export function number(a = 0, b = 10) {
//   return randomIntBetween(a, b)
// }
export const number = (a = 10, b = a) => Math.floor(Math.random() * b) + (a === b ? 0 : a)
export function color() {
  const colors = ['red', 'blue', 'cyan', 'green', 'magenta', 'yellow', 'brown']
  return colors[number(0, colors.length - 1)]
}

export function randomHex() {
  return `#${(number(0, 255).toString(16), number(0, 255).toString(16), number(0, 255).toString(16))}`
}

export function invertColor(hex) {
  function padZero(str: string, len?: number) {
    len = len || 2
    var zeros = new Array(len).join('0')
    return (zeros + str).slice(-len)
  }
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16)
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b)
}

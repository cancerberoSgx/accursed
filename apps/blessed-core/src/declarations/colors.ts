
type ColorRgb = [number, number, number]

type Color = number | string

interface Colors {
  /**
   * Match given color in a high level form (like rgb or hex expression) with a terminal color number
   * interpolatingg to a similar color.
   */
  match(r1: Color | ColorRgb, g1?: number, b1?: number): number
  convert(color: Color): number
  mixColors(c1: number, c2: number, alpha: number): number
  RGBToHex(r: number, g: number, b: number): string
  hexToRGB(hex: string): ColorRgb
  blend(attr: number, attr2?: number, alpha?: number): number
  /**
 Seed all 256 colors. Assume xterm defaults.
 Ported from the xterm color generation script. */
  colors(): number[]
  /**  Map higher colors to the first 8 colors.
 This allows translation of high colors to low colors on 8-color terminals. */
  ccolors(): number[]

  colorNames: {
    black: 0
    red: 1
    green: 2
    yellow: 3
    blue: 4
    magenta: 5
    cyan: 6
    white: 7
    // light
    lightblack: 8
    lightred: 9
    lightgreen: 10
    lightyellow: 11
    lightblue: 12
    lightmagenta: 13
    lightcyan: 14
    lightwhite: 15
    // bright
    brightblack: 8
    brightred: 9
    brightgreen: 10
    brightyellow: 11
    brightblue: 12
    brightmagenta: 13
    brightcyan: 14
    brightwhite: 15
    // alternate spellings
    grey: 8
    gray: 8
    lightgrey: 7
    lightgray: 7
    brightgrey: 7
    brightgray: 7
  }
}

export const colors: Colors = require('../blessed/colors')

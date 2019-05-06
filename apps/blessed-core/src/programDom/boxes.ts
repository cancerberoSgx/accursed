import { enumKeys } from 'misc-utils-of-mine-generic'
import { ProgramDocumentRenderer } from './programDocumentRenderer';
import { ProgramElement } from './programElement';


export enum BorderStyle {
  light = 'light',
  'double' = 'double',
  'round' = 'round',
  'heavy' = 'heavy',
  lightDouble = 'lightDouble',
  doubleLight = 'doubleLight',
  'classic' = 'classic',
  lightTripleDash = 'lightTripleDash',
  lightQuadrupleDash = 'lightQuadrupleDash',
  lightDoubleDash = 'lightDoubleDash',
  heavier = 'heavier',
  roundDoubleDash = 'roundDoubleDash',
  roundTripleDash = 'roundTripleDash',
  roundQuadrupleDash = 'roundQuadrupleDash',
  heavyDoubleDash = 'heavyDoubleDash',
  heavyTripleDash = 'heavyTripleDash',
  heavyQuadrupleDash = 'heavyQuadrupleDash',

  singleRareCorners = 'singleRareCorners',
  triangleCorners = 'triangleCorners'
  // 'round2' = 'round2',
  // 'round3' = 'round3',
}

export const borderStyles = enumKeys(BorderStyle)

export enum BorderSide {
  'topLeft' = 'topLeft',
  'topRight' = 'topRight',
  'bottomRight' = 'bottomRight',
  'bottomLeft' = 'bottomLeft',
  'left' = 'left',
  'bottom' = 'bottom',
  'top' = 'top',
  right = 'right'
}

export function getBoxStyle(s: BorderStyle) {
  return getBoxStyles()[s]
}

export function getBoxStyleChar(s: BorderStyle, si: BorderSide) {
  return getBoxStyles()[s][si]
}

type BoxStyles = { [s in BorderStyle]: { [side in BorderSide]: string } }

let boxStyles: BoxStyles | undefined

interface RenderBorderBoxOptions {
  coords: {xi: number, yi: number, xl: number ,yl: number}, 
  write: (y: number, x: number, s: string)=>void
  borderStyle: BorderStyle  
}

interface DrawElementBorderOptions {
  renderer: ProgramDocumentRenderer
  el: ProgramElement
  borderStyle: BorderStyle  
}

export function drawElementBorder({el, renderer, borderStyle}: DrawElementBorderOptions) {
  renderBorderBox({ borderStyle, write: renderer.write.bind(renderer), coords: { xi: el.absoluteLeft - 1, xl: el.absoluteLeft + el.props.width + 1, yi: el.absoluteTop - 1, yl: el.absoluteTop + el.props.height + 1 } });
}

export function renderBorderBox(options: RenderBorderBoxOptions) {
  options.write(options.coords.yi, options.coords.xi, getBoxStyleChar(options.borderStyle, BorderSide.topLeft))
  options.write(options.coords.yi, options.coords.xl-1, getBoxStyleChar(options.borderStyle, BorderSide.topRight))
  options.write(options.coords.yl-1, options.coords.xi, getBoxStyleChar(options.borderStyle, BorderSide.bottomLeft))
  options.write(options.coords.yl-1, options.coords.xl-1, getBoxStyleChar(options.borderStyle, BorderSide.bottomRight))
  for (let j = options.coords.yi + 1; j < options.coords.yl - 1; j++) {
  options.write(j, options.coords.xi, getBoxStyleChar(options.borderStyle, BorderSide.left))
    options.write(j, options.coords.xl-1, getBoxStyleChar(options.borderStyle, BorderSide.right))
  }
  for (let i = options.coords.xi + 1; i < options.coords.xl - 1; i++) {
    options.write(options.coords.yi, i, getBoxStyleChar(options.borderStyle, BorderSide.top))
    options.write(options.coords.yl-1, i, getBoxStyleChar(options.borderStyle, BorderSide.bottom))
  }
}

function getBoxStyles(): BoxStyles  {
  if (!boxStyles) {
    boxStyles = {
      light: {
        topLeft: '┌',
        topRight: '┐',
        bottomRight: '┘',
        bottomLeft: '└',
        left: '│',
        right: '│',
        bottom: '─',
        top: '─'
      },
      lightTripleDash: {
        topLeft: '┌',
        topRight: '┐',
        bottomRight: '┘',
        bottomLeft: '└',
        left: '┆',
        right: '┆',
        bottom: '┄',
        top: '┄'
      },
      lightQuadrupleDash: {
        topLeft: '┌',
        topRight: '┐',
        bottomRight: '┘',
        bottomLeft: '└',
        left: '┊',
        right: '┊',
        bottom: '┈',
        top: '┈'
      },
      lightDoubleDash: {
        topLeft: '┌',
        topRight: '┐',
        bottomRight: '┘',
        bottomLeft: '└',
        left: '╎',
        right: '╎',
        bottom: '╌',
        top: '╌'
      },

      double: {
        topLeft: '╔',
        topRight: '╗',
        bottomRight: '╝',
        bottomLeft: '╚',
        left: '║',
        right: '║',
        bottom: '═',
        top: '═'
      },
      round: {
        topLeft: '╭',
        topRight: '╮',
        bottomRight: '╯',
        bottomLeft: '╰',
        left: '│',
        right: '│',
        bottom: '─',
        top: '─'
      },
      roundDoubleDash: {
        topLeft: '╭',
        topRight: '╮',
        bottomRight: '╯',
        bottomLeft: '╰',
        left: '╎',
        right: '╎',
        bottom: '╌',
        top: '╌'
      },
      roundTripleDash: {
        topLeft: '╭',
        topRight: '╮',
        bottomRight: '╯',
        bottomLeft: '╰',
        left: '┆',
        right: '┆',
        bottom: '┄',
        top: '┄'
      },
      roundQuadrupleDash: {
        topLeft: '╭',
        topRight: '╮',
        bottomRight: '╯',
        bottomLeft: '╰',
        left: '┊',
        right: '┊',
        bottom: '┈',
        top: '┈'
      },

      heavy: {
        topLeft: '┏',
        topRight: '┓',
        bottomRight: '┛',
        bottomLeft: '┗',
        left: '┃',
        right: '┃',
        bottom: '━',
        top: '━'
      },

      heavyDoubleDash: {
        topLeft: '┏',
        topRight: '┓',
        bottomRight: '┛',
        bottomLeft: '┗',
        left: '╏',
        right: '╏',
        bottom: '╍',
        top: '╍'
      },
      heavyTripleDash: {
        topLeft: '┏',
        topRight: '┓',
        bottomRight: '┛',
        bottomLeft: '┗',
        left: '┇',
        right: '┇',
        bottom: '┅',
        top: '┅'
      },
      heavyQuadrupleDash: {
        topLeft: '┏',
        topRight: '┓',
        bottomRight: '┛',
        bottomLeft: '┗',
        left: '┋',
        right: '┋',
        bottom: '┉',
        top: '┉'
      },

      heavier: {
        topLeft: '▛',
        topRight: '▜',
        bottomRight: '▟',
        bottomLeft: '▙',
        left: '▌',
        right: '▐',
        bottom: '▄',
        top: '▀'
      },
      lightDouble: {
        topLeft: '╓',
        topRight: '╖',
        bottomRight: '╜',
        bottomLeft: '╙',
        left: '║',
        right: '║',
        bottom: '─',
        top: '─'
      },
      singleRareCorners: {
        bottom: '⎽',
        top: '⎺',
        left: '⎢',
        right: '⎥',
        topLeft: '⎡',
        topRight: '⎤',
        bottomRight: '⎦',
        bottomLeft: '⎣'
      },

      triangleCorners: {
        bottom: '_',
        top: '⎻',
        left: '⎸',
        right: ' ⎸',
        topLeft: '◸',
        topRight: '◹',
        bottomRight: '◿',
        bottomLeft: '◺'
      },

      doubleLight: {
        topLeft: '╒',
        topRight: '╕',
        bottomRight: '╛',
        bottomLeft: '╘',
        left: '│',
        right: '│',
        bottom: '═',
        top: '═'
      },
      classic: {
        topLeft: '+',
        topRight: '+',
        bottomRight: '+',
        bottomLeft: '+',
        left: '|',
        right: '|',
        bottom: '═',
        top: '-'
      }
    }
  }
  return boxStyles
}

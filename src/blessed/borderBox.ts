import { isObject } from 'misc-utils-of-mine-generic'
import { widget, Widgets } from '..'
import { PositionCoords } from '../blessedTypes'
import { React } from '../jsx'
import { BorderSide, BorderStyle, getBoxStyleChar } from '../util/boxes'
// import { BorderSide, BorderStyle, getBoxStyleChar } from './border'

interface BorderBoxOptionsConcrete {
  borderStyle: BorderStyle
  removeLabel?: boolean
  // style?: Style&{border?: Border}
}
export interface BorderBoxOptions extends Widgets.BoxOptions, BorderBoxOptionsConcrete { }

/**
 * Its a [[box]] that support extra border styles. It will respect element's label by default but this can
 * be configures with option [[BorderBoxOptions.removeLabel]]
 *
 * The border will take style from `options.style.border`, for example, border color will be `style.border.color`
 * Internally it takes advantage of Element's render() implementation that gives extra padding for border="line".
 * So it set's border: 'line' an after the box is rendered it will render the border again.
 */
export class BorderBox extends widget.Box {
  type = 'borderbox'

  static defaultOptions: BorderBoxOptions = {
    borderStyle: BorderStyle.light,
    removeLabel: false
  }

  options: BorderBoxOptions

  constructor(options: BorderBoxOptions = BorderBox.defaultOptions as any) {
    super({ ...(BorderBox.defaultOptions as any), ...getBorderBoxOptions(options) })
    this.options.style = options.style || {}
    this.options.style.border = isObject(this.options.style.border) ? this.options.style.border : { type: 'line' }
  }

  render() {
    var coords = super.render()
    if (!coords) {
      return
    }
    this.renderBorderBox(coords)
    return coords
  }

  renderBorderBox(coords: PositionCoords) {
    const attr = this.sattr((this.options.style.border as any) || { type: 'line' })
    const labelCoords = this._label ? this._label._getCoords() : undefined
    this.screen.lines[coords.yi][coords.xi] = [attr, getBoxStyleChar(this.options.borderStyle, BorderSide.topLeft)]
    this.screen.lines[coords.yi][coords.xl - 1] = [attr, getBoxStyleChar(this.options.borderStyle, BorderSide.topRight)]
    if (!this.screen.lines[coords.yl - 1]) {
      return
    }
    this.screen.lines[coords.yl - 1][coords.xi] = [
      attr,
      getBoxStyleChar(this.options.borderStyle, BorderSide.bottomLeft)
    ]
    this.screen.lines[coords.yl - 1][coords.xl - 1] = [
      attr,
      getBoxStyleChar(this.options.borderStyle, BorderSide.bottomRight)
    ]
    for (let j = coords.yi + 1; j < coords.yl - 1; j++) {
      this.screen.lines[j][coords.xi] = [attr, getBoxStyleChar(this.options.borderStyle, BorderSide.left)]
      this.screen.lines[j][coords.xl - 1] = [attr, getBoxStyleChar(this.options.borderStyle, BorderSide.right)]
    }
    for (let i = coords.xi + 1; i < coords.xl - 1; i++) {
      if (this.options.removeLabel || !labelCoords || i < labelCoords.xi || i > labelCoords.xl - 1) {
        this.screen.lines[coords.yi][i] = [attr, getBoxStyleChar(this.options.borderStyle, BorderSide.top)]
      }
      this.screen.lines[coords.yl - 1][i] = [attr, getBoxStyleChar(this.options.borderStyle, BorderSide.bottom)]
    }
  }
}

function getBorderBoxOptions(options?: BorderBoxOptions) {
  return {
    ...(options || {}),
    border: 'line',
    ...{
      style: {
        ...(options.style || {}),
        border: typeof (options.style && options.style.border === 'string')
          ? { type: (options.style && options.style.border) || 'line' }
          : (options.style && options.style.border) || { type: 'line' }
      }
    }
  }
}
export function borderBox(options?: BorderBoxOptions) {
  return new BorderBox(options)
}

// install it so is available as JSX element
React.addIntrinsicElementConstructors({
  borderBox<BorderBoxOptions>(options?: BorderBoxOptions) {
    return new BorderBox(options as any)
  }
})

export interface BorderLayoutOptions extends Widgets.LayoutOptions, BorderBoxOptionsConcrete { }

export class BorderLayout extends widget.Layout {
  type = 'borderlayout'

  constructor(options: BorderLayoutOptions = BorderBox.defaultOptions as any) {
    super({ ...(BorderBox.defaultOptions as any), ...getBorderBoxOptions(options) })
    this.options.style = options.style || {}
    this.options.style.border = isObject(this.options.style.border) ? this.options.style.border : { type: 'line' }
  }

  render() {
    var coords = super.render()
    if (!coords) {
      return
    }
    BorderBox.prototype.renderBorderBox.apply(this, [coords])
    return coords
  }
}

React.addIntrinsicElementConstructors({
  //@ts-ignore
  borderLayout(options?: BorderBoxOptions) {
    return new BorderBox(options)
  }
})

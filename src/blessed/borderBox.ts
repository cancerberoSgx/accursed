import { React, widget, Widgets, installExitKeys, createScreen, debug, labelBlink, box } from '..'
import { BorderSide, BorderStyle, getBoxStyleChar } from './boxes';

export interface BorderBoxOptions  extends Widgets.BoxOptions {
  borderStyle: BorderStyle
  removeLabel?: boolean
}

export class Border extends widget.Box {
  type = 'borderbox'

  protected static defaultOptions: BorderBoxOptions = {
    borderStyle: BorderStyle.single,
    removeLabel: false
  }
  options : BorderBoxOptions
  constructor(options: BorderBoxOptions = Border.defaultOptions as any) {
    super({ ...(Border.defaultOptions as any), ...(options || {}) , 
    border: 'line'
  })
  }

  render() {
    var coords = super.render()
    if (!coords) {
      return
    }
    const attr = this.sattr(this.style)
    const labelCoords = this._label._getCoords()

    this.screen.lines[coords.yi][coords.xi] = [attr, getBoxStyleChar(this.options.borderStyle, BorderSide.topLeft)]
    this.screen.lines[coords.yi][coords.xl-1] = [attr, getBoxStyleChar(this.options.borderStyle, BorderSide.topRight)]

    this.screen.lines[coords.yl-1 ][coords.xi] = [attr, getBoxStyleChar(this.options.borderStyle, BorderSide.bottomLeft)]
    this.screen.lines[coords.yl-1][coords.xl-1] = [attr, getBoxStyleChar(this.options.borderStyle, BorderSide.bottomRight)]

    for(let j=coords.yi + 1; j<coords.yl-1; j++){
      this.screen.lines[j][coords.xi] = [attr, getBoxStyleChar(this.options.borderStyle, BorderSide.left)]
      this.screen.lines[j][coords.xl-1] = [attr, getBoxStyleChar(this.options.borderStyle, BorderSide.right)]
    }
    for(let i=coords.xi + 1; i<coords.xl-1; i++){
      if(this.options.removeLabel ||  i<labelCoords.xi ||i>labelCoords.xl-1) {
        this.screen.lines[coords.yi][i] = [attr, getBoxStyleChar(this.options.borderStyle, BorderSide.top)]
      }
      this.screen.lines[coords.yl-1][i] = [attr, getBoxStyleChar(this.options.borderStyle, BorderSide.bottom)]
    }
    return coords
  }

}

// install it so is available as JSX element
React.addIntrinsicElementConstructors({
  border: function(options?: BorderBoxOptions) {
    return new Border(options)
  }
})


// var screen = createScreen({
//   log: 'log.txt',
//   smartCSR: true
// })

// try {
//   var border = new Border({
//     parent: screen,
//     borderStyle: BorderStyle.double,
//         top: 2,
//         left: 3,
//         // width: 15,
//         // height: 6,
//         label: 'hello',
//         content: 'jasjjss',
//   })
//   var b = box({
//     parent: border,
//         // top: 2,
//         // left: 3,
//         // width: 10,
//         // height: 4,
//         content: 'hele'
//     // border: 'line',
//     // ...opts()
//   })
//   installExitKeys(screen)
//   screen.append(border)
//   screen.render()
// } catch (error) {
//   debug(error)
// }
// // draw()
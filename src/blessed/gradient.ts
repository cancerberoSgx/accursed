import * as blessed from 'blessed'
import { debug } from '..'
import { ElementOptions } from '../blessedTypes'
import { EventOptions, React } from '../jsx'
import { rgb2Hex } from '../util/misc'

const gradstop = require('gradstop')

type GradientColors = [string, string] | [string, string, string] | [string, string, string, string]

interface GradientTextOptions extends ElementOptions {
  fgGradientColors?: GradientColors
  bgGradientColors?: GradientColors
}
/**
 * Example: 
 ```
const g = new GradientText({
  width: 40,
  height: 10,
  wrap: true,
  content: s
  bgGradientColors: ['#000088', '#0006dd', '#338800'],
  fgGradientColors: ['#ff0000', '#00ff00', '#0000ff']
})
 ```
 * TODO: vertical, diagonal ?
 */
export class GradientText<Options extends GradientTextOptions> extends blessed.widget.Element<Options> {
  type = 'gradienttext'
  constructor(options: Options) {
    super(options)
  }
  render() {
    var coords = super.render()
    if (!coords) {
      return
    }
    const fgColors = this.options.fgGradientColors && this.getFgGradientColors(coords)
    const bgColors = this.options.bgGradientColors && this.getBgGradientColors(coords)
    debug(coords)
    for (let j = coords.yi; j < coords.yl; j++) {
      for (let i = coords.xi; i < coords.xl; i++) {
        const attr = this.sattr({
          ...this.style,
          bg: bgColors ? bgColors[i - coords.xi] : undefined,
          fg: fgColors ? fgColors[i - coords.xi] : undefined
        })
        this.screen.lines[j][i] = [attr, this.screen.lines[j][i][1]]
      }
    }
    return coords
  }
  protected fgGradientColors: string[]
  protected getFgGradientColors(coords: blessed.Widgets.Coords) {
    if (!this.fgGradientColors && this.options.fgGradientColors) {
      this.fgGradientColors = gradstop({
        stops: coords.xl - coords.xi,
        inputFormat: this.getColorInputFormat(this.options.fgGradientColors),
        colorArray: this.options.fgGradientColors
      }).map(rgb2Hex) as string[]
    }
    return this.fgGradientColors
  }
  protected bgGradientColors: string[]
  protected getBgGradientColors(coords: blessed.Widgets.Coords) {
    debug(this._getWidth(), this._getWidth(true), coords)
    if (!this.bgGradientColors && this.options.bgGradientColors) {
      this.bgGradientColors = gradstop({
        stops: coords.xl - coords.xi,
        inputFormat: this.getColorInputFormat(this.options.bgGradientColors),
        colorArray: this.options.bgGradientColors
      }).map(rgb2Hex) as string[]
    }
    return this.bgGradientColors
  }
  protected getColorInputFormat(s: string[]) {
    return s[0].startsWith('#') ? 'hex' : s[0].startsWith('rgb') ? 'rgb' : 'hsl'
  }
}

interface GradientTextAnimationOptions extends GradientTextOptions {
  interval?: number
  mode?: 'shift-right' | 'shift-left' | 'transform-to-other-gradient'
}
export class GradientTextAnimation extends GradientText<GradientTextAnimationOptions> {
  type = 'text-gradient'
  gradientAnimationTimer: NodeJS.Timeout | undefined
  constructor(options: GradientTextAnimationOptions) {
    super(options)
    this.startAnimation = this.startAnimation.bind(this)
    this.stopAnimation = this.stopAnimation.bind(this)
    this.on('render', this.startAnimation)
    this.on('show', this.startAnimation)
    this.on('hide', this.stopAnimation)
    this.on('destroy', this.stopAnimation)
    this.on('detach', this.stopAnimation)
  }
  protected stopAnimation() {
    clearInterval(this.gradientAnimationTimer)
    this.gradientAnimationTimer = undefined
  }
  protected startAnimation() {
    if (!this.gradientAnimationTimer) {
      const coords = this._getCoords()
      this.getFgGradientColors(coords)
      this.getBgGradientColors(coords)
      this.gradientAnimationTimer = setInterval(() => {
        if (this.fgGradientColors) {
          const first = this.fgGradientColors.shift()
          this.fgGradientColors.push(first)
        }
        if (this.bgGradientColors) {
          const firstBg = this.bgGradientColors.shift()
          this.bgGradientColors.push(firstBg)
        }
        this.screen.render()
      }, this.options.interval || 400)
    }
  }
}

React.addIntrinsicElementConstructors({
  gradientTextAnimation: function(options?: GradientTextAnimationOptions) {
    return new GradientTextAnimation(options)
  },
  gradientText: function(options?: GradientTextOptions) {
    return new GradientText(options)
  }
})

declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      gradientText: OptionsProps<GradientTextOptions> & EventOptions<GradientText<GradientTextOptions>>
      gradientTextAnimation: OptionsProps<GradientTextAnimationOptions> & EventOptions<GradientTextAnimation>
    }
  }
}

// const gradstop = require('gradstop')

// type GradientColors  = [string, string]|[string, string, string]|[string, string, string, string]
// interface Gradient {
//   /**
//    * color formats supported: #xxx, #xxxxxx, rgb(a, b, c), hsl(a, b, c)
//    */
//   colors: GradientColors
//   /**
//    * how many output colors the output array have.
//    */
//   stops: number
// }
// /**
//  * given a gradient definition, it will return the array of colors
//  */
// export function gradient(  g: Gradient){
// const result = gradstop({...g, inputFormat: 'hex'})//g.colors[0].startsWith('#') ? 'hex': g.colors[0].startsWith('rgb') ? 'rgb' : 'hsl'})
// return result.map(rgb2Hex)
// }

// const rgb2Hex = (s: string) =>
//   // prettier-ignore
//   //@ts-ignore
//   s.match(/[0-9]+/g)!.reduce((a, b: any) => a + (b | 256).toString(16).slice(1), '#').toString(16)

// export function gradientElementLine(e: Element, line: number, g: GradientColors, what: 'bg'|'fg' = 'fg'){
//   const s = e.getLine(line)
//   const colors = gradient({colors: g, stops: s.length})
// // blessed.colors.
//   // blessed.colors.match()
// debug('colors', colors)
//   const r=s.split('').map((c, i)=>{
//     // return e.sattr(e.style, colors[i], colors[i])
//     const attr = e.sattr({...e.style, bg:  colors[i] , fg:   colors[i]}, colors[i], colors[i])
//     e.screen.screen.lines[3][i] = [attr, 'c']

//     //{...e.style, bg:  what==='bg'? colors[i] : e.style.bg, fg:  what==='fg'? colors[i] : e.style.fg})
//     // if(c.match(/\s\n/)){
//     //   return c
//     // }
//     // else {
//     // }
//     // return
//   }).join('')
//   // console.log(r)
//   // e.setContent(r)
//   // e.setLine(line, r)
// }

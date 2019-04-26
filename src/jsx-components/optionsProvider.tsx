import { Component, React, debug } from '..'
import { setCollapsed, getElementLabel } from '../blessed'
import { getJSXChildrenProps, VirtualComponent } from '../blessed/virtualElement'
import { BoxOptions, Element, isElement, Style, Border , Position, TopLeft, Padding} from '../blessedTypes'
import { ArtificialEvent } from '../jsx/types'
import { Collapsible, CollapsibleProps } from './collapsible'
import { Div } from './jsxUtil'
import { asArray, getObjectPropertyPaths, getObjectProperty, setObjectProperty } from 'misc-utils-of-mine-generic';
import { Color } from '../../spec/blessed/experiments/drawille/drawille-canvas';

interface SupportedOptions {
  width?: Position
  height?: Position
  top?: TopLeft
  left? : TopLeft
  right?: Position
  bottom?: Position

  // scrollable?: boolean
  // focusable?: boolean
  // keyable?: boolean
  // input?:boolean
  border?: Required<Border>
  // mouse?: boolean
  // keys?: string | string[] | boolean
  // vi?: boolean 
    // baseLimit?: number

  
    alwaysScroll?: boolean
 
    // scrollbar?:
    //   | { style?:  Style; track?:  Style; ch?: string } &  Style
    //   | boolean
      tags?: boolean

      fg?: Color
      bg?: Color
      bold?: boolean
      underline?: boolean
      blink?: boolean
      inverse?: boolean
      invisible?: boolean

    content?: string

    clickable?: boolean

    hidden?: boolean

    // label?: string

    hoverText?: string

    align?: 'left' | 'center' | 'right'

    valign?: 'top' | 'middle' | 'bottom'

    shrink?: boolean

    padding?: Required<Padding>
   
    // ch?: string

    draggable?: boolean

    // shadow?: boolean

    // focused?: boolean


  style?: Style
}

interface OptionsProviderProps extends BoxOptions {
  options: SupportedOptions
  children: JSX.BlessedJsxNode | JSX.BlessedJsxNode[]
}

/**
OptionsProvider widget based on Collapsible. Examples:

```jsx
<OptionsProvider options={{width: 10, style: {}}}>
</OptionsProvider>
```
   */
export class OptionsProvider extends Component<OptionsProviderProps> {
  // _saveJSXChildrenProps = true
  render() {
    // debug(this.props.children)
    this.processChildren(asArray(this.props.children).filter(isElement), this.props.options)
    return (
      <Div {...{...this.props, options: undefined}}>
        {this.props.children}
      </Div>
    )
  }
  private processChildren(children: Element[], options: SupportedOptions){
    children.forEach(c=>{
      c.style=c.style || {}
      options.style = options.style||{}
      // debug(c.type);
      const paths = getObjectPropertyPaths(options, {leafsOnly: true})
      
      // console.log(paths);
      paths.forEach(path=>{
        if(!getObjectProperty(c.options, path)){
const v = getObjectProperty(options, path)
// const setter = setters.find(s=>s.path.join('.')===path.join('.'))
if(setters[path.join('.')]){
  setters[path.join('.')](c, v)
}
else {
  setObjectProperty(c, path, v)
}
        }
      })
      // deepExtend(c.style, options.style)
      // if(typeof options.label!=='undefined' && !getElementLabel(c)){
      //   c.setLabel(options.label)
      // }
      this.processChildren(c.children.filter(isElement)||[], options)
    })
  }
}

const setters: {[path: string]: (e:Element, v: any)=>void} = {
  'label':  (e, v)=>{
    // if(!e.border){
    //   e.border={ type: 'line'}
    // }
    // e.setLabel(typeof v==='string' ? {side: 'left', text: v} : v)
  },
  // 'draggable': (e, v)=>{
  // }

}
const deepExtend = require('deep-extend')


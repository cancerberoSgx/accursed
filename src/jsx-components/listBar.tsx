import { React } from '..'
import { getJSXChildrenProps, VirtualComponent, VirtualChildrenData } from '../blessed/virtualElement'
import { Component } from '../jsx/component'
import { ListbarOptions, ButtonOptions, Button, ListOptions, ElementOptions } from '../blessedTypes';
import { OnClickHandler } from '../jsx/types';
import { callbackify } from 'util';
import { focusableOpts } from '../../spec/blessed/evaluator/app';

interface ListBarProps extends ElementOptions {
  children: ListBarCommand|ListBarCommand[]
}
interface ListBarCommandProps extends ButtonOptions {
  children: string|string[]
  callback: ()=>void
  active?: boolean
  keys?: string[]
}
interface Command  {keys?: string[], callback():void}

// export class ListBar extends VirtualComponent<ListBarProps> {}
export class ListBarCommand extends VirtualComponent<ListBarCommandProps> {}

/** 
   * Example:
```jsx
<ListBar>
  TODO
</ListBar>

```
   */
export class ListBar extends Component<ListBarProps> {
  _saveJSXChildrenProps = true
  render() {
    const childProps = getJSXChildrenProps(this)!

    const Commands = childProps.filter(e => e.tagName === 'ListBarCommand')! as VirtualChildrenData[]

    /*
  we will be using this syntax for commands: 
  
commands: {
  one: {
    keys: ['a'],
    callback: function() {
      box.setContent('Pressed one.')
      screen.render()
    }
  },
  two: function() {
    box.setContent('Pressed two.')
    screen.render()
  },

     */
    const commands: {[commandName:string]:Command} = {}
    Commands.forEach(b=>{
      commands[b.children.join(' ')] = {keys: b.attrs.keys||undefined, callback: b.attrs.callback.bind(this)}
    })

    //TODO: command button styles

    return (
      // keyable: true, clickable: true, keys: true, focusable: true,

      <listbar {...{...focusableOpts(),  keyable: true, clickable: true, keys: true, focusable: true, ...this.props, children: undefined}} commands={commands}/>
        // style={{
        //   ...this.props.style,
        //   header: { ...(this.props.style && this.props.style.header), ...headStyle },
        //   cell: { ...(this.props.style && this.props.style.cell), ...bodyStyle }
        // }}
        // {...{ ...(this.props || {}), children: undefined }}
        // data={[ths, ...tds]}
      
    )
  }
}
// }

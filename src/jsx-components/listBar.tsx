import { React } from '..'
import { focusableOpts } from '../../spec/blessed/evaluator/app'
import { getJSXChildrenProps, VirtualChildrenData, VirtualComponent } from '../blessed/virtualElement'
import { ButtonOptions, ElementOptions, ListBar } from '../blessedTypes'
import { Component } from '../jsx/component'

interface ListBarProps extends ElementOptions {
  children: ListBarCommand | ListBarCommand[]
}
interface ListBarCommandProps extends ButtonOptions {
  children: string | string[]
  callback: () => void
  active?: boolean
  keys?: string[]
}
interface Command  {
  text?: string
  prefix?: string
  // commandId?: string
  keys?: string[]
  callback(): void
}

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
export class ListBar2 extends Component<ListBarProps> {
  _saveJSXChildrenProps = true
  render() {
    const childProps = getJSXChildrenProps(this)!

    const Commands = childProps.filter(e => e.tagName === 'ListBarCommand')! as VirtualChildrenData[]

    const commands: { [commandName: string]: Command } = {}
    Commands.forEach(b => {
      commands[b.children.join(' ')] = { keys: b.attrs.keys || undefined, callback: b.attrs.callback.bind(this), text: b.attrs.text||undefined, prefix: b.attrs.prefix||undefined, 
        // commandId: b.attrs.commandId||undefined 
      }
    })

    //TODO: command button styles
    // const commandIds

    return (
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

      <listbar
        {...{
          ...focusableOpts(),
          keyable: true,
          clickable: true,
          keys: true,
          focusable: true,
          mouse: true,
          ...this.props,
          children: undefined
        }}
        commands={commands}
      />
    )
    this.element.get
  }

  get commands(){
    return this.element.commands
  }
  get selected(){
    return this.element.selected
  }
  get element(): ListBar {
    return this.blessedElement as ListBar
  }
}

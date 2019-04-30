import { React } from '..'
import { getJSXChildrenProps, VirtualChildrenData, VirtualComponent } from '../blessed/virtualElement'
import { ButtonOptions, Element, ElementOptions, ListBar } from '../blessedTypes'
import { Component } from '../jsx/component'
import { focusableOpts } from '../util/sharedOptions'

interface ListBarProps extends ElementOptions {
  children: ListBarCommand | ListBarCommand[]
  /**
   * Notifies when the user moves thought the list as when pressing arrow functions. Notice that the user did not actionate the command, is just exploring the options.
   */
  onSelectItem?(index: number, item: Element): void
  /**
   * Notifies when the user presses ENTER or clicks a command.
   */
  onCommand?(index: number, item: Element): void
}
interface ListBarCommandProps extends ButtonOptions {
  children: string | string[]
  callback: () => void
  active?: boolean
  keys?: string[]
}
interface Command {
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
<ListBar2 left="center">
<ListBarCommand
  callback={() => {
    showInModal(screen, 'play')
  }}>
  play
</ListBarCommand>
<ListBarCommand
  callback={() => {
    showInModal(screen, 'stop')
  }}>
  stop
</ListBarCommand>
...
</ListBar2>

```
   */
export class ListBar2 extends Component<ListBarProps> {
  _saveJSXChildrenProps = true
  dontEmitAction: any
  render() {
    const childProps = getJSXChildrenProps(this)!

    const Commands = childProps.filter(e => e.tagName === 'ListBarCommand')! as VirtualChildrenData[]

    const commands: { [commandName: string]: Command } = {}
    Commands.forEach(b => {
      commands[b.children.join(' ')] = {
        keys: b.attrs.keys || undefined,
        callback: b.attrs.callback.bind(this),
        text: b.attrs.text || undefined,
        prefix: b.attrs.prefix || undefined
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
  },....
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

  handleAction(index: number, item: Element) {
    if (!this.dontEmitAction && this.props.onCommand) {
      this.props.onCommand(index, item)
    }
  }

  // on={['select', (index, item)=>this.handleAction(index, item)]}
  // on={['select', (index, item)=>this.handleAction(index, item)]}
  handleSelectItem(index: number, item: Element) {
    if (!this.dontEmitAction && this.props.onCommand) {
      this.props.onCommand(index, item)
    }
  }
  /**
   * Will focus one of the list items. This won't call the callback, is the same action as moving though the list using the arrow keys.
   */
  select(index: number, options: { dontEmit?: boolean } = { dontEmit: false }) {
    this.element.select(index)
  }

  /**
   * This is equivalent to the user executing a command by pressing enter,  clicking it or pressing one of the commands [[keys]].
   */
  execute(index: number, options: { dontEmit?: boolean } = { dontEmit: false }) {
    this.element.selectTab(index)
  }

  get element(): ListBar {
    return this.blessedElement as ListBar
  }
  // get commands(){
  //   return this.element.commands
  // }
  get selected() {
    return this.element.selected
  }
}

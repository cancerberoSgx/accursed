import { React } from '..'
import { getJSXChildrenProps, VirtualChildrenData, VirtualComponent } from '../blessed/virtualElement'
import { ButtonOptions, Element, ElementOptions, ListBar } from '../blessedTypes'
import { Component } from '../jsx/component'
import { ref, resolveRef } from '../jsx/createElement'
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
interface ListBarCommandProps extends ButtonOptions, Command {
  children: string | string[]
  // callback: () => void
  active?: boolean
  keys?: string[]
}

interface Command {
  text?: string
  prefix?: string
  keys?: string[]
  callback(): void
}

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

  constructor(p, s) {
    super(p, s)
    this.handleAction = this.handleAction.bind(this)
    this.handleSelectItem = this.handleSelectItem.bind(this)
  }

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
    return (
      <listbar
        ref={ref<ListBar>(c => {
          this.installHandlers(c)
          resolveRef(this.props, c)
        })}
        {...{
          ...focusableOpts(),
          keyable: true,
          clickable: true,
          keys: true,
          focusable: true,
          mouse: true,
          width: '100%',
          ...this.props,
          ref: undefined,
          children: undefined
        }}
        commands={commands}
      />
    )
  }
  protected installHandlers(c: ListBar) {
    c.on('select', this.handleAction)
    c.on('selcet item', this.handleSelectItem)
  }

  protected handleAction(index: number, item: Element) {
    if (!this.dontEmitAction && this.props.onCommand) {
      this.props.onCommand(index, item)
    }
  }

  protected handleSelectItem(index: number, item: Element) {
    if (!this.dontEmitAction && this.props.onCommand) {
      this.props.onCommand(index, item)
    }
  }

  /**
   * Will focus one of the list items. This won't call the callback, is the same action as moving though the list using the arrow keys.
   */
  select(indexOrText: number | string, options: { dontEmit?: boolean } = { dontEmit: false }) {
    if (typeof indexOrText === 'string') {
      indexOrText = this.listBar.ritems.findIndex(i => i === indexOrText)
    }
    // if(indexOrText>0&&indexOrText<this.listBar.items.length){
    this.listBar.select(indexOrText)
    // }
  }

  /**
   * This is equivalent to the user executing a command by pressing enter,  clicking it or pressing one of the commands [[keys]].
   */
  execute(index: number, options: { dontEmit?: boolean } = { dontEmit: false }) {
    this.listBar.selectTab(index)
  }

  addCommand(c: Command, options = { dontRenderScreen: false }) {
    this.listBar.appendItem(c)
    if (!options.dontRenderScreen) {
      this.screen.render()
    }
  }

  get listBar(): ListBar {
    return this.blessedElement as ListBar
  }

  get selectedIndex() {
    return this.listBar.selected
  }

  get selectedText() {
    return this.listBar.ritems[this.listBar.selected]
  }
}

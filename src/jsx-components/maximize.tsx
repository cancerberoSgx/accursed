import { Component, React } from '..'
import { isMaximized, setMaximized } from '../blessed'
import { BoxOptions, Button, Element } from '../blessedTypes'
import { focusableOpts } from '../util/sharedOptions'

interface MaximizeProps extends BoxOptions {
  /**
   * Label for the maximize button. Default: '\u2921 maximize'.
   */
  maximizeLabel?: string
  /**
   * Label for the restore button. Default: '\u2935 restore'.
   */
  restoreLabel?: string
  /**
   * The title or label for information when maximized.
   */
  title?: string
  children?: JSX.Element
  // /**
  //  * If given, this element will be used as a target instead of its children
  //  */
  // target?: () => Element
  /**
   * Notifies listeners when a maximize or restore event occurs
   */
  onMaximize?(type: 'maximize' | 'restore', target: Element)
}

/**
Will add maximize/restore controllers to its child automatically. In the following example, we wrap the
`box`with `Maximize` and it will automatically add "Maximize" button at the top-right corner and when
maximized it will also be "Restore" button. It relies on setMaximized() utility for this. Example: 

```
<Maximize>
  <box
    width="100%"
    height="100%"
    focusable={true}
    ref={React.createRef<Box>(c => (this.editorContainer = c))}
  />
</Maximize>
```
 */
export class Maximize extends Component<MaximizeProps, {}> {
  private static defaultProps: MaximizeProps = {
    restoreLabel: '\u2935 restore',
    maximizeLabel: '\u2921 maximize',
    title: 'Panel'
  }
  render() {
    this.props = { ...Maximize.defaultProps, ...this.props }
    const title = this.props.maximizeLabel
    return (
      <box>
        {this.props.children}
        <button
          {...focusableOpts()}
          top={0}
          height={3}
          width={title.length + 2}
          label={undefined}
          right={0}
          content={title}
          onPress={e => {
            this.toggleMaximized(
              // this.props.target ? this.props.target() : this.props.children[0].parent,
              this.props.children[0].parent,
              e.currentTarget,
              this.props.title || ''
            )
          }}
        />
      </box>
    )
  }

  toggleMaximized(container: Element, btn: Button, label?: string) {
    setMaximized(container, !isMaximized(container), { auto: false })
    const content =
      (isMaximized(container) ? this.props.restoreLabel : this.props.maximizeLabel) + (label ? ' ' + label : '')
    btn.content = content
    btn.width = content.length + 2
    btn.setHover(isMaximized(container) ? this.props.restoreLabel : this.props.maximizeLabel)
    this.props.onMaximize && this.props.onMaximize(isMaximized(container) ? 'maximize' : 'restore', container)
    container.screen.render()
  }
}

import { Component, React } from '..'
import { isMaximized, setMaximized } from '../blessed'
import { BoxOptions, Button, Element, TextareaOptions } from '../blessedTypes'

interface MaximizeProps extends BoxOptions {
  title?: string
  children: JSX.Element
  target?: () => Element
}

export class Maximize extends Component<MaximizeProps, {}> {
  render() {
    const title = '\u2921 maximize'
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
              this.props.target ? this.props.target() : this.props.children[0].parent,
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
    const content = (isMaximized(container) ? '\u2935 restore' : '\u2921 maximize') + (label ? ' ' + label : '')
    btn.content = content
    btn.width = content.length + 2
    btn.setHover(isMaximized(container) ? '\u2935 restore' : '\u2921 maximize')
    container.screen.render()
  }
}

/** @internal */
export const focusableOpts: () => TextareaOptions = () => ({
  mouse: true,
  keys: true,
  focusable: true,
  clickable: true,
  input: true,
  keyable: true,
  border: 'line',
  style: {
    bg: 'lightgray',
    fg: 'black',
    border: {
      type: 'line',
      fg: 'cyan'
    },
    focus: {
      fg: 'black',
      bg: '#507468',
      border: {
        fg: 'red'
      }
    },
    item: {
      bg: 'lightgray',
      fg: 'black'
    },
    selected: {
      bg: 'magenta',
      fg: 'black',
      // bold: true,
      underline: true
    }
  }
})

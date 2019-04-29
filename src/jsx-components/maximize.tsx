import { Component, React } from '..';
import { BoxOptions, Button, Element } from '../blessedTypes';
import { setMaximized, isMaximized } from '../blessed';

interface P extends BoxOptions{
  children: JSX.BlessedJsxNode
  target: Element
}

export class Maximize extends Component<P, {}> {
  render(){
    return <box>
      {this.props.children}
      <button top={0}
          height={3}
          width={'Maximize Logs and Errors'.length + 2}
          label={undefined}
          right={0}
          content="Maximize Logs and Errors"
          onPress={e => {
          this.toggleMaximized(this.props.target as any, e.currentTarget, 'editor')
          }}
          />
                  
    </box>
  }

  toggleMaximized(container: Element, btn: Button, label?: string) {
    setMaximized(container, !isMaximized(container), { auto: false })
    btn.content = (isMaximized(container) ? 'Restore' : 'Maximize') + (label ? ' ' + label : '')
    container.screen.render()
  }
}
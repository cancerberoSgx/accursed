import { installCollapsible, setCollapsed } from '../blessed'
import { BoxOptions } from '../blessedTypes'
import { Component } from '../jsx/component'
import { React } from '../jsx/createElement'
import { Br, Div } from './jsxUtil'

interface CollapsibleProps extends BoxOptions {
  collapsed?: boolean
  children: JSX.BlessedJsxNode | JSX.BlessedJsxNode[]
}
/** 
A box that adds a control so user can collapse/expand it. 

Example: 
```
<Collapsible>

</Collapsible>
``` 
  */
export class Collapsible extends Component<CollapsibleProps, {}> {
  render() {
    return (
      <Div
        {...{ ...this.props, children: null }}
        border="line"
        onceRender={e => {
          installCollapsible(e.currentTarget, { auto: true })
          if (this.props.collapsed) {
            setTimeout(() => {
              setCollapsed(e.currentTarget, true)
            }, 20)
          }
        }}
        label={this.props.label || ' '}>
        <Br />

        {this.props.children}
      </Div>
    )
  }
}

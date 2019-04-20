import { installCollapsible } from '../blessed'
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

``` 
  */
export class Collapsible extends Component<CollapsibleProps, {}> {
  render() {
    // this.test()
    return (
      <Div
        {...{ ...this.props, children: null }}
        border="line"
        onRender={e => installCollapsible(e.currentTarget, { auto: true })}
        label={this.props.label || ' '}
        // padding={1}
      >
        <Br />

        {this.props.children}
      </Div>
    )
  }
  // async test(){
  //   log('jellos')
  //   const options =  {interval: 500, timeout: 99999}
  //   await waitFor(()=>this.blessedElement, options)
  //   log('jellos')
  //   installCollapsible(this.blessedElement, {auto: true})
  //   // this.blessedElement.screen.render()
  //   // await waitForRender(this.blessedElement,options)
  // }
}

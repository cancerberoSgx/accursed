import { BoxOptions } from '../blessedTypes'
import { Component } from '../jsx/component'
import { React } from '../jsx/createElement'
import { Div } from './jsxUtil'

interface ShowIfProps extends BoxOptions {
  onUpdate(listener: (show: boolean) => void): void
  children: JSX.BlessedJsxNode | JSX.BlessedJsxNode[]
}
/** Shows or hides children according to events emitted by user. 
   * 
   * This component will subscribe for updates with `this.props.onUpdate(show=>{`. 
   * 
   * Example: 
```
var update
<ShowIf onUpdate={listener => {update = listener}}>Some content</ShowIf>

update(true)

update(false)

``` 
  */
export class ShowIf extends Component<ShowIfProps, {}> {
  render() {
    this.props.onUpdate(show => {
      if (show) {
        this.blessedElement.show()
      } else {
        this.blessedElement.hide()
      }
      this.blessedElement.screen.render()
    })
    return <Div>{this.props.children}</Div>
  }
}

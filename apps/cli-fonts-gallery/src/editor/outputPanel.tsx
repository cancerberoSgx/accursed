import { Div, ListBar2, ListBarCommand, Maximize, React, ref, Box } from 'accursed'
import { ok } from 'assert'
import { Component } from '../component';
import { Store } from "../storeImpl";
import { ACTIONS, FontsShowAction } from "../fontsAction";
import { appLogger } from '../toolPanel/debugTool';

export class Output extends Component {
  output: Box;
  protected listBar: ListBar2
  
  constructor(p, s) {
    super(p, s)
    this.onShowFont = this.onShowFont.bind(this)
    this.props.store.addActionListener(ACTIONS.FONTS_SHOW, this.onShowFont)
  }
  onShowFont(a: FontsShowAction, store: Store)  {
    this.output.content = a.output
    this.screen.render()
  }
  render() {
    return (
      <Maximize>
        <box wrap={false} noOverflow={false} style={{ overflow: undefined }}ref={ref(c => this.output = c)} >

        </box>
       </Maximize>
    )
  }

}

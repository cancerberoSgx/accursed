import { Div, ListBar2, ListBarCommand, Maximize, React, ref, Box } from 'accursed'
import { ok } from 'assert'
import { Component } from '../component';
import { Store } from '../store';
import { ACTIONS, FontsShowAction } from "../fontsAction";
import { appLogger } from '../toolPanel/debugTool';

export class Output extends Component {
  output: Box;
  onShowFont(a: FontsShowAction, store: Store)  {
    appLogger('Output', a)
    this.output.content = a.output
    this.screen.render()
  }
  protected listBar: ListBar2
  
  constructor(p, s) {
    super(p, s)
    this.onShowFont = this.onShowFont.bind(this)
    this.props.store.addActionListener(ACTIONS.FONTS_SHOW, this.onShowFont)
  }
  render() {
    return (
      <Maximize>
        <Div style={{ overflow: undefined }}ref={ref(c => this.output = c)} >

        </Div>
       </Maximize>
    )
  }

}

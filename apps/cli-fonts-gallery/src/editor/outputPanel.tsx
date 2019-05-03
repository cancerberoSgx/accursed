import { Box, ListBar2, Maximize, React, ref } from 'accursed'
import { Component } from '../component'
import { ACTIONS, FontsShowAction } from '../store/fontsAction'
import { Store } from '../store/storeImpl'

export class Output extends Component {
  output: Box
  protected listBar: ListBar2

  constructor(p, s) {
    super(p, s)
    this.onShowFont = this.onShowFont.bind(this)
    this.props.store.addActionListener(ACTIONS.FONTS_SHOW, this.onShowFont)
  }
  onShowFont(a: FontsShowAction, store: Store) {
    this.output.content = a.output
    this.screen.render()
  }
  render() {
    return (
      <Maximize>
        <box wrap={false} noOverflow={false} style={{ overflow: undefined }} ref={ref(c => (this.output = c))} />
      </Maximize>
    )
  }
}

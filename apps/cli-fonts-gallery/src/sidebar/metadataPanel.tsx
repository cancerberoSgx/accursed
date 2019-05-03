import { AutoComplete, Box, Br, Div, React, ref, Row, Rows, TabPanel, Textarea } from 'accursed'
import { enumKeys } from 'misc-utils-of-mine-typescript'
import { Component } from '../component'
import { FIGLET_FONTS } from '../figletFonts'
import { ACTIONS, FontsMetadataShowAction } from '../store/fontsAction'
import { Store } from '../store/storeImpl'
import { scrollableOpts } from '../util/style'

export class Metadata extends Component {
  tabPanel: TabPanel
  textarea: Textarea
  autocomplete: AutoComplete
  headerMessage: Box
  other2: Box
  other3: Box
  constructor(p, s) {
    super(p, s)
    this.showMetadata = this.showMetadata.bind(this)
    this.props.store.addActionListener(ACTIONS.FONT_METADATA_SHOW, this.showMetadata)
  }
  render() {
    const fonts = enumKeys(FIGLET_FONTS)
    return (
      <Div {...scrollableOpts()}>
        <Rows>
          <Row height="30%">
            Header Message:
            <Br />
            <Div ref={ref<Box>(c => (this.headerMessage = c))} />
          </Row>

          <Row height="30%">
            Options (TODO: show in tablelist):
            <Div ref={ref<Box>(c => (this.other2 = c))} />
          </Row>
          <Row height="30%">
            <Div ref={ref<Box>(c => (this.other2 = c))} />
          </Row>
          {}
        </Rows>
      </Div>
    )
  }
  showMetadata(a: FontsMetadataShowAction, s: Store) {
    this.headerMessage.setContent(a.headerComment)
    this.other2.setContent(JSON.stringify(a.options))
    this.screen.render()
  }
}

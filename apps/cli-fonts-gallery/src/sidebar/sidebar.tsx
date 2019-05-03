import { AutoComplete, React, ref, Tab, TabBody, TabLabel, TabPanel, Textarea } from 'accursed'
import { enumKeys } from 'misc-utils-of-mine-typescript'
import { Component } from '../component'
import { FIGLET_FONTS } from '../figletFonts'
import { tabLabelOpts, tabPanelOpts } from '../util/style'
import { FontEditor } from './fontEditor'
import { Metadata } from './metadataPanel'

export class Sidebar extends Component {
  tabPanel: TabPanel
  textarea: Textarea
  autocomplete: AutoComplete

  render() {
    return (
      <TabPanel {...tabPanelOpts()} ref={ref<TabPanel>(c => (this.tabPanel = c))}>
        <Tab active={true}>
          <TabLabel {...tabLabelOpts()}>Editor</TabLabel>
          <TabBody>
            <FontEditor {...this.props} />
          </TabBody>
          {}
        </Tab>
        <Tab>
          <TabLabel {...tabLabelOpts()}>Metadata</TabLabel>
          <TabBody>
            <Metadata {...this.props} />
          </TabBody>
          {}
        </Tab>
        {}
      </TabPanel>
    )
  }
}

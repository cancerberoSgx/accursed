import { Br, Div, React, ref, Tab, TabBody, TabLabel, TabPanel } from 'accursed'
import { Component } from '../util/component'
import { labels } from '../util/labels'
import { focusableOpts, tabLabelOpts, tabPanelOpts } from '../util/style'
import { PREFIX } from '../util/util'
import { FileExplorer } from './fileExplorer'
import { SearchFiles } from './searchFiles'
import { SIDEBAR_ACTION } from './sidebarActions'

export class Sidebar extends Component {
  tabPanel: TabPanel
  searchFiles: SearchFiles

  constructor(p, s) {
    super(p, s)
    this.onActionDispatched(SIDEBAR_ACTION.SEARCH_FILES_OPEN, (a, s) => {
      this.tabPanel.selectTab(1)
      this.searchFiles.focusSearchInput()
    })
  }

  render() {
    return (
      <Div>
        {/* <Maximize button={{...focusableOpts()}}> */}
        <TabPanel {...tabPanelOpts()} ref={ref<TabPanel>(c => (this.tabPanel = c))}>
          <Tab active={true} _data={{ [PREFIX('sidebarTool')]: 'explorer' }}>
            <TabLabel {...tabLabelOpts()}>{labels.sidebarExplorerTab}</TabLabel>
            <TabBody>
              <FileExplorer {...this.props} />
            </TabBody>
            {}
          </Tab>
          <Tab _data={{ [PREFIX('sidebarTool')]: 'search' }}>
            <TabLabel {...tabLabelOpts()}>{labels.sidebarSearchTab}</TabLabel>
            <TabBody>
              <SearchFiles {...this.props} ref={ref<SearchFiles>(c => (this.searchFiles = c))} />
            </TabBody>
            {}
          </Tab>
          <Tab _data={{ [PREFIX('sidebarTool')]: 'sourceControl' }}>
            <TabLabel {...tabLabelOpts()}>Source Control</TabLabel>
            <TabBody>
              <textbox {...focusableOpts()} value="Message" />
              <Br />
              Changes:
              <Br />
              <list {...focusableOpts()} items={['files.txt', 'changed.md']} height="100%" />
              <Br />
            </TabBody>
            {}
          </Tab>
          {}
        </TabPanel>
        {/* </Maximize> */}
      </Div>
    )
  }
}

import { Br, Div, React, Tab, TabBody, TabLabel, TabPanel } from 'accursed'
import { Component } from '../util/component'
import { labels } from '../util/labels'
import { focusableOpts } from '../util/style'
import { PREFIX } from '../util/util'
import { FileExplorer } from './fileExplorer'

export class Sidebar extends Component {
  render() {
    return (
      <Div>
        <TabPanel>
          <Tab active={true} _data={{ [PREFIX('sidebarTool')]: 'explorer' }}>
            <TabLabel {...focusableOpts()}>{labels.sidebarExplorerTab}</TabLabel>
            <TabBody>
              <FileExplorer {...this.props} />
            </TabBody>
            {}
          </Tab>
          <Tab _data={{ [PREFIX('sidebarTool')]: 'search' }}>
            <TabLabel {...focusableOpts()}>Search</TabLabel>
            <TabBody>
              <textbox {...focusableOpts()} value="search" />
              <Br />
              <checkbox {...focusableOpts()} checked={this.s.search.caseSensitive} content="Case sensitive" />
              <Br />
              Files to include: <Br />
              <textbox {...focusableOpts()} value="" />
              <Br />
            </TabBody>
            {}
          </Tab>
          <Tab _data={{ [PREFIX('sidebarTool')]: 'sourceControl' }}>
            <TabLabel {...focusableOpts()}>Source Control</TabLabel>
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
      </Div>
    )
  }
}

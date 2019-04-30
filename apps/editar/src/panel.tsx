import { Br, Div, React, Tab, TabBody, TabLabel, TabPanel } from 'accursed'
import { Component } from './component'
import { focusableOpts } from './style'
import { PREFIX } from './util'

// interface SidebarProps extends Props{
// }
/** this is the bottom panel that contains tools such as the terminal, problems, etc */
export class Sidebar extends Component {
  render() {
    return (
      <Div>
        <TabPanel>
          <Tab _data={{ [PREFIX('panel')]: 'terminal' }}>
            <TabLabel {...focusableOpts()}>Terminal</TabLabel>
            <TabBody>TERMINAL</TabBody>
            {}
          </Tab>
          <Tab _data={{ [PREFIX('panelTool')]: 'debug' }}>
            <TabLabel {...focusableOpts()}>Debug</TabLabel>
            <TabBody>
              <log {...focusableOpts()} />
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
              <list {...focusableOpts()} items={['files.txt', 'changed.md']} />
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

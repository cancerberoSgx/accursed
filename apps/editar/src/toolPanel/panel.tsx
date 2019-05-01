import { Div, React, Tab, TabBody, TabLabel, TabPanel } from 'accursed'
import { Component } from '../component'
import { focusableOpts } from '../style'
import { PREFIX } from '../util'
import { LogPanel } from './debugTool'

/** this is the bottom panel that contains tools such as the terminal, problems, etc */
export class Panel extends Component {
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
              <LogPanel {...this.props} />
              {/* <log {...focusableOpts()} /> */}
            </TabBody>
            {}
          </Tab>
          <Tab _data={{ [PREFIX('PanelTool')]: 'Problems' }}>
            <TabLabel {...focusableOpts()}>Source Control</TabLabel>
            <TabBody>a list of problems of progamming language tools</TabBody>
            {}
          </Tab>
          {}
        </TabPanel>
      </Div>
    )
  }
}

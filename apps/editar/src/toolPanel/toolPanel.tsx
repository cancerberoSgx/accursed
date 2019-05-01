import { Br, Div, React, Tab, TabBody, TabLabel, TabPanel } from 'accursed'
import { Component } from '../util/component'
import { focusableOpts } from '../util/style'
import { PREFIX } from '../util/util'
import { LogPanel } from './debugTool'

/** this is the bottom panel that contains tools such as the terminal, problems, etc */
export class Panel extends Component {
  render() {
    return (
      <Div>
        <TabPanel>
          <Tab _data={{ [PREFIX('panelTool')]: 'debug' }} active={true}>
            <TabLabel {...focusableOpts()}>Debug</TabLabel>
            <TabBody>
              <LogPanel {...this.props} />
            </TabBody>
            {}
          </Tab>
          <Tab _data={{ [PREFIX('panel')]: 'terminal' }}>
            <TabLabel {...focusableOpts()}>Terminal</TabLabel>
            <TabBody>{/* <terminal ></terminal> */}</TabBody>
            {}
          </Tab>
          <Tab _data={{ [PREFIX('PanelTool')]: 'Problems' }}>
            <TabLabel {...focusableOpts()}>Problems</TabLabel>
            <TabBody>
              <textbox {...focusableOpts()} value="Filter" label="Filter" border="line" />
              <Br />
              <list {...focusableOpts()} items={['Problem 1', 'Problem 2']} height="100%" />
              <Br />
            </TabBody>
            {}
          </Tab>
          {}
        </TabPanel>
        <Br />
      </Div>
    )
  }
}

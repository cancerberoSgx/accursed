import { Br, React, Tab, TabBody, TabLabel, TabPanel } from 'accursed'
import { Component } from '../util/component'
import { focusableOpts, tabLabelOpts, tabPanelOpts } from '../util/style'
import { PREFIX } from '../util/util'
import { LogPanel } from './debugTool'
import { Terminal } from './terminal'

/** this is the bottom panel that contains tools such as the terminal, problems, etc */
export class Panel extends Component {
  render() {
    return (
      // <Div >
      // <Collapsible>
      // <Maximize>
      <TabPanel {...tabPanelOpts()}>
        <Tab _data={{ [PREFIX('panelTool')]: 'debug' }} active={true}>
          <TabLabel {...tabLabelOpts()}>Debug</TabLabel>
          <TabBody>
            <LogPanel {...this.props} />
          </TabBody>
          {}
        </Tab>
        <Tab _data={{ [PREFIX('panel')]: 'terminal' }}>
          <TabLabel {...tabLabelOpts()}>Terminal</TabLabel>
          <TabBody>
            <Terminal {...this.props} />
          </TabBody>
          {}
        </Tab>
        <Tab _data={{ [PREFIX('PanelTool')]: 'Problems' }}>
          <TabLabel {...tabLabelOpts()}>Problems</TabLabel>
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
      // </Maximize>
      // </Collapsible>
      //  </Div>
    )
  }
}

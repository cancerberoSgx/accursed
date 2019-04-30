import { Br, Div, React, Tab, TabBody, TabLabel, TabPanel } from 'accursed'
import { Component } from './component'
import { focusableOpts } from './style'
import { PREFIX } from './util'
import { ActionManager } from './store/actionManager';
import { WORKSPACE_ACTION, LogMessageAction } from './store/actions';
import { State } from './store/state';

// interface PanelProps extends Props{
// }
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
              {/* <log {...focusableOpts()} /> */}
            </TabBody>
            {}
          </Tab>
          <Tab _data={{ [PREFIX('PanelTool')]: 'Problems' }}>
            <TabLabel {...focusableOpts()}>Source Control</TabLabel>
            <TabBody>

              a list of problems of progamming language tools
            </TabBody>
            {}
          </Tab>
          {}
        </TabPanel>
      </Div>
    )
  }
}


export class LogPanel extends Component {
  constructor(p, s) {
    super(p, s)
    ActionManager.get().onActionDispatched(WORKSPACE_ACTION.LOG_MESSAGE, (a: LogMessageAction, s) => this.onLogMessage(a, s))
  }
  render() {
    return <Div>
      <log name="debug" content="log" {...focusableOpts()} height="100%" width="100%" />
    </Div>
  }
  protected onLogMessage(a: LogMessageAction, s: State): void {
    throw new Error('Method not implemented.');
  }
}
import {React, Columns, Column, TreeView, Rows, Row, Div, TabPanel, Tab, TabLabel, TabBody, Br} from 'accursed'
import { State } from './state';
import {PREFIX} from './util'
import { focusableOpts, transparentBox } from './style';
import { Component, Props } from './component';

// interface SidebarProps extends Props{
// }
/** this is the bottom panel that contains tools such as the terminal, problems, etc */
export class Sidebar extends Component{
  render(){
    return <Div>
     <TabPanel>
     <Tab _data={{[PREFIX('panel')]: 'terminal'}}>
       <TabLabel {...focusableOpts()} >Terminal</TabLabel>
       <TabBody>
    TERMINAL
      </TabBody>{}
     </Tab>
     <Tab _data={{[PREFIX('panelTool')]: 'debug'}}>
       <TabLabel {...focusableOpts()} >Debug</TabLabel>
       <TabBody>
      <log {...focusableOpts()}></log>
      </TabBody>{}
     </Tab>
     <Tab _data={{[PREFIX('sidebarTool')]: 'sourceControl'}}>
       <TabLabel {...focusableOpts()} >Source Control</TabLabel>
       <TabBody>
      <textbox  {...focusableOpts()} value="Message"></textbox><Br/>
      Changes:<Br/>
      <list  {...focusableOpts()}  items={['files.txt', 'changed.md']}></list><Br/>
      </TabBody>{}
     </Tab>
     {}
     </TabPanel> 
    </Div>
  }
}
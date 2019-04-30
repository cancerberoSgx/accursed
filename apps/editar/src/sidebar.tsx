import {React, Columns, Column, TreeView, Rows, Row, Div, TabPanel, Tab, TabLabel, TabBody, Br} from 'accursed'
import { State } from './state';
import {PREFIX} from './util'
import { focusableOpts } from './style';
import { Component, Props } from './component';

// interface SidebarProps extends Props{
// }

export class Sidebar extends Component{
  render(){
    return <Div>
     <TabPanel>
     <Tab active={true} _data={{[PREFIX('sidebarTool')]: 'explorer'}}>
       <TabLabel {...focusableOpts()} >Explorer</TabLabel>
       <TabBody>
      <treeview {...focusableOpts()} width='100%' height="100%" rootNodes={[{name: '/home', expanded: true, children: [{name: 'foo.txt', children: [{name: 'foo11.txt', expanded: true,children: []}]}, {name: 'foo2.txt', expanded: true, children: []}, {name: 'foo3.txt', expanded: true, children: []}  ]}]}
      onNodeSelect={e=>{}}
      />
      </TabBody>{}
     </Tab>
     <Tab active={false} _data={{[PREFIX('sidebarTool')]: 'search'}}>
       <TabLabel {...focusableOpts()} >Search</TabLabel>
       <TabBody>
      <textbox {...focusableOpts()} value="search"></textbox><Br/>
      <checkbox  {...focusableOpts()}  checked={this.s.search.caseSensitive}content="Case sensitive"></checkbox><Br/>
    Files to include: <Br/>
    <textbox  {...focusableOpts()}  value=""></textbox><Br/>
      </TabBody>{}
     </Tab>
     <Tab active={false} _data={{[PREFIX('sidebarTool')]: 'sourceControl'}}>
       <TabLabel {...focusableOpts()} >Source Control</TabLabel>
       <TabBody>
      <textbox  {...focusableOpts()} value="Message"></textbox><Br/>
      Changes:<Br/>
      <list  {...focusableOpts()}  items={['files.txt', 'changed.md']} height="100%"></list><Br/>
      </TabBody>{}
     </Tab>
     {}
     </TabPanel> 
    </Div>
  }
}
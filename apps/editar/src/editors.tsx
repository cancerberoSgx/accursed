import {React, Columns, Column, TreeView, Rows, Row, Div, TabPanel, Tab, TabLabel, TabBody} from 'accursed'
import { State } from './state';
import {PREFIX} from './util'
import { focusableOpts } from './style';
import { Store } from './store';
import { Component } from './component';
import { Editor } from './editor';

// interface EditorsProps{
//   store: Store
// }

export class Editors extends Component{
  render(){
    return <Div>
     <TabPanel>{this.s.documents.map(d=>
     <Tab _data={{[PREFIX('path')]: d.path}}>
       <TabLabel {...focusableOpts()} >{d.name}</TabLabel>
       <TabBody><Editor {...this.props} document={d}/></TabBody>{}
     </Tab>)}
     {}
     </TabPanel> 
    </Div>
  }
}
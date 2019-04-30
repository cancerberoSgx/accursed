import {React, Component, Columns, Column, TreeView, Rows, Row, Div} from 'accursed'
import { State } from './state';
import { Editors } from './editors';
import { focusableOpts } from './style';
import { Store } from './store';
import { Sidebar } from './sidebar';

interface AppProps{
  store: Store
}
export class App extends Component<AppProps>{
  render(){
    return <Div>
      <Columns>
      <Column width="30%">
      <Sidebar {...this.props}/>
      </Column>
      <Column width="70%">
      <Rows>
        <Row height="70%">
        <Editors {...this.props}/>
        </Row>

        <Row height="30%">
        terminal and other editors here
        </Row>{}
      </Rows>
      </Column>{}
      </Columns>
      
    </Div>
  }
}
import {React,  Columns, Column, TreeView, Rows, Row, Div, Br} from 'accursed'
import { State } from './state';
import { Editors } from './editors';
import { focusableOpts } from './style';
import { Store } from './store';
import { Sidebar, SIDEBAR_ACTION } from './sidebar';
import { Props, Component } from './component';
import { pwd } from 'shelljs';

// interface AppProps extends Props{
// }
export class App extends Component{
  render(){
    setTimeout(()=>{
      // this.debug('dispatching from app ', {
      //   type: SIDEBAR_ACTION.SET_CWD, 
      //   cwd: pwd().toString()
      // })
      
      // mock - we simulate the user opening folder '.'
      this.dispatch({
        type: SIDEBAR_ACTION.SET_CWD, 
        cwd: pwd().toString()
      })
    }, 2000)
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
        <Br/>
        <log name="debug" content="log" {...focusableOpts() }height="100%" width="100%"></log><Br/>
        terminal and other editors here
        </Row>{}
      </Rows>
      </Column>{}
      </Columns>
      
    </Div>
  }
}
import { Component, Div, Element, isElement, React, replaceChildren, Screen } from 'accursed'
import { Categories } from './categories'
import { inputOptions } from './elementOptions'
import { Home } from './home'
import { Search } from './search'
// import { setOnlyEmojis } from './data/data';
import { MainView, changeViewAction } from './store/uiActions';
import {  ActionListenerType } from './store/store';
import { ActionListener, ActionType, ACTION_LISTENER, UnicodeStore } from './store/actions';

interface P {
  // screen: Screen,
  store: UnicodeStore
}
// enum MainView {
//   'categories' = 'categories',
//   'search' = 'search',
//   'help' = 'help'
// }


export class App extends Component<P, {}> implements ActionListener<ActionType.CHANGE_CURRENT_VIEW>{
  
  actionType= ActionType.CHANGE_CURRENT_VIEW
  id=ACTION_LISTENER.changeMainView

  private constructor(p:P, s:{}){
    super(p,s)
    this.props.store.addActionListener(this)
  }
  static instance(store: UnicodeStore){
    return new App({store} ,{})
  }
  main: MainView = MainView.Emojis
  render() {
    return (
      <Div parent={this.props.store.state.screen}>
        {/* <Div height={5}> */}
        <listbar
          {...inputOptions()}
          autoCommandKeys={true}
          commands={this.commands()}
          label="Menu"
          padding={1}
          height={5}
          focused={true}
          width="100%"
          // height="100%"
        />
        {/* </Div> */}
        <Div name="main-container" height="100%">
          <Main selected={this.main} />
        </Div>
      </Div>
    )
  }
handle(a: changeViewAction){
  this.updateMain(a.view)
 }
  protected updateMain(s: MainView) {
    const mainContainer = this.findDescendant(d => isElement(d) && d.name === 'main-container')! as Element
    replaceChildren(mainContainer, React.render(<Main selected={s} />))
    // const main = this.findDescendant(d => isElement(d) && d.name === 'main')! as Element
    // main.destroy()
    // mainContainer.append(React.render(<Main selected={s} />))
    // this.blessedElement.screen.render()
  }

  protected commands() {
    return {
      'Only Emojis': () => {
        // this.
        // setOnlyEmojis(true)
        this.updateMain(MainView.Emojis)
      },
      'All Unicode': () => {
        // setOnlyEmojis(false)
        this.updateMain(MainView.AllUnicode)
      },
      Search: () => {
        this.updateMain(MainView.Search)
      },
      Help: () => {
        this.updateMain(MainView.Help)
      }
    }
  }
}

const Main = (props: { selected: MainView }) => (
  <Div name="main" height="100%">
    {props.selected === MainView.Help && <Home />}
    {props.selected === MainView.Search && <Search />}
    {props.selected === MainView.AllUnicode && <Categories />}
    {props.selected === MainView.Emojis && <Categories />}
  </Div>
)

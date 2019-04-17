import { Component, Div, Element, isElement, React, replaceChildren, Screen } from 'accursed'
import { Categories } from './categories'
import { inputOptions } from './elementOptions'
import { Home } from './home'
import { Search } from './search'
import { MainView, changeViewAction } from './store/uiActions';
import {  ActionListenerType } from './store/store';
import { ActionListener, ActionType, ACTION_LISTENER, UnicodeStore, Props } from './store/actions';
import { StoreComponent } from './storeComponent';


export class App extends StoreComponent<Props, {}> implements ActionListener<ActionType.CHANGE_CURRENT_VIEW>{
  _render(): JSX.BlessedJsxNode {
   return  <Div parent={this.props.store.state.screen}>
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
    />
    <Div name="main-container" height="100%">
      <Main {...this.props} />
    </Div>
  </Div>
  }
  
  actionType= ActionType.CHANGE_CURRENT_VIEW
  id=ACTION_LISTENER.changeMainView

  private constructor(p:Props, s:{}){
    super(p,s)
    this.props.store.addActionListener(this)
  }
  static instance(store: UnicodeStore){
    return new App({store} ,{})
  }
  // main: MainView = MainView.Emojis
  // render() {
  //   return (
  //     <Div parent={this.props.store.state.screen}>
  //       {/* <Div height={5}> */}
  //       <listbar
  //         {...inputOptions()}
  //         autoCommandKeys={true}
  //         commands={this.commands()}
  //         label="Menu"
  //         padding={1}
  //         height={5}
  //         focused={true}
  //         width="100%"
  //         // height="100%"
  //       />
  //       {/* </Div> */}
  //       <Div name="main-container" height="100%">
  //         <Main selected={this.main} />
  //       </Div>
  //     </Div>
  //   )
  // }
  handle(a: changeViewAction) {
    const mainContainer = this.findDescendant(d => isElement(d) && d.name === 'main-container')! as Element
    replaceChildren(mainContainer, React.render(<Main  {...this.props}/>))
    // const main = this.findDescendant(d => isElement(d) && d.name === 'main')! as Element
    // main.destroy()
    // mainContainer.append(React.render(<Main selected={s} />))
    // this.blessedElement.screen.render()
  }

  protected commands() {
    return {
      'Only Emojis': () => {
        this.dispatch({type: ActionType.CHANGE_CURRENT_VIEW, view: MainView.Emojis})
        // this.
        // setOnlyEmojis(true)
        // this.handle(MainView.Emojis)
      },
      'All Unicode': () => {
        this.dispatch({type: ActionType.CHANGE_CURRENT_VIEW, view: MainView.AllUnicode})

        // setOnlyEmojis(false)
        // this.handle(MainView.AllUnicode)
      },
      Search: () => {
        this.dispatch({type: ActionType.CHANGE_CURRENT_VIEW, view: MainView.Search})

        // this.handle(MainView.Search)
      },
      Help: () => {
        this.dispatch({type: ActionType.CHANGE_CURRENT_VIEW, view: MainView.Help})

        // this.handle(MainView.Help)
      }
    }
  }
}

const Main = (props: Props) => (
  <Div name="main" height="100%">
    {props.store.state.currentView === MainView.Help && <Home />}
    {props.store.state.currentView  === MainView.Search && <Search {...props} />}
    {props.store.state.currentView  === MainView.AllUnicode && <Categories {...props}/>}
    {props.store.state.currentView  === MainView.Emojis && <Categories {...props}/>}
  </Div>
)

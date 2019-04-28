import { Component, Div, Element, isElement, React, replaceChildren, Screen } from 'accursed'
import { Categories } from './categories'
import { setDataOnlyEmojis } from './data/data'
import { inputOptions } from './elementOptions'
import { Home } from './home'
import { Search } from './search'

interface P {
  screen: Screen
}
enum MenuOptions {
  'categories' = 'categories',
  'search' = 'search',
  'help' = 'help'
}

export class App extends Component<P, {}> {
  main: MenuOptions = MenuOptions.categories
  render() {
    return (
      <Div parent={this.props.screen}>
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

  protected updateMain(s: MenuOptions) {
    const mainContainer = this.findDescendant(d => isElement(d) && d.name === 'main-container')! as Element
    replaceChildren(mainContainer, React.render(<Main selected={s} />))
    // const main = this.findDescendant(d => isElement(d) && d.name === 'main')! as Element
    // main.destroy()
    // mainContainer.append(React.render(<Main selected={s} />))
    // this.blessedElement.screen.render()
  }

  protected commands() {
    return {
      Emojis: () => {
        setDataOnlyEmojis(true)
        this.updateMain(MenuOptions.categories)
      },
      'All Unicode': () => {
        setDataOnlyEmojis(false)
        this.updateMain(MenuOptions.categories)
      },
      Search: () => {
        this.updateMain(MenuOptions.search)
      },
      Help: () => {
        this.updateMain(MenuOptions.help)
      }
    }
  }
}

const Main = (props: { selected: MenuOptions }) => (
  <Div name="main" height="100%">
    {props.selected === 'help' && <Home />}
    {props.selected === 'search' && <Search />}
    {props.selected === 'categories' && <Categories />}
  </Div>
)

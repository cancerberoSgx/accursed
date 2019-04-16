import { Component, Div, Element, isElement, React, Screen } from 'accursed'
import { Categories } from './categories'
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
        <Div height={5}>
          <listbar
            {...inputOptions()}
            autoCommandKeys={true}
            commands={this.commands()}
            label="Menu"
            padding={1}
            focused={true}
            width="100%"
            height="100%"
          />
        </Div>
        <Div name="main-container" height="80%">
          <Main selected={this.main} />
        </Div>
      </Div>
    )
  }

  protected updateMain(s: MenuOptions) {
    const mainContainer = this.findDescendant(d => isElement(d) && d.name === 'main-container')! as Element
    const main = this.findDescendant(d => isElement(d) && d.name === 'main')! as Element
    main.destroy()
    mainContainer.append(React.render(<Main selected={s} />))
    this.blessedElement.screen.render()
  }

  protected commands() {
    return {
      Categories: () => {
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

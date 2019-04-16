import { React, Div, Component, Br, isElement, Element, Screen } from 'accursed'
import { categories, Categories } from './categories';
import { List } from './list';
import { inputOptions } from './elementOptions';

interface P {
  screen: Screen
}

export class App extends Component<P, {}>{
  main: 'search' | 'categories' | 'list' | 'home' = 'home'
  render() {
    return <Div parent={this.props.screen}  >
      <Div height="20%" >

      <listbar {...inputOptions} autoCommandKeys={true} commands={this.commands()}
        label="Menu" 
        padding={1}
        focused={true}
        width="100%"
        height="100%"
      />
      </Div>

      <Div name="main-container" height="80%" >
        <Main selected={this.main}></Main>
      </Div>
    </Div>
  }

  protected updateMain(s: string) {
    const mainContainer = this.findDescendant(d => isElement(d) && d.name === 'main-container')! as Element
    const main = this.findDescendant(d => isElement(d) && d.name === 'main')! as Element
    main.destroy()
    mainContainer.append(React.render(<Main selected={s}></Main>))
    this.blessedElement.screen.render()
  }

  protected commands() {
    return {
      home: () => {
        this.updateMain('home')
      },
      search: () => {
        this.updateMain('search')
      },
      categories: () => {
        this.updateMain('categories')
      }
    }
  }
}

const Main = (props: { selected: string }) => <Div name="main" height="100%">
  {props.selected === 'home' && <Home/>}
  {props.selected === 'search' && <List list={categories.flags} />}
  {props.selected === 'categories' && <Categories />}
</Div>

const Home = () => <Div 
// height="20%" width="100%" 
tags={true}
>
  {'{bold}Welcome{/bold}'} Welcome<Br />

  Select one of the categories below or search some words.<Br />

  Tips: <Br />

  * you can use the **mouse**<Br />
  * **focus** between elements using *TAB* and arrow keys<Br />
  * **ENTER** or **SPACE** to click
* for **enter text in input boxes** you need to **ENTER** first and ESC to return focusing the other elements.<Br />

  Good luck, enjoy. <Br />

  [Project Home Page](https://github.com/cancerberoSgx/accursed)<Br />
</Div>


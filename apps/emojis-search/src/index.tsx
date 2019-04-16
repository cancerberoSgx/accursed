import { React, Div, Component, screen, Br, isElement, Element, installExitKeys, Screen, BoxOptions } from 'accursed'
// import * as contrib from 'blessed-contrib'
import { getIconsTable } from './test/unicodeIcons';
// import { markdown } from 'blessed-contrib';




const inputOptions:BoxOptions = {
  keys: true, mouse: true, clickable: true, focusable: true, 
  border: 'line',
  style: {
    // style: {
    // ...commonOptions(),

    selected: {
      border: {
        fg: 'lightgreen'
      },
      bg: 'magenta'
    },
    hover: {
      bg: 'blue'
    },
    border: {
      fg: 'cyan'
    },
    // }
  }
}
// const inputStyle

interface P {
  screen: Screen
}
// interface S {
//   main: 'search' | 'categories' | 'list'|'home'
//   listSelection?: string
// }
export class App extends Component<P, {}>{
  // constructor(p: P, s: S) {
  //   super(p, s)
  //   this.state = {
  //     main: 'home'
  //   }
  // }
  main: 'search' | 'categories' | 'list'|'home' = 'home'
  render() {
    this.props.screen.log('starting 0');

    return <Div parent={this.props.screen}>

      {/* <Div>Select one of the categories below or search some words. </Div> */}
      {/* <Br />
      <Br /> */}

      <listbar {...inputOptions} autoCommandKeys={true} commands={this.commands()} 
      label="Menu" padding={1} 
      // height={4} 
      width="100%"
      />
      <Br />
      <Br />

      <Div name="main-container" height="60%" width="100%">
        <Main selected={this.main}></Main>
    </Div>
    </Div>
  }

  protected commands() {
    return {
      home: () => {
        this.main = 'home'
        const mainContainer = this.findDescendant(d => isElement(d) && d.name === 'main-container')! as Element
        const main = this.findDescendant(d => isElement(d) && d.name === 'main')! as Element
        main.destroy()
        mainContainer.append(React.render(<Main selected={this.main}></Main>))
        // this.blessedElement.screen.log('starting');
        // const main = this.getMain()
        // main.remove
        // // main.remove()
        // // this.blessedElement.screen.log(!!main);
        // main.children.forEach(c => main.remove(c))
        // const home = <Home></Home>
        // main.append(home)
        // // main.r(home)
        // // getIconsTable(main)
        this.blessedElement.screen.render()
      },
      search: () => {
        this.main = 'search'
        const mainContainer = this.findDescendant(d => isElement(d) && d.name === 'main-container')! as Element
        const main = this.findDescendant(d => isElement(d) && d.name === 'main')! as Element
        main.destroy()
        mainContainer.append(React.render(<Main selected={this.main}></Main>))
       
        this.blessedElement.screen.render()
      },
      categories: () => {
        this.main = 'categories'

        const mainContainer = this.findDescendant(d => isElement(d) && d.name === 'main-container')! as Element
        const main = this.findDescendant(d => isElement(d) && d.name === 'main')! as Element
        main.destroy()
        mainContainer.append(React.render(<Main selected={this.main}></Main>))
       
        this.blessedElement.screen.render()
      }
    }
  }
  // // protected
  // setState(s: Partial<S>) {
  //   this.state = {...this.state, ...s}

  // }
  protected getMain() {
    return this.findDescendant(d => isElement(d) && d.name === 'main')! as Element
  }

  protected showList(){

  }
}

const Home =  ()=> <Div height="20%" width="100%">
# Welcome<Br />

Select one of the categories below or search some words.<Br />

Tips: <Br />

* you can use the **mouse**<Br />
* **focus** between elements using *TAB* and arrow keys<Br />
* **ENTER** or **SPACE** to click
* for **enter text in input boxes** you need to **ENTER** first and ESC to return focusing the other elements.<Br />

Good luck, enjoy. <Br />

[Project Home Page](https://github.com/cancerberoSgx/accursed)<Br />
</Div>

const Main = (props: {selected: string}) =><Div name="main">
        { props.selected=== 'home' && <Home></Home>}
        {props.selected === 'search' && <Div>search</Div>}
        {props.selected === 'categories' && <Div>categories</Div>}
        {props.selected === 'list' && <Div>list</Div>}
      </Div>

var screen2 = screen({
  autoPadding: false,
  log: 'log.txt',
  smartCSR: true,
  // forceUnicode: true,
  fullUnicode: true
})

const app = React.render(<App screen={screen2} />)
screen2.append(app)

installExitKeys(screen2)
screen2.render()




// <markdown markdown={`
// # Welcome

// Select one of the categories below or search some words.

// Tips: 

//  * you can use the **mouse**
//  * **focus** between elements using *TAB* and arrow keys
//  * **ENTER** or **SPACE** to click
//  * for **enter text in input boxes** you need to **ENTER** first and ESC to return focusing the other elements.

// Good luck, enjoy. 

// [Project Home Page](https://github.com/cancerberoSgx/accursed)

// `}></markdown>
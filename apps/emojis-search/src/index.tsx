// import { React, Div, Component, isElement, Element, Screen } from 'accursed'
// import { categories, Categories } from './categories';
// import { List } from './list';
// import { inputOptions } from './elementOptions';
// import { Home } from './home';

// interface P {
//   screen: Screen
// }

// export class App extends Component<P, {}>{
//   main: 'search' | 'categories' | 'list' | 'home' = 'home'
//   render() {
//     return <Div parent={this.props.screen}  >
//       <Div height="20%" >

//       <listbar {...inputOptions} autoCommandKeys={true} commands={this.commands()}
//         label="Menu"
//         padding={1}
//         focused={true}
//         width="100%"
//         height="100%"
//       />
//       </Div>

//       <Div name="main-container" height="80%" >
//         <Main selected={this.main}></Main>
//       </Div>
//     </Div>
//   }

//   protected updateMain(s: string) {
//     const mainContainer = this.findDescendant(d => isElement(d) && d.name === 'main-container')! as Element
//     const main = this.findDescendant(d => isElement(d) && d.name === 'main')! as Element
//     main.destroy()
//     mainContainer.append(React.render(<Main selected={s}></Main>))
//     this.blessedElement.screen.render()
//   }

//   protected commands() {
//     return {
//       home: () => {
//         this.updateMain('home')
//       },
//       search: () => {
//         this.updateMain('search')
//       },
//       categories: () => {
//         this.updateMain('categories')
//       }
//     }
//   }
// }

// const Main = (props: { selected: string }) => <Div name="main" height="100%">
//   {props.selected === 'home' && <Home/>}
//   {props.selected === 'search' && <List list={categories.flags} />}
//   {props.selected === 'categories' && <Categories />}
// </Div>

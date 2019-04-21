import { Button2, Component, Div, EventOptions, onTreeNodeFocus, React, RefObject, tree as createTree, Br } from 'accursed'

let setup
import * as contrib from 'blessed-contrib'

export type RemoveProperties<O, K extends keyof O> = Pick<O, Exclude<keyof O, K>>

React.addIntrinsicElementConstructors({ contribTree: createTree})

declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      contribTree: OptionsProps<contrib.Widgets.TreeOptions> &
        EventOptions<contrib.Widgets.TreeElement<RemoveProperties<contrib.Widgets.TreeOptions, 'children'>>>
    }
  }
}

interface P {
  ready():void
}

export class App extends Component<P, {}> {
  treeElement: RefObject<contrib.Widgets.TreeElement> = React.createRef<contrib.Widgets.TreeElement>(current=>this.props.ready())
  render() {
    return (
      <Div      >
        helllo
        {/* <Div height="25%" top="0%"> */}
          <Br/>
          <Button2 onClick={e => {}}>click</Button2>
          Search
          <textbox value="search" /> Filter
          <textbox value="people.$*.email" />
          
          <textbox value="search" /> Filter

          asdas dasd asd as d
          <Br/>
          alsj khdjlakjs dlkajsdlkajsldka jsl dk
          <Br/>
          asdasd asd asd asd asd 
ña skdñla ksñldk añlsd
          <contribTree 
          ref={this.treeElement} 
          // draggable={true} 
          bg="magenta"
          top="30%" label="'json" 
           style={{border: {fg: 'green'}, bg: 'green'}}
          width="70%" border="line'" height="80%" mouse={true} clickable={true}
           />
           lj aslkdalksj dlka sd
           <Br/>
           asdasd asd asd asd 
          <Button2 onClick={e => {}}>click</Button2>
          asdasd asd asd asd 
          asldkjls kdjflkas df
          </Div> 
          //  </Div> 

        // </Div>
        //   <Br/>
        // <Div
        // top="33%"
        //   height="70%"
        //   name="treeContainer"
        //   style={{
        //     bg: 'red'
        //   }}>
        //   <Br/>
        //   hello
         
        //    by by

        //    <Br/>
        //    asdasd
        // </Div>
    //  }
    )
  }
    // }
  get tree() {
    return this.treeElement.current!
  }
}

// // interface TP {parent: Element}
// function Tree(props: { children?: any; }){
//   // return   renderTree(parent: Element) {
//     //@ts-ignore
//     const tree = createTree({
//       // parent: this.props.
//       // parent: p.parent,
//       width: '70%',
//       border: 'line',
//       height: '80%',
//       mouse: true,
//       clickable: true
//       // scrollable: true,
//       // bg: 'green',
//       // // draggable: true,
//       // style: {
//       //   scrollbar: {
//       //     ch: ' ',
//       //     track: {
//       //       bg: 'cyan'
//       //     },
//       //     style: {
//       //       inverse: true
//       //     }
//       //   }
//       // }
//     });
//     tree.on('click', (data: any) => {
//       console.log(data);
//     });
//     onTreeNodeFocus(tree, node => {

//     });
//     tree.on('select', function (node: any) {
//       tree.screen.render();
//     });
//     //@ts-ignore
//     this.tree = tree
//     // this.props.ready()

//   return tree
// }

// // function TreeComponent() {
// class TreeComponent extends Component<{}, {}> {
//   // treeElement : RefObject<contrib.Widgets.TreeElement> = React.createRef<contrib.Widgets.TreeElement>()

//   render() {
//     var tree = createTree({
//       // parent: this.props.
//       // parent: p.parent,
//       width: '70%',
//       border: 'line',
//       height: '80%',
//       mouse: true,
//       clickable: true
//       // scrollable: true,
//       // bg: 'green',
//       // // draggable: true,
//       // style: {
//       //   scrollbar: {
//       //     ch: ' ',
//       //     track: {
//       //       bg: 'cyan'
//       //     },
//       //     style: {
//       //       inverse: true
//       //     }
//       //   }
//       // }
//     })
//     tree.on('click', (data: any) => {
//       console.log(data)
//     })
//     onTreeNodeFocus(tree, node => {})
//     tree.on('select', function(node: any) {
//       tree.screen.render()
//     })
//     return tree
//     //@ts-ignore
//     // this.tree =
//     // const tree =  React.render(tree)
//   }
//   // this.tree = tree
//   // this.props.ready()

//   // return tree

//   // return (
//   //   <layout parent={props.parent} layout="grid" width="100%" height="100%">
//   //     <text content="before1" width={20} height={3} style={{ bg: color() }} border="line" />
//   //     {props.children}
//   //     <text content="after2" width={6} height={5} />
//   //   </layout>

//   // )
// }

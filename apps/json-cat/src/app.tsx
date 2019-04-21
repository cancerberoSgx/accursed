
import {React, Component, Div, RefObject, Layout, Button2, Element, Screen, onTreeNodeFocus,   tree as createTree, textbox, findDescendant, EventOptions} from 'accursed'
import { Manager } from './manager';
import { TNode } from './types';
import * as contrib from 'blessed-contrib'
import { readSync } from 'fs';

declare global {
  export namespace JSX {
    export interface IntrinsicElements {
      tree: OptionsProps<contrib.Widgets.TreeOptions> & EventOptions<contrib.Widgets.TreeElement>
    }
  }
}

// function TreeComponent() {
class TreeComponent extends Component<{}, {}> {
  // treeElement : RefObject<contrib.Widgets.TreeElement> = React.createRef<contrib.Widgets.TreeElement>()

  render(){

this.tree = createTree({
    // parent: this.props.
    // parent: p.parent,
    width: '70%',
    border: 'line',
    height: '80%',
    mouse: true,
    clickable: true
    // scrollable: true,
    // bg: 'green',
    // // draggable: true,
    // style: {
    //   scrollbar: {
    //     ch: ' ',
    //     track: {
    //       bg: 'cyan'
    //     },
    //     style: {
    //       inverse: true
    //     }
    //   }
    // }
  });
  tree.on('click', (data: any) => {
    console.log(data);
  });
  onTreeNodeFocus(tree, node => { 

  });
  tree.on('select', function (node: any) {
    tree.screen.render();
  });
  return tree
  //@ts-ignore
// this.tree =
// const tree =  React.render(tree)

  }
  // this.tree = tree
  // this.props.ready()

// return tree

  // return (
  //   <layout parent={props.parent} layout="grid" width="100%" height="100%">
  //     <text content="before1" width={20} height={3} style={{ bg: color() }} border="line" />
  //     {props.children}
  //     <text content="after2" width={6} height={5} />
  //   </layout>

    
  // )
}

interface P{
  // screen: Screen
  // ready():void
  // log: typeof Manager.prototype.log
}
export class App extends Component<P, {}>{
//@ts-ignore
  // treeElement : RefObject<contrib.Widgets.TreeElement> = React.createRef<contrib.Widgets.TreeElement>()
  // tree: <TNode> = null as any
  tree: contrib.Widgets.TreeElement<TNode> = null as any

render(){
  return <Div name="root" 
  // parent={this.props.screen}
    >   helllo
    <Div height="25%"><Button2 onClick={e=>{}}>click</Button2>
    Search<textbox value="search"></textbox>   Filter<textbox value="people.$*.email"></textbox> 
    </Div>
    <Div height="70%" name="treeContainer"

// onRender={e=>{
//   setTimeout(()=>{
//     this.tree = findDescendant(this.blessedElement.parent!.parent!, e=>e.type==='type') as any
//   //  this.props.ready()
//   }, 500)
// }}

    //  ref={this.treeContainer} 
    style={{
      bg: 'red'
    }}>
       <TreeComponent 

      //  ef={this.treeElement}
        // onceRender={(e : any)=>{this.tree = e.currentTarget; this.props.ready()}}
         >
        </TreeComponent>
       <text onceRender={e=>{
        //  setTimeout(()=>{
        //    this.tree = findDescendant(this.blessedElement.parent!.parent!, e=>e.type==='type') as any
        //   this.props.ready()
        //  }, 500)
       }}>aksjd lkajskldjkalsjdklajklsdj</text>
    </Div>
  </Div>
}

// get tree(){
//   return this.treeElement.current!
// }

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
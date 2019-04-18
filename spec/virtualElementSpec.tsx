import { tryTo } from 'misc-utils-of-mine-generic'
import { Button, createScreen, Div, installExitKeys, React, Screen, Component, ElementOptions } from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { VirtualComponent } from '../src/blessed/virtualElement';
import { stringify } from 'querystring';
import { style } from 'ansi-escape-sequences';

describe('virtualElements', () => {

  describe('Format, syntax and validation', () => {
    let screen: Screen
    afterEach(() => {
      tryTo(() => screen.destroy())
    })
    // the followin a rich GUI definition that allows th users to declare the semantics using  multiple/arbitrary levels of the markkup . The inmplemention will use few or non of these s blessenodes wejust extracrt the definitions and use virtual node to simulate the blesseing tree.
    /**
     * tab panel containig headinsg clickable lanels on top and blocks of content at the bottom.  Hedasings and blocks are associated with an id attribute. 
     */
    class TabPanel extends Component<TabPanelProps>{
      render() {
        return <Div>
          Welcome to the soper heroe store, use the tabs below to focus on special super powers.
            <listbar commands={[]}></listbar>
          <Div>
          </Div>
        </Div>
      }
    }
    // componnet decarations (extend VirtualComponent then they wont be rendered (wont create any elememt only provide parent with data.))
    class TabHeadings extends VirtualComponent<TabHeadingsProps>{ }
    class TabBlocks extends VirtualComponent<TabBlocksProps>{ }
    class TabBlock extends VirtualComponent<TabBlockProps>{ }
    class TabHeading extends VirtualComponent<TabHeadingProps>{ }

    // component Props, . where the semantics / API is really defined (validated)
    interface TabPanelProps {
      /** Only must contain only TabHeadings and  TabBlocks children,and only one of each. */
      children: (TabHeadings | TabBlocks)[] 
    }
    /** only alows  TabBlock there must be  */
    interface TabBlocksProps {
      children: JSX.BlessedJsxNode | TabBlock[]
    }
    interface TabBlockProps {
      id:  string, children: JSX.BlessedJsxNode
    }
    interface TabHeadingsProps {
      children: JSX.BlessedJsxText | TabHeading[]
    }
    /** inner htext is mandatoryy and only text. id attr is mandatory. */
    interface TabHeadingProps {
      active?: boolean, focus?: boolean, id: string, children: JSX.BlessedJsxNode
    }



    it('should allow authors define semantics with arbirary markyp and validate children and attributes fleible', async done => {
      const UserApp2 = <Div>
        Welcome to the soper heroe store, use the tabs below to focus on special super powers.
        Here we are inside real blessed components, container box for exampe. But below (TabPanel> are virtual components that won't be rendered at all. Probably other elements wil be rendered instead
        <TabPanel>
          <TabHeadings>
            <TabHeading id="t1" active={true}>Removint this text gives an error</TabHeading>
            <TabHeading id="id is mandatory">Ttiel1 </TabHeading>
            there could be text or spaces between Headings     but not other elements not even intrinsic
            so uncommenting the next will give error _
             {/* <text content="elements"/> */}
          </TabHeadings>
          <TabBlocks>
            <TabBlock id="12"> blocks must have text and can contain any other kind of element</TabBlock>
            There cannot be any element besides text between blocks so uncomenting the follwoiing gives
          {/* <button content=""incalud></button> */}
            <TabBlock id="2">id is mandatory</TabBlock>
          </TabBlocks>>
            {/* There cannot be text between TabBlocks and TabPanel asd123 123 
            uncommenting this text vigeserror*/}
        </TabPanel>
      </Div>
    })

    describe('rendering', () => {
      let screen: Screen
      afterEach(() => {
        tryTo(() => screen.destroy())
      })
      /**
      Let's build now a nicer declaration for  current blessing List implementation  options. Users will c
      reate tons of virtual elements, and we will render all witn only one List :). For me current 
      is kind of spreaded ... I would like somthing like this: (html table simlar)
    

        header labels, and style
       * 
// label, 
const userCode =       <ListTable>
  <Scroll></Scroll>                       <---- we can have a semantic element that ust adds options for scollbarm- instead of attribtues....
  <THead style={{border: {}, backgroud: '', }> <--- the style is only for the head
<tr><th>title1</th><th>title2</th></tr>>
  </THead>
  <tbody>                             <---- style for cels , spanm etc
    <tr><td>value1</td><td>value2</td></tr>
  </tbody>
</listTable>

       */
      class ListTable extends Component<ListProps>{
        render() {
          return <Div>
          </Div>
        }
      }
      interface ListProps {
        
      }
      // first the props and below the coponents
      interface TabPanelProps {
        children: TabHeadings | TabBlocks[]
      }
      interface TabBlockProps {
        id?: string, children: JSX.BlessedJsxNode
      }
      interface TabHeadingsProps {
        children: JSX.BlessedJsxText | TabHeading[]
      }
      interface TabBlocksProps {
        children: JSX.BlessedJsxNode | TabBlock[]
      }
      interface TabHeadingProps {
        active?: boolean, focus?: boolean, id: string, children: JSX.BlessedJsxNode
      }
      class TabHeadings extends VirtualComponent<TabHeadingsProps>{ }
      class TabBlocks extends VirtualComponent<TabBlocksProps>{ }
      class TabBlock extends VirtualComponent<TabBlockProps>{ }
      class TabHeading extends VirtualComponent<TabHeadingProps>{ }
      // betweem represetation of styles

      it('should allow authors define semantics with arbitrary markyp and validate children and attributes fleible', async done => {
        // const UserApp2 = <Div>
        //   Welcome to the soper heroe store, use the tabs below to focus on special super powers.
        //   Here we are inside real blessed components, container box for exampe. But below (TabPanel> are virtual components that won't be rendered at all. Probably other elements wil be rendered instead
        //             <TabPanel>
        //     <TabHeadings>
        //       <TabHeading id="t1" active={true}>Removint this text gives an error</TabHeading>
        //       <TabHeading id="id is mandatory">Ttiel1 </TabHeading>
        //       there could be text or spaces between Headings     but not other elements not even intrinsic
        //       so uncommenting the next will give error _
        //                  {/* <text content="elements"/> */}
        //     </TabHeadings>
        //     <TabBlocks>
        //       <TabBlock id="12"> blocks must have text and can contain any other kind of element</TabBlock>

        //       There cannot be any element besides text between blocks so uncomenting the follwoiing gives
        //               {/* <button content=""incalud></button> */}
        //       <TabBlock id="2">id is mandatory</TabBlock>
        //     </TabBlocks>>
        //                 {/* There cannot be text between TabBlocks and TabPanel asd123 123 
        //                 uncommenting this text vigeserror*/}
        //   </TabPanel>
        // </Div>
      })

      xit('should not render virtual elements or text inside them', ()=>{})

      xit('what anpit on virtual elemetnrs inside girtual elemnts ?', ()=>{})

    })


  })


  // type WithOtherElementsInBetween<T> = JSX.BlessedJsxNode | string | (JSX.BlessedJsxNode | string)
  // type NormalEl =JSX.BlessedJsxNode|string|(JSX.BlessedJsxNode|string)
  // the structure: definition
  // const UserApp = <Div>
  //   <TabPanel>
  // <TabHeadings>
  //   <TabHeading label="t1" id="t1" active></TabHeading>
  //   <TabHeading label="t1" id="t1"></TabHeading>
  //   </TabHeadings>
  //   <TabBlocks>
  //     <TabBlock id="12">    dsf sdf </TabBlock>
  //     <TabBlock id="2"> required text</TabBlock>
  //     </TabBlocks>>
  //   </TabPanel>
  // </Div>


  // class Tab extends VirtualComponent<TabHeadingsProC>


  // now the virtual defininitions
  // createVir
  // Now user code: 


  // class A = V<{}>({})
  //       function V<P>(props: P) {
  //         return class Virtual extends VirtualComponent<P> {
  //         }
  //         // return VirtualComponent.createVirtualComponent(props)
  //       }
  // class V extends VirtualComponent{}

  // class VirtualParent<T> extends Component<P>{
  //   render(){
  //     return <V></V>
  //   }
  // }


  // class C{
  //   m(){}
  // }

  // Object.exC.prototype
  // function F(){
  // this.a=1
  // }


  // let proto = new Proxy({}, {
  //   get(target, propertyKey, receiver) {
  //       console.log('GET '+propertyKey);
  //       return target[propertyKey];
  //   }
  // });

  // let obj = Object.create(proto);
  // obj.bla;



  // interface Blocks
  // interface  Tagb{
  //   id: string
  //   title: string
  //   children?: [IconProps]
  // }
  // interface TabProps {
  //   name: string
  //   active?: boolean
  //   // children
  // }
  // class TabComponent extends VirtualComponent<TabProps> {
  //   getVirtualData(){
  //     return this.props
  //   }
  // }
  //   screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
  //   installExitKeys(screen)
  //   const ref1 = React.createRef<Button>()
  //   React.render(
  //     <Div width="100%" border="line" height="100%" style={{ bg: 'red' }} parent={screen}>
  //       <button
  //         ref={ref1}
  //         top="80%"
  //         left="80%"
  //         content="button11"
  //         onPress={e => {
  //           e.currentTarget.content = 'clicked!'
  //           e.currentTarget.screen.render()
  //         }}
  //       />
  //     </Div>
  //   )
  //   screen.render()
  //   ref1.current!.content = "'changed3"
  //   ref1.current!.screen.render()
  //   await waitFor(() => ref1.current! && ref1.current!.getContent().includes('changed3'))
  //   done()
  // })
})

//     xit('should allow an eelmetn to decalre virual childs just using props.children', async done => {
//       interface P {
//         children: (TabProps | BlockProps)[]
//       }
//       interface TabProps {
//         id: string
//         title: string
//         children?: [IconProps]
//       }
//       interface IconProps { url: string }
//       interface BlockProps {
//         id?: string
//         paras: string[]
//       }
//       class TabPanel extends Component<P>{
//         render() {
//           return <Virtual {...this.props} />
//         }
//       }
//       type TabPropsUnion = P | TabProps | IconProps | BlockProps
//       class Virtual extends VirtualComponent<TabPropsUnion> {

//       }

//     })



//   })
// })

// describe('waitFor green full of comments', () => {
//   let screen: Screen
//   // beforeEach(() => {
//     //   tryTo(() => screen.destroy())
//     //   screen = blessed.screen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
//     //   installExitKeys(screen)
//     // })
//     afterEach(() => {
//       tryTo(() => screen.destroy())
//   })

//   fit('should create references to elements for markup at render time', async done => {
//     // (() => screen.destroy())
//     try{
//       screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
//       installExitKeys(screen)

//       function logTrue(s:string){
//         screen.log(s)
//         return true
//       }
//       // } catch (error) {
//         // screen && screen.log(error)
//         // throw error
//   // }
//     const ref1 = React.createRef<Button>()

//   React.render(<Div width="100%" border="line" height="100%"  style={{ bg: 'red' }} parent={screen}>
//       <button ref={ref1} top="80%" left="80%" content="button11" onPress={e => { e.currentTarget.content = "clicked!"; e.currentTarget.screen.render() }}></button>
//     </Div>)

// screen.render()
// //  await waitFor(()=>ref1.current! && ref1.current!.getContent()&& logTrue(ref1.current!.getContent()) && ref1.current!.getContent().includes('button11'))
//  expect(ref1.current!.getContent().includes('button11')).not.toContain('changed3')

// // try {
//   // screen.append(React.render(app))
//   screen.render()

//        ref1.current!.content = "'changed3"
//        ref1.current!.screen.render()
//          await waitFor(()=>ref1.current! && ref1.current!.getContent().includes('changed3'))

//          console.log(ref1.current!.getContent());

//          done()
//         //  ref1.current!.press()
//         //  ref1.current!.screen.render()
//         //    await waitFor(()=>ref1.current! && ref1.current!.getContent().includes('clicked'))

// } catch (error) {
//   screen && screen.log(error)
//   tryTo(() => screen.destroy())
//   console.log(error);

//   throw error
// }
//       })
// })
// })

// // const opts = () => ({
// //   // keys: true, mouse: true, clickable: true, tags: true, focusable: true, draggable: true, input: true, inputOnFocus: true, keyable: true, vi: true, border: 'line',
// //   // style: {
// //   //   bg: 'gray',
// //   //   fg: 'white'
// //   // }
// // } as BoxOptions)

// })

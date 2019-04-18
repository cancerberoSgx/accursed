import { tryTo } from 'misc-utils-of-mine-generic'
import { Button, createScreen, Div, installExitKeys, React, Screen, Component } from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { VirtualComponent } from '../src/blessed/virtualElement';
import { stringify } from 'querystring';

describe('virtualElements', () => {
  describe('basic', () => {
    let screen: Screen
    afterEach(() => {
      tryTo(() => screen.destroy())
    })
    it('should declare data in the markcup consumed by the parent and dont be rendered', async done => {
      // TODO: later we can impl a abstracthelper component class so virtual component parents can extends and obtain the data transparently
      class TabPanel extends Component<TabPanelProps>{
        // a real parent that declares some semantic virtual children like TaB, Body, title... 
        // the complex this.props structure will be implementing with VirtualChildren instances 
        render() {
          return <Div>
            // the following are the real components and intrinsic that qwill implement this widget. normal stuff, consuming some data from ths.props.. 
            <listbar commands={[]}></listbar>
            <Div>
            </Div>
          </Div>
        }
      }

      type NormalEl =JSX.BlessedJsxNode|string|(JSX.BlessedJsxNode|string)
      // the structure: definition
      interface TabPanelProps {
        children: JSX.BlessedJsxNode|string|(JSX.BlessedJsxNode|string|TabHeadings|TabBlocks)[]//  ( (TabHeadings|   string|string[]|       TabBlocks) & NormalEl)[]
        //   )[
          // TabHeadings,
        //   TabBlocks
        // ]
      }
      interface TabBlockProps {
        id?: string
        children: JSX.BlessedJsxNode|string|(JSX.BlessedJsxNode|string)[]
        // active?: boolean
      }
      interface TabHeadingsProps {
        children: (JSX.BlessedJsxNode|string|TabHeading|(JSX.BlessedJsxNode|string))[]
      }
      interface TabBlocksProps {
        children: (TabBlock| string[]|string|JSX.BlessedJsxNode|JSX.BlessedJsxNode[])[]
      }
      interface TabHeadingProps {
         active?: boolean, focus?: boolean, id: string, children: string[]|string
      }
      class TabHeadings extends VirtualComponent<TabHeadingsProps>{}
      class TabBlocks extends VirtualComponent<TabBlocksProps>{}
      class TabBlock extends VirtualComponent<TabBlockProps>{}
      class TabHeading extends VirtualComponent<TabHeadingProps>{}

      // that our API now the user code

type WithOtherElementsInBettwen<T> = JSX.BlessedJsxNode|string|(JSX.BlessedJsxNode|string)


      const UserApp2 = <Div>
        <TabPanel>
          <TabHeadings>
            <TabHeading  id="t1" active={true}>label  mandatory</TabHeading><TabHeading id="t1">Ttiel1 </TabHeading></TabHeadings>
<TabBlocks><TabBlock id="12">    dsf sdf
 </TabBlock><TabBlock id="2"> required text</TabBlock></TabBlocks>></TabPanel>
</Div>


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

    xit('should allow an eelmetn to decalre virual childs just using props.children', async done => {
      interface P {
        children: (TabProps | BlockProps)[]
      }
      interface TabProps {
        id: string
        title: string
        children?: [IconProps]
      }
      interface IconProps { url: string }
      interface BlockProps {
        id?: string
        paras: string[]
      }
      class TabPanel extends Component<P>{
        render() {
          return <Virtual {...this.props} />
        }
      }
      type TabPropsUnion = P | TabProps | IconProps | BlockProps
      class Virtual extends VirtualComponent<TabPropsUnion> {

      }

    })



  })
})

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

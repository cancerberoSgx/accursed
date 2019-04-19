import { tryTo } from 'misc-utils-of-mine-generic'
import { Component, createScreen, Div, installExitKeys, React, Screen } from '../src'
import { VirtualComponent } from '../src/blessed/virtualElement'

// declare module 'ansi-escape-sequences'

/** see guides/virtual-elements.md  */
describe('virtualElements', () => {
  describe('Format, syntax and validation', () => {
    let screen: Screen
    afterEach(() => {
      tryTo(() => screen.destroy())
    })
    class TabPanel extends Component<TabPanelProps> {
      render() {
        return (
          <Div>
            Welcome to the soper heroe store, use the tabs below to focus on special super powers.
            <listbar commands={[]} />
            <Div />
          </Div>
        )
      }
    }

    // componnet decarations (extend VirtualComponent then they wont be rendered (wont create any elememt only provide parent with data.))
    class TabHeadings extends VirtualComponent<TabHeadingsProps> {}
    class TabBlocks extends VirtualComponent<TabBlocksProps> {}
    class TabBlock extends VirtualComponent<TabBlockProps> {}
    class TabHeading extends VirtualComponent<TabHeadingProps> {}

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
      id: string
      children: JSX.BlessedJsxNode
    }
    interface TabHeadingsProps {
      children: JSX.BlessedJsxText | TabHeading[]
    }
    /** inner htext is mandatoryy and only text. id attr is mandatory. */
    interface TabHeadingProps {
      active?: boolean
      focus?: boolean
      id: string
      children: JSX.BlessedJsxNode
    }

    it('should allow authors define semantics with arbirary markyp and validate children and attributes fleible', async done => {
      const UserApp2 = (
        <Div>
          Welcome to the soper heroe store, use the tabs below to focus on special super powers. Here we are inside real
          blessed components, container box for exampe. But below (TabPanel> are virtual components that won't be
          rendered at all. Probably other elements wil be rendered instead
          <TabPanel>
            <TabHeadings>
              <TabHeading id="t1" active={true}>
                Removint this text gives an error
              </TabHeading>
              <TabHeading id="id is mandatory">Ttiel1 </TabHeading>
              there could be text or spaces between Headings but not other elements not even intrinsic so uncommenting
              the next will give error _{/* <text content="elements"/> */}
            </TabHeadings>
            <TabBlocks>
              <TabBlock id="12"> blocks must have text and can contain any other kind of element</TabBlock>
              There cannot be any element besides text between blocks so uncomenting the follwoiing gives
              {/* <button content=""incalud></button> */}
              <TabBlock id="2">id is mandatory</TabBlock>
            </TabBlocks>
            >
            {/* There cannot be text between TabBlocks and TabPanel asd123 123 
            uncommenting this text vigeserror*/}
          </TabPanel>
        </Div>
      )
    })

    describe('rendering', () => {
      let screen: Screen
      afterEach(() => {
        tryTo(() => screen.destroy())
      })
      /**

Let's build now a nicer declaration for  current blessing ListTable implementationmore similar to html syntax:
const userCode = <ListTable {...opts}>
  <THead style={{ border: {}, backgroud: '', } > < --- Thead user can declare head styles
    {headers.map(h => <THeadLabel>{h}></THeadLabel>)}  <--THeadLabel for header labels
  </THead>
        <tTBody stile, border, color, selected, foucus, hover, etyles...>                             < ----style for cels, spanm etc
    ´data.map(row => <TBodyRpow>{row.map(td => <TBodyCell>{cell}</TBodyCell)}</TBodyRpow>)
  } < --- the actual data declared in the markwyp ? performacne
  </TBody >
  </listTable >

*/

      interface ListTableProps {
        children: [JSX.BlessedJsxNode, Thead, TBody, JSX.BlessedJsxNode] | any
        // | [JSX.BlessedJsxNode, Thead,JSX.BlessedJsxNode, TBody, JSX.BlessedJsxNode]
        //... to the all combinations - we dont care if there are other nodes we do  care that THead is fist than Tbody and ther eis only one of each
      }
      interface TheadProps {
        id?: string
        children: (JSX.BlessedJsxNode | Tr)[]
      }
      interface TrProps {
        // ts parent of both th tr
        children: (JSX.BlessedJsxNode | Th | Td)[] | any
      }
      interface TBodyProps {
        // ts parent of both th tr
        children: (JSX.BlessedJsxNode | Th | Td)[] | any
      }
      interface ThProps {
        children: JSX.BlessedJsxText | JSX.BlessedJsxNode[] | undefined
      }
      interface TdProps {
        children: JSX.BlessedJsxText | JSX.BlessedJsxText[] | undefined
      }

      class ListTable extends VirtualComponent<ListTableProps> {}
      class Thead extends VirtualComponent<TheadProps> {}
      class Tr extends VirtualComponent<TrProps> {}
      class TBody extends VirtualComponent<TBodyProps> {}
      class Th extends VirtualComponent<ThProps> {}
      class Td extends VirtualComponent<TdProps> {}

      fit('should allow authors define semantics with arbitrary markup and validate children and attributes', async done => {
        const data: any[] = [['seba', 12312312, 'jssjsjp fofof'], ['laura', 72727272, 'fhffhfh 123123']]
        const userApp4 = (
          <Div>
            I ill try to use my own Shhhh
            <ListTable>
              <Thead>
                <Th>Name</Th>
                <Th>Number code</Th>
                <Th>description</Th>
              </Thead>
              <TBody>
                <Tr>
                  <Td>hello</Td>
                  <Td>ehredd</Td>
                </Tr>
                <Tr>
                  <Td>asd</Td>
                  <Td>dfg</Td>
                </Tr>
                <Tr>
                  <Td>helasaalo</Td>
                  <Td>ssss</Td>
                </Tr>
                {/* {data=>map(t=><Tr>
          {t.map(d=><Td>{d}</Td>)}
        </Tr>)} */}
              </TBody>
            </ListTable>
          </Div>
        )

        screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
        installExitKeys(screen)
        screen.append(React.render(userApp4))
        screen.render()
      })

      xit('should not render virtual elements or text inside them', () => {})

      xit('what anpit on virtual elemetnrs inside girtual elemnts ?', () => {})
    })

    {
      /* 
})


    // // user code
    // class ListTable extends Componen
    t<ListTablPprops>{ */
    }

    //   render  ) {

    //     return <Div>
    //     </Div>
    //   }
    // }
    // // betweem represetation of styles

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
})

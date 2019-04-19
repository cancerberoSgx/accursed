import { tryTo } from 'misc-utils-of-mine-generic'
import { Component, createScreen, Div, installExitKeys, React, Screen,
  ListTable as BlessedListTable,
  Br,
  getContent, } from '../src'
import { VirtualComponent, getJSXChildrenProps } from '../src/blessed/virtualElement'
import { log } from '../src/util/logger';
import { waitFor } from '../src/blessed/waitFor';

/** see guides/virtual-elements.md  */
describe('virtualElements', () => {

  xdescribe('Format, syntax and validation', () => {
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
            un commenting this text gives error*/}
          </TabPanel>
        </Div>
      )
      done()
    })

    describe('rendering', () => {

      it('should allow authors define semantics with arbitrary markup and validate children and attributes', async done => {

        // Let's build now a nicer declaration for  current blessing ListTable , more similar to html
        
interface ListTableProps {
  children: [JSX.BlessedJsxNode, Thead, TBody, JSX.BlessedJsxNode] | any
}
interface TheadProps {
  id?: string
  children: (JSX.BlessedJsxNode | Tr)[]
}
interface TrProps {
  children: (JSX.BlessedJsxNode | Th | Td)[] | any
}
interface TBodyProps {
  children: (JSX.BlessedJsxNode | Th | Td)[] | any
}
interface ThProps {
  children: JSX.BlessedJsxText | JSX.BlessedJsxNode[] | undefined
}
interface TdProps {
  children: JSX.BlessedJsxText | JSX.BlessedJsxText[] | undefined
}
class Thead extends VirtualComponent<TheadProps> {}
class Tr extends VirtualComponent<TrProps> {}
class TBody extends VirtualComponent<TBodyProps> {}
class Th extends VirtualComponent<ThProps> {}
class Td extends VirtualComponent<TdProps> {}

try {
  let screen: Screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })

  class ListTable extends Component<ListTableProps> {
    
    /** components with virtual component children need to override this property so the information of original JSX children is available (will will obtain it with [[getJSXChildrenProps]])  */
    _saveJSXChildrenProps = true
    
    protected listTableRef = React.createRef<BlessedListTable>()

    render() {
      const ths = getJSXChildrenProps(this)!
        .find(e => e.tagName === 'Thead')!
        .children.filter(c => (c as any).tagName === 'Th')
        .map(c => (c as any).children.join(' '))
      const tds = getJSXChildrenProps(this)!
        .find(e => e.tagName === 'TBody')!
        .children.filter(c => (c as any).tagName === 'Tr')
        .map(c => (c as any).children.map((c: any) => c.children.join('')))

      // const tds2 = getJSXChildrenProps(this)!
      // .find(e => e.tagName === 'TBody')!
      // .children.filter(c => (c as any).tagName === 'Tr')
      // .map(c => (c as any).children.map((c: any) => c.children.join('')))
      // log('ListTable: ', tds, ths, tds2)
      // const d = this.getElementData<any[]>(VirtualComponent.VIRTUAL_DATA_OPTION) || 'none'
      // this.log(d)

      return (
        <Div>
          THs; {ths.join(' - ')}
          asd Welcome to the soper heroe store, use the tabs below to focus on special super powers.
          <listtable
            ref={this.listTableRef}
            width="100%"
            height="80%"
            border="line"
            data={[ths, ['asd', 'sdf', 'dfg']].concat(tds)}
          />
        </Div>
      )
    }
  }
  // const data: string[][] = [['seba', '12312312', 'jssjsjp fofof'], ['laura', '72727272', 'fhffhfh 123123']]
  installExitKeys(screen)
  const userApp4 = (
    <Div>
      And this is the data: 
      <Br />
      <ListTable>
        <Thead>
          <Th>Name</Th>
          <Th>Number code</Th>
          <Th>Description</Th>
        </Thead>
        <TBody>          
          <Tr>
            <Td>hello</Td>
            <Td>sample123</Td>
            <Td>ehredd</Td>
          </Tr>
          <Tr>
            <Td>asd</Td>
            <Td>dfg</Td>
            <Td>Foooasd</Td>
          </Tr>
          <Tr>
            <Td>helasaalo</Td>
            <Td>ssss</Td>
            <Td>asdf</Td>
          </Tr>
          {/* {data.map(t => (
            <Tr>
              {t.map(d => (
                <Td>{d}</Td>
              ))}
            </Tr> */}
          {/* ))} */}
        </TBody>
      </ListTable>
    </Div>
  )

  //TODO: issue - elements in data array are not rendered
  const el = React.render(userApp4)
  screen.append(el)
  screen.render()
  log(el.getContent(), getContent(el))
  await waitFor(() => getContent(el).includes('Description'))
  expect(getContent(el).includes('Number code'))
  expect(getContent(el).includes('sample123'))
  done()
} catch (error) {
  // screen.log(error)
  log('ERROR', error)
}
      })

      xit('should not render virtual elements or text inside them', () => {})

      xit('what anpit on virtual elemetnrs inside girtual elemnts ?', () => {})
    })
  })
})

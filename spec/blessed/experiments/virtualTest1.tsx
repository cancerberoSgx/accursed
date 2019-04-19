import {
  Br,
  Component,
  createScreen,
  Div,
  installExitKeys,
  ListTable as BlessedListTable,
  React,
  Screen
} from '../../../src'
import { getJSXChildrenProps, VirtualComponent } from '../../../src/blessed/virtualElement'
import { log } from '../../../src/util/logger'

// log('hashdhhs')
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
      // const virtualChildren = getJSXChildrenProps(this)
      log('ListTable: ', tds)
      // this._jsxChildrenProps
      // const d = this.getElementData<any[]>(VirtualComponent.VIRTUAL_DATA_OPTION) || 'none'
      // this.log(d)
      return (
        <Div>
          THs; {ths.join(' - ')}
          {/* {(d ||[]).map(c=>c+'').join(', ')} */}
          {/* {(d ||[]).map(c=>c.type||'iii').join(', ')} */}
          asd Welcome to the soper heroe store, use the tabs below to focus on special super powers.
          {/* <listbar commands={[]}></listbar> */}
          <listtable
            ref={this.listTableRef}
            width="100%"
            height="80%"
            border="line"
            data={[ths, ['asd', 'sdf', 'dfg']].concat(tds)}
          />
          {/* <Div>
          </Div> */}
        </Div>
      )
    }
    // afterRender() {
    //   const ths = getJSXChildrenProps(this)!.find(e=>e.tagName==='Thead')!.children.filter(c=>(c as any).tagName==='Th').map(c=>(c as any).children.join(' '))
    //   this.listTableRef.current!.setData([])
    // }
  }

  const data: string[][] = [['seba', '12312312', 'jssjsjp fofof'], ['laura', '72727272', 'fhffhfh 123123']]
  installExitKeys(screen)
  const userApp4 = (
    <Div>
      I ill try to use my own Shhhh
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
            <Td>descriii</Td>
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
          {data.map(t => (
            <Tr>
              {t.map(d => (
                <Td>{d}</Td>
              ))}
            </Tr>
          ))}
        </TBody>
      </ListTable>
    </Div>
  )

  screen.append(React.render(userApp4))
  screen.render()
} catch (error) {
  // screen.log(error)
  log('ERROR', error)
}

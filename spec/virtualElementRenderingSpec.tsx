import { tryTo } from 'misc-utils-of-mine-generic'
import {
  Br,
  Component,
  createScreen,
  Div,
  getContent,
  installExitKeys,
  React,
  Screen,
  Style
} from '../src'
import { getJSXChildrenProps, VirtualComponent } from '../src/blessed/virtualElement'
import { waitFor } from '../src/blessed/waitFor'
import { log } from '../src/util/logger'

/** see guides/virtual-elements.md  */
describe('virtualElementsRendering', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should allow authors define semantics with arbitrary markup and validate children and attributes', async done => {

    let screen: Screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
    installExitKeys(screen)
    // Let's build now a nicer declaration for  current blessing ListTable , more similar to html

    interface ListTableProps {
      children: [JSX.BlessedJsxNode, Thead, TBody, JSX.BlessedJsxNode] | any
    }
    interface TheadProps {
      style?: Style
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
    class Thead extends VirtualComponent<TheadProps> { }
    class Tr extends VirtualComponent<TrProps> { }
    class TBody extends VirtualComponent<TBodyProps> { }
    class Th extends VirtualComponent<ThProps> { }
    class Td extends VirtualComponent<TdProps> { }

    try {

      class ListTable extends Component<ListTableProps> {
        // we override this property so JSX children props data is available
        _saveJSXChildrenProps = true

        render() {
          const ths = getJSXChildrenProps(this)!
            .find(e => e.tagName === 'Thead')!
            .children.filter(c => (c as any).tagName === 'Th')
            .map(c => (c as any).children.join(' '))
          const tds = getJSXChildrenProps(this)!
            .find(e => e.tagName === 'TBody')!
            .children.filter(c => (c as any).tagName === 'Tr')
            .map(c => (c as any).children.map((c: any) => c.children.join('')))
          log(JSON.stringify(getJSXChildrenProps(this)))
          return (<listtable
            width="100%"
            height="80%"
            border="line"
            data={[ths, ...tds]}
          />
          )
        }
      }
      const data: string[][] = [['seba', '12312312', 'jssjsjp fofof'], ['laura', '72727272', 'fhffhfh 123123']]
      const userApp4 = (
        <Div>
          And this is the data:
              <Br />
          <ListTable>
            <Thead style={{bg: 'sdf'}}>
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
      const el = React.render(userApp4)
      screen.append(el)
      screen.render()
      log(el.getContent(), getContent(el))
      await waitFor(() => getContent(el).includes('Description'))
      expect(getContent(el).includes('Number code'))
      expect(getContent(el).includes('sample123'))
      expect(getContent(el).includes('seba'))
      expect(getContent(el).includes('laura'))
      done()
    } catch (error) {
      log('ERROR', error)
    }
  })

  xit('should not render virtual elements or text inside them', () => { })

  xit('what about on virtual elemetnrs inside girtual elemnts ?', () => { })
})

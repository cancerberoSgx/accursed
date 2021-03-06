import { tryTo } from 'misc-utils-of-mine-generic'
import { createScreen, Div, getContent, installExitKeys, React, Screen } from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { ListTable2, ListTableBody, ListTableCell, ListTableHead, ListTableRow } from '../src/jsx-components'
import { arr, number, string } from '../src/util/data'
import { debug } from '../src/util/logger'

describe('listTableComponent', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should render headers and cells', async done => {
    try {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
      installExitKeys(screen)

      const data = [...arr(20).map(i => [string(), number()]), ['last3', 'lastNumber3']]

      const t1 = (
        <Div parent={screen}>
          <ListTable2>
            <ListTableHead fg="red">
              <ListTableCell>Name</ListTableCell>
              <ListTableCell>Phone</ListTableCell>
              {}
            </ListTableHead>
            <ListTableBody fg="green">
              <ListTableRow>
                <ListTableCell>hello</ListTableCell>
                <ListTableCell>world</ListTableCell>
                {}
              </ListTableRow>
              <ListTableRow>
                <ListTableCell>hello2</ListTableCell>
                <ListTableCell>world2</ListTableCell>
                {}
              </ListTableRow>
              {data.map(d => (
                <ListTableRow>
                  <ListTableCell>{d[0]}</ListTableCell>
                  <ListTableCell>{d[1]}</ListTableCell>
                  {}
                </ListTableRow>
              ))}
              {}
            </ListTableBody>
            {}
          </ListTable2>
        </Div>
      )

      const el = React.render(t1)
      screen.append(el)
      screen.render()

      await waitFor(() => getContent(el).includes('Name'))
      expect(getContent(el)).toContain('world2')
      expect(getContent(el)).toContain('lastNumber3')
      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })
})

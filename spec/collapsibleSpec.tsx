import { tryTo } from 'misc-utils-of-mine-generic'
import {
  createScreen,
  Div,
  filterDescendants,
  getContent,
  installExitKeys,
  installFocusHandler,
  React,
  Screen
} from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { Br, ShowIf, Collapsible } from '../src/jsx-components'
import { string, words } from '../src/util/data'
import { log } from '../src/util/logger'

describe('collapsible', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should show collapsible controls', async done => {
    try {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true, focusable: true })
      installExitKeys(screen)
      const t1 = (
        <Collapsible> 
        Hello I should collapse
        <button
          border="line"
          content="click me"
        />
        <Br />
          body1
          <Br />
          {words().join(' ')}
          <Br />
          <button content={string()} border="line" focusable={true} /> <Br />
          {words().join(' ')}
          <Br />
        </Collapsible>
      )

      const el = React.render(t1)
      installFocusHandler('test1', filterDescendants(el, el => el.type === 'button'), screen)

      screen.append(el)
      screen.render()

      await waitFor(() => getContent(el).includes('collapse'))
      expect(getContent(el)).toContain('Hello I should collapse')
      //TODO: click the button and assert content is collapsed

      done()
    } catch (error) {
      log('ERROR', error)
    }
  })
})

{
  /* 
          //TODO: e.currentTarget.content doesn't work with Button2 !!!
          <Button2 onClick={e=>{
            update(showContent)
            e.currentTarget.content += showContent?'hide':'show'
            log('Button2', showContent,   e.currentTarget.content)
            screen.render()
            showContent = !showContent
          }}>{showContent?'hide':'show'}</Button2> */
}

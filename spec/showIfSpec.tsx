import { tryTo } from 'misc-utils-of-mine-generic'
import {
  createScreen,
  Div,
  filterDescendants,
  getContent,
  installExitKeys,
  installFocusHandler,
  React,
  Screen,
  showInModal
} from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { Button2, ShowIf, Br } from '../src/jsx-components'
import { log } from '../src/util/logger'
import { words, string } from '../src/util/data';

describe('showIf', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should show/hide when update is triggered', async done => {
    try {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true, focusable: true })
      installExitKeys(screen)
      let update: (show: boolean) => void
      let showContent = true
      const t1 = (
        <Div>
          <button border="line" content={showContent ? 'hide' : 'show'} onClick={e => {
            showContent = !showContent
            update(showContent)
            e.currentTarget.content = showContent ? 'hide' : 'show'
            log('Button2', showContent, e.currentTarget.content)
            screen.render()
          }} />
          <Br />
          <ShowIf onUpdate={fn => update = fn}>
            body1<Br />
            {words().join(' ')}<Br />
            <button content={string()} border="line" focusable={true} /> <Br />
            {words().join(' ')}<Br />
          </ShowIf>
        </Div>
      )

      const el = React.render(t1)
      installFocusHandler('test1', filterDescendants(el, el => el.type === 'button'), screen)

      screen.append(el)
      screen.render()

      await waitFor(() => getContent(el).includes('hide'))

      //TODO: click the button and assert content is hidden... 
      expect(getContent(el)).toContain('hide')

      done()
    } catch (error) {
      log('ERROR', error)
    }
  })

})


{/* 
          //TODO: e.currentTarget.content doesn't work with Button2 !!!
          <Button2 onClick={e=>{
            update(showContent)
            e.currentTarget.content += showContent?'hide':'show'
            log('Button2', showContent,   e.currentTarget.content)
            screen.render()
            showContent = !showContent
          }}>{showContent?'hide':'show'}</Button2> */}
import { tryTo } from 'misc-utils-of-mine-generic'
import {
  AutoComplete,
  cleanNode,
  createScreen,
  Div,
  Element,
  installExitKeys,
  printElement,
  React,
  Screen,
  Textarea
} from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { sleep } from './blessedTestUtil'

describe('autoComplete', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })
  beforeEach(() => {
    tryTo(() => screen.destroy())
    screen = createScreen({})
    installExitKeys(screen)
    screen.key('tab', k => {
      screen.focusNext()
      screen.render()
    })
    screen.key('S-tab', k => {
      screen.focusPrevious()
      screen.render()
    })
  })

  it('should render', async done => {
    const options = ['asdn', 'asdr', 'asdf', 'sdf', 'dfg', 'dfg', 'ppp', 'poi']
    const el = React.render(
      <Div parent={screen}>
        <AutoComplete
          inputOptions={{
            value: 'as',
            focused: true,
            inputOnFocus: true
          }}
          value="as"
          options={options}
        />
      </Div>
    )
    screen.render()
    await waitFor(() => printElement(el).includes('as'))
    done()
  })

  it('should be used without jsx', async done => {
    const component = new AutoComplete({
      value: 'a',
      options: countries(),
      inputOptions: {
        focused: true,
        inputOnFocus: true
      },
      parent: screen
    })
    const el = React.render(component.render())
    screen.render()
    await waitFor(() => printElement(el).includes('a'))
    expect(printElement(el)).not.toContain('afghanistan')
    screen.emit('key tab')
    component.input.emit('keypress', null, { name: 'enter' })
    expect(printElement(el)).toContain('afghanistan')
    done()
  })

  describe('keys', () => {
    let component: AutoComplete
    let el: Element
    beforeEach(async () => {
      component = new AutoComplete({
        value: 'a',
        options: countries(),
        inputOptions: {
          focused: true,
          inputOnFocus: true
        },
        parent: screen
      })
      el = React.render(component.render())
      screen.render()
      await waitFor(() => printElement(el).includes('a'))
    })
    afterEach(() => {
      cleanNode(screen)
    })
    it('should show suggestions on focus and enter', async done => {
      screen.emit('key tab')
      const input: Textarea = screen.focused as Textarea
      input.emit('keypress', null, { name: 'enter' })
      expect(printElement(el)).toContain('afghanistan')
      expect(printElement(el)).not.toContain('brazil')

      await sleep(100) // we need to wait . TODO: wait for? or some internal event?
      input.emit('keypress', 'z', { name: 'z' })
      input.emit('keypress', null, { name: 'enter' })
      expect(printElement(el)).not.toContain('afghanistan')
      expect(printElement(el)).toContain('brazil')
      done()
    })
  })
})

const countries = () => [
  'Afghanistan',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and/or Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Cape Verde',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (Keeling) Islands',
  'Colombia',
  'Comoros',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  'Croatia (Hrvatska)',
  'Cuba',
  'Cyprus',
  'Czech Republic'
]

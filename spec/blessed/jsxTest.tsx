import * as blessed from 'blessed'
import { installExitKeys } from '../../src/blessed'
import { BoxOptions, Textarea } from '../../src/blessedTypes'
import { React } from '../../src/jsx/createElement'
import { findDescendant } from '../../src/node'

const screen = blessed.screen({ smartCSR: true })
installExitKeys(screen)

const commonOptions: BoxOptions = {
  mouse: true,
  border: 'line',
  style: {
    bg: 'gray',
    fg: 'blue',
    border: {
      fg: 'black'
    },
    focus: {
      border: {
        fg: 'red'
      }
    }
  }
}

React.render(
  <box {...commonOptions} parent={screen} top="0%" label="Contact me">
    <textarea
      {...commonOptions}
      focused={true}
      width="50%"
      name="input1"
      left="center"
      height={9}
      top={0}
      focusable={true}
      clickable={true}
      keys={true}
      input={true}
      inputOnFocus={true}
      key={[
        'f',
        (ch, key) => {
          const textArea = findDescendant<Textarea>(screen, n => n.options.name === 'input2')!

          textArea.setText(textArea.getText() + ' --- key: ' + key.name)
          screen.render()
        }
      ]}
    />
    <button
      {...commonOptions}
      height={3}
      top={20}
      width="50%"
      left="center"
      align="center"
      valign="middle"
      content="submit"
      focusable={true}
      clickable={true}
      keys={true}
      on={[
        'click',
        () => {
          const textArea = findDescendant<Textarea>(screen, n => n.options.name === 'input1')!
          textArea.setText(textArea.getText() + ' --- click')
          screen.render()
        }
      ]}
      onClick={e => {
        const textArea = findDescendant<Textarea>(screen, n => n.options.name === 'input1')!

        textArea.setText(textArea.getText() + ' --- onClick')
        e.currentTarget.screen.render()
      }}
    />
    <textarea
      {...commonOptions}
      focused={true}
      width="50%"
      left="center"
      height={9}
      top={25}
      name="input2"
      focusable={true}
      clickable={true}
      keys={true}
      input={true}
      inputOnFocus={true}
      onKeyPress={e => {
        const textArea = findDescendant<Textarea>(screen, n => n.options.name === 'input1')!

        textArea.setText(textArea.getText() + ' --- key: ' + e.currentTarget.options.name + ' - ' + e.key.name)
        e.currentTarget.screen.render()
      }}
    />
  </box>
)

screen.render()

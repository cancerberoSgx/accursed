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
      content="edit me"
      width="50%"
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
          console.log('key', key.name)
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
          const textArea = findDescendant<Textarea>(screen, n => n.type === 'textarea')
          if (textArea) {
            textArea.setText(textArea.getText() + ' --- click')
            screen.render()
          }
        }
      ]}
      onClick={e => {
        const textArea = findDescendant<Textarea>(e.currentTarget.screen, n => n.type === 'textarea')
        if (textArea) {
          textArea.setText(textArea.getText() + ' --- onClick')
          e.currentTarget.screen.render()
        }
      }}
    />
  </box>
)

screen.render()

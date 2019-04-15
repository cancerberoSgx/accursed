import * as blessed from 'blessed'
import { findDescendantNode, installExitKeys } from '../../src/blessed/blessed'
import { BoxOptions, Textarea } from '../../src/blessed/blessedTypes'
import { React } from '../../src/blessed/jsx/createElement'

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
          const textArea = findDescendantNode<Textarea>(screen, n => n.type === 'textarea')
          if (textArea) {
            textArea.setText(textArea.getText() + ' --- click')
            screen.render()
          }
        }
      ]}
      onClick={e => {
        const textArea = findDescendantNode<Textarea>(e.currentTarget.screen, n => n.type === 'textarea')
        if (textArea) {
          textArea.setText(textArea.getText() + ' --- onClick')
          e.currentTarget.screen.render()
        }
      }}
    />
  </box>
)

screen.render()

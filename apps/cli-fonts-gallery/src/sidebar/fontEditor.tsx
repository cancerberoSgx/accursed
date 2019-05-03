import { AutoComplete, Br, Button2, Div, React, ref, showInModal, TabPanel, Textarea } from 'accursed'
import { writeFileSync } from 'fs'
import { enumKeys } from 'misc-utils-of-mine-typescript'
import { inBrowser } from '../../../../dist/src/util/browser'
import { Component } from '../component'
import { FIGLET_FONTS } from '../figletFonts'
import { ACTIONS } from '../store/fontsAction'
import { appLogger } from '../toolPanel/debugTool'
import { focusableOpts } from '../util/style'

export class FontEditor extends Component {
  tabPanel: TabPanel
  textarea: Textarea
  autocomplete: AutoComplete

  render() {
    const fonts = enumKeys(FIGLET_FONTS)
    return (
      <Div>
        <AutoComplete
          inputOptions={{ ...focusableOpts(), width: '94%' }}
          listOptions={{ bg: 'lightgray', scrollbar: { inverse: true }, width: '94%' }}
          ref={ref<AutoComplete>(c => (this.autocomplete = c))}
          options={fonts}
          value={this.s.fonts.selected}
          width="95%"
          height={10}
          optionsMax={2000}
          onChange={e => this.onSelectFont(e.value)}
          onSelectOption={e => this.onSelectFont(e.value)}
        />
        <Br />
        <textarea
          {...focusableOpts()}
          height="60%"
          width="95%"
          value={this.s.fonts.text}
          onChange={e => this.onEditorChange(e.value)}
          on={['action', v => this.onEditorChange(this.textarea.getText())]}
          ref={ref<Textarea>(c => {
            this.textarea = c
          })}
        />

        <Br />
        <Button2
          onClick={e => {
            if (!inBrowser()) {
              const f = 'cli-fonts-gallery_screenshot_' + new Date() + '.txt'
              const s = this.screen.screenshot()
              writeFileSync(f, s)
            }
            showInModal(this.screen, 'Saved file \n' + 'cli-fonts-gallery_screenshot_' + new Date() + '.txt')
          }}>
          Take Screenshot
        </Button2>
      </Div>
    )
  }
  onEditorChange(text: string): void {
    appLogger('onEditorChange', text)
    this.props.store.dispatch({
      type: ACTIONS.FONTS_TEXT_CHANGED,
      text
    })
  }
  onSelectFont(font: string) {
    this.props.store.dispatch({
      type: ACTIONS.FONTS_FONT_SELECTED,
      font
    })
  }
}

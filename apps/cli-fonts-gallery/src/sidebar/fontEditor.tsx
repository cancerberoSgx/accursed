import {
  AutoComplete,
  Br,
  Button2,
  Div,
  React,
  ref,
  Select,
  SelectOption,
  showInModal,
  Tab,
  TabBody,
  TabLabel,
  TabPanel,
  Textarea
} from 'accursed'
import { writeFileSync } from 'fs'
import { throttle } from 'misc-utils-of-mine-generic'
import { enumKeys } from 'misc-utils-of-mine-typescript'
import { inBrowser } from '../../../../dist/src/util/browser'
import { Component } from '../component'
import { FIGLET_FONTS } from '../figletFonts'
import { ACTIONS } from '../store/fontsAction'
import { appLogger } from '../toolPanel/debugTool'
import { focusableOpts, tabLabelOpts } from '../util/style'

export class FontEditor extends Component {
  tabPanel: TabPanel
  textarea: Textarea
  autocomplete: AutoComplete
  private select: Select

  render() {
    const fonts = enumKeys(FIGLET_FONTS)
    return (
      <Div>
        <TabPanel>
          <Tab active={true}>
            <TabLabel {...tabLabelOpts()}>Autocomplete</TabLabel>
            <TabBody>
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
            </TabBody>
            {}
          </Tab>
          {}
          <Tab>
            <TabLabel {...tabLabelOpts()}>List</TabLabel>
            <TabBody>
              <textbox
                {...focusableOpts()}
                width="100%"
                border="line"
                label="filter"
                onChange={e => {
                  // appLogger('onChange', e.value, isElement(this.select) , isComponent(this.select) , typeof this.select. _saveJSXChildrenProps) ///!!this.select, !!this.select.list, this.select.type)
                  const v = (e.value && e.value.toLowerCase()) || ''
                  // appLogger(this.select.values, this.select.list.ritems)
                  this.select.filter(value => {
                    // appLogger(value, v)
                    return value.includes(v)
                  })
                }}
              />
              <Br />
              <Select
                {...focusableOpts()}
                ref={ref<Select>(c => {
                  this.select = c
                  // debug("ref()", isElement(c), isComponent(c) , typeof this.select. _saveJSXChildrenProps, this.select.type)
                })}
                onSelect={e => this.onSelectFont(e.value)}
                onSelectItem={throttle(e => this.onSelectFont(e.value), 1000, { trailing: true })}>
                {fonts.map(f => (
                  <SelectOption>{f}</SelectOption>
                ))}
                {}
              </Select>
            </TabBody>
            {}
          </Tab>
        </TabPanel>
        Text:
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

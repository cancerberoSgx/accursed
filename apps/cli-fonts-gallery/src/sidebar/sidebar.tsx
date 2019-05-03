import { Br, Div, React, ref, Tab, TabBody, TabLabel, TabPanel,  AutoComplete, BorderBox, BorderLayout, BorderStyle, Button2, Rows, Row, IEditor, showInModal, Textarea, Select, screen } from 'accursed'
import { focusableOpts, tabLabelOpts, tabPanelOpts } from '../util/style'
import { enumKeys } from 'misc-utils-of-mine-typescript';
import { FIGLET_FONTS } from '../figletFonts';
import { Component } from '../component';
import { ACTIONS } from "../fontsAction";
import { appLogger } from '../toolPanel/debugTool';
import { Metadata } from './metadataPanel';
import { inBrowser } from '../../../../dist/src/util/browser';
import { writeFileSync } from 'fs';

export class Sidebar extends Component {
  tabPanel: TabPanel
  textarea: Textarea;
  autocomplete: AutoComplete;

  render() {
    const fonts = enumKeys(FIGLET_FONTS)
    return (
      // <borderBox
      // borderStyle={BorderStyle.double}
      // label={'test'}
      // style={{ label: { fg: 'blue' }, border: { fg: 'green' } }}
      // width="95%"
      // height="95%">
          <TabPanel {...tabPanelOpts()} ref={ref<TabPanel>(c => (this.tabPanel = c))}>
            <Tab active={true}>
              <TabLabel {...tabLabelOpts()}>tab1</TabLabel>
              <TabBody>

        
{/* <Rows>
  <Row height="30%"> */}

  <AutoComplete   inputOptions={{...focusableOpts(), width: '94%'}}  listOptions={{bg: 'lightgray', scrollbar: {inverse: true}, width: '94%'}} ref={ref<AutoComplete>(c=>this.autocomplete = c)} options={fonts}  value={this.s.fonts.selected} width="95%" height={10} optionsMax={2000}onChange={e=>this.onSelectFont(e.value)} onSelectOption={e=>
    this.onSelectFont(e.value)}/>
    {/* <Select>
    {}

    </Select> */}

  {/* </Row> */}
<Br/>
  {/* <Row height="70%"> */}

  {/* <editor height="60%" width="95%" text="Hello World" language="js" buffer={{bg: 'black'}} style={{bg: 'black'}} ref={ref<IEditor>(c=>{this.editor = c; this.editor.textBuf.onDidStopChanging(e=>this.onEditorChange(this.editor.textBuf.getText()))})}></editor> */}

  <textarea {...focusableOpts()}height="60%" width="95%" value={this.s.fonts.text}
  onChange={e=>this.onEditorChange(e.value)}  on={['action', v=>this.onEditorChange(this.textarea.getText())]}
  ref={ref<Textarea>(c=>{this.textarea = c})}></textarea>


<Br/>
<Button2 onClick={e=>{
  if(!inBrowser()){
    const f = 'cli-fonts-gallery_screenshot_'+new Date()+'.txt'
    const s = this.screen.screenshot()
    writeFileSync(f, s)
  }
  showInModal(this.screen, 'Saved file \n'+'cli-fonts-gallery_screenshot_'+new Date()+'.txt')
}}>Take Screenshot</Button2>
  {/* </Row> */}
{/* </Rows> */}
              </TabBody>
              {}
            </Tab>
            <Tab>
              <TabLabel {...tabLabelOpts()}>Font Metadata</TabLabel>
              <TabBody>
                <Metadata {...this.props}/>
              </TabBody>
              {}
            </Tab>
           {}
          </TabPanel>
        // </borderBox>
    )
  }
  onEditorChange(text: string): void {
    appLogger('onEditorChange', text)
    this.props.store.dispatch({
      type: ACTIONS.FONTS_TEXT_CHANGED,
      text
    })
  }
  onSelectFont(font:string) {
    this.props.store.dispatch({
      type: ACTIONS.FONTS_FONT_SELECTED,
      font
    })
  }

}



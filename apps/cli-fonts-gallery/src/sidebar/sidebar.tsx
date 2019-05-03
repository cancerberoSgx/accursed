import { Br, Div, React, ref, Tab, TabBody, TabLabel, TabPanel,  AutoComplete, BorderBox, BorderLayout, BorderStyle, Button2, Rows, Row, IEditor, showInModal } from 'accursed'
import { focusableOpts, tabLabelOpts, tabPanelOpts } from '../util/style'
import { enumKeys } from 'misc-utils-of-mine-typescript';
import { FIGLET_FONTS } from '../figletFonts';
import { Component } from '../component';
import { ACTIONS } from "../fontsAction";

export class Sidebar extends Component {
  tabPanel: TabPanel
  editor: IEditor;
  autocomplete: AutoComplete;

  render() {
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

          
      akjshdkajs hdkjas
          <Button2 top="50%" onClick={e => {}}>
          jalaskjd 
          </Button2>
          {}
<Rows>
  <Row height="30%">
  <AutoComplete  inputOptions={focusableOpts()} listOptions={{bg: 'lightgray', scrollbar: {inverse: true}}} ref={ref<AutoComplete>(c=>this.autocomplete = c)} options={enumKeys(FIGLET_FONTS)} value={enumKeys(FIGLET_FONTS)[0]} width="95%" height={10} onChange={e=>this.onSelectFont(e.value)} onSelectOption={e=>
    this.onSelectFont(e.value)}/>
  </Row>
  <Row height="70%">
  <editor height="60%" width="95%" text="Hello World" language="js" buffer={{bg: 'black'}} style={{bg: 'black'}} ref={ref<IEditor>(c=>{this.editor = c; this.editor.textBuf.onDidStopChanging(e=>this.onEditorChange(this.editor.textBuf.getText()))})}></editor>
  </Row>
{}</Rows>
              </TabBody>
              {}
            </Tab>
            <Tab>
              <TabLabel {...tabLabelOpts()}>tab1</TabLabel>
              <TabBody>
              </TabBody>
              {}
            </Tab>
           {}
          </TabPanel>
        // </borderBox>
    )
  }
  onEditorChange(text: string): void {
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



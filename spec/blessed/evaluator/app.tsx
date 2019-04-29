import {
  Box,
  BoxOptions,
  Br,
  Button2,
  closeModal,
  Column,
  Columns,
  Div,
  React,
  Row,
  Rows,
  Select,
  SelectOption,
  showInModal,
  Strong,
  Tab,
  TabBody,
  TabLabel,
  TabPanel,
  TextareaOptions
} from '../../../src'
import { Maximize } from '../../../src/jsx-components/maximize'
import { Action, BaseApp } from './baseApp'
import { examples } from './examples'

export const focusableOpts: () => TextareaOptions = () => ({
  mouse: true,
  keys: true,
  focusable: true,
  clickable: true,
  input: true,
  keyable: true,
  border: 'line',
  style: {
    bg: 'lightgray',
    fg: 'black',
    border: {
      type: 'line',
      fg: 'cyan'
    },
    focus: {
      fg: 'black',
      bg: '#507468',
      border: {
        fg: 'red'
      }
    },
    item: {
      bg: 'lightgray',
      fg: 'black',
      underline: false
    },
    selected: {
      bg: 'magenta',
      fg: 'black',
      // bold: true,
      underline: true
    }
  }
})

export const transparentBox: () => BoxOptions = () => ({
  width: '100%',
  height: '100%',
  border: undefined
})

/**
 * Adds the UI to the base app
 */
export class App extends BaseApp {
  // protected settingsEditorContainer: Box;
  // protected settingsEditor: IEditor;
  help(): void {
    showInModal(
      this.screen,
      React.render(
        <Div>
          <Br />
          <Strong>Welcome to blessed Evaluator</Strong>
          <Br />
          <Br />
          <button {...focusableOpts()} content="Close This Modal" onPress={e => closeModal(this.screen)} /> <Br />
          <Br />
          The idea is to edit JS or JSX code in the editor, execute it and see the blessed elements right next.
          <Strong> Keys: </Strong>
          <Br />
          * control-right - control-left to focus controls and press enter to click buttons <Br />
          * you can use the mouse both in and outside the editor <Br />
          * the editor is similar to sublime/vscode <Br />
          * control-c control-v to copy and paste <Br />
          * you can select with the mouse <Br />
          * control-z control-y to undo and redo <Br />
          <Br />
          <button {...focusableOpts()} content="Close This Modal" onPress={e => closeModal(this.screen)} />
        </Div>
      )
    )
  }
  render() {
    setTimeout(() => {
      this.afterRender()
    }, 10)
    return (
      <Div parent={this.props.parent} name="root-container">
        <Columns name="root-columns">
          <Column width="50%">
            <Maximize>
              <Rows>
                <Row height="70%">
                  <box
                    {...transparentBox()}
                    focusable={true}
                    ref={React.createRef<Box>(c => (this.editorContainer = c))}
                  />
                </Row>
                <Row height="30%">
                  <TabPanel
                    {...transparentBox()}
                    ref={React.createRef<TabPanel>(c => (this.outputPanel = c))}
                    updateScreenOnChange={true}
                    activeStyle={{ ...focusableOpts().style.selected }}
                    inactiveStyle={{ ...focusableOpts().style.item }}>
                    <Tab active={true}>
                      <TabLabel {...focusableOpts()} border={undefined}>
                        - Logs -
                      </TabLabel>
                      <TabBody {...transparentBox()}>
                        <box
                          {...focusableOpts()}
                          {...transparentBox()}
                          scrollable={true}
                          scrollbar={{ inverse: true }}
                          ref={React.createRef<Box>(c => (this.logEl = c))}
                        />
                      </TabBody>
                      {}
                    </Tab>
                    <Tab>
                      <TabLabel {...focusableOpts()} border={undefined}>
                        - Errors -
                      </TabLabel>
                      <TabBody {...transparentBox()}>
                        <box
                          {...focusableOpts()}
                          {...transparentBox()}
                          scrollable={true}
                          scrollbar={{ inverse: true }}
                          ref={React.createRef<Box>(c => (this.errorsEl = c))}
                        />
                      </TabBody>
                      {}
                    </Tab>
                    {}
                  </TabPanel>
                </Row>
                {}
              </Rows>
            </Maximize>
          </Column>
          <Column width="50%">
            <Rows>
              <Row height="70%">
                {/* <box> */}
                <Maximize>
                  <box
                    {...focusableOpts()}
                    {...transparentBox()}
                    scrollable={true}
                    scrollbar={{ inverse: true }}
                    label="Output"
                    border="line"
                    ref={React.createRef<Box>(c => (this.outputEl = c))}
                  />
                </Maximize>
              </Row>
              <Row height="30%">
                <button
                  {...focusableOpts()}
                  name="execute-button"
                  // content={' \u23ef  Execute '}
                  content={'Execute'}
                  onPress={e => this.dispatch(Action.Execute)}
                />
                <button
                  {...focusableOpts()}
                  name="exit-button"
                  content={'Exit'}
                  // content={' \u26d4 Exit '}
                  onPress={e => this.dispatch(Action.Exit)}
                />
                <button
                  {...focusableOpts()}
                  name="help-button"
                  content={'Help'}
                  onPress={e => this.dispatch(Action.Help)}
                />
                <button
                  {...focusableOpts()}
                  name="editor-settings-button"
                  content={'Editor Settings'}
                  onPress={e => this.dispatch(Action.Settings)}
                />
                <Br />
                <checkbox
                  {...focusableOpts()}
                  border={undefined}
                  checked={this.state.cleanOutputBeforeExecute}
                  content="clear before execute?"
                  onChange={e => this.setState({ cleanOutputBeforeExecute: e.value })}
                />
                <checkbox
                  {...focusableOpts()}
                  border={undefined}
                  checked={this.state.autoExecute}
                  content="auto execute?"
                  onChange={e => this.setState({ autoExecute: e.value })}
                />
                <Br />
                <Select
                  label="Examples"
                  scrollable={true}
                  {...focusableOpts()}
                  height={8}
                  onSelect={e => this.setExample(e.value)}>
                  {examples.map(e => (
                    <SelectOption>{e.name}</SelectOption>
                  ))}
                  {}
                </Select>
                {/* <Br />
                <AutoComplete
                  height={5}
                  {...focusableOpts()}
                  onChange={e => this.dispatch(e.value)}
                  options={enumKeys(Action)}
                /> */}
              </Row>
              {}
            </Rows>
          </Column>
          {}
        </Columns>
        {/* <layout width={this.props.parent.screen.width} height={this.props.parent.screen.height} hidden={true}>
        <box  ref={React.createRef<Box>(c=>this.settingsEditorContainer = c)}></box>
        <Br/>
        <Button2 onClick={e=>{}}>Cancel</Button2>
        <Button2 onClick={e=>{}}>Save</Button2>
        </layout> */}
      </Div>
    )
  }

  // showSettingsEditor(){
  //   // if(!this.settingsEditor){
  //   //   this.settingsEditor = buildEditor({
  //   //    ...options,
  //   //   //  parent: this.settingsEditorContainer
  //   //   })
  //   // }
  //   // this.settingsEditorContainer.show()
  //   // this.screen.render()
  // }

  editorSettingsModal(props: { onSave: () => void }) {
    showInModal(
      this.screen,
      React.render(
        <Div>
          <box height="80%" ref={React.createRef<Box>(c => (this.settingsEditorContainer = c))} />
          {/* <Div> */}
          <Br />
          <Button2
            {...focusableOpts()}
            onClick={e => {
              props.onSave()
              closeModal(this.screen)
            }}>
            Save (restart required)
          </Button2>
          <Button2
            {...focusableOpts()}
            onClick={e => {
              closeModal(this.screen)
            }}>
            Cancel
          </Button2>
          {/* </Div> */}
        </Div>
      ),
      'Editor Settings',
      '90%',
      '90%'
    )
  }
}

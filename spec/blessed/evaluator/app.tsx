import { enumKeys } from 'misc-utils-of-mine-generic'
import {
  AutoComplete,
  Box,
  Br,
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
  TabPanel
} from '../../../src'
import { Action, BaseApp, focusableOpts, toggleMaximized } from './baseApp'
import { examples } from './examples'

/**
 * Adds the UI to the base app
 */
export class App extends BaseApp {
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
      <Div parent={this.props.parent}>
        <Columns>
          <Column width="50%">
            <Rows>
              <Row height="60%">
                <box
                  width="100%"
                  height="100%"
                  focusable={true}
                  ref={React.createRef<Box>(c => (this.editorContainer = c))}>
                  <button
                    {...focusableOpts()}
                    top={0}
                    height={3}
                    width={'Maximize editor'.length + 6}
                    label={undefined}
                    right={0}
                    content="Maximize editor"
                    onPress={e => {
                      toggleMaximized(this.editorContainer, e.currentTarget, 'editor')
                    }}
                  />
                </box>
                <Br />
              </Row>
              <Row height="40%">
                <button
                  {...focusableOpts()}
                  name="execute-button"
                  content="Execute"
                  onPress={e => this.dispatch(Action.Execute)}
                />
                <button
                  {...focusableOpts()}
                  name="exit-button"
                  content="Exit"
                  onPress={e => this.dispatch(Action.Exit)}
                />
                <button
                  {...focusableOpts()}
                  name="help-button"
                  content="Help"
                  onPress={e => this.dispatch(Action.Help)}
                />
                <checkbox
                  {...focusableOpts()}
                  content="clear output before execute?"
                  onChange={e => this.setState({ cleanOutputBeforeExecute: e.value })}
                />
                <Br />
                <Select
                  border="line"
                  label="Examples"
                  {...focusableOpts()}
                  height={8}
                  onSelect={e => this.setExample(e.value)}>
                  {examples.map(e => (
                    <SelectOption>{e.name}</SelectOption>
                  ))}
                  <SelectOption>Dummy</SelectOption>
                  {}
                </Select>
                <Br />
                <Br />
                <Br />
                <AutoComplete
                  height={5}
                  {...focusableOpts()}
                  onChange={e => this.dispatch(e.value)}
                  options={enumKeys(Action)}
                />
              </Row>
              {}
            </Rows>
          </Column>
          <Column width="50%">
            <Rows>
              <Row height="70%">
                <box
                  {...focusableOpts()}
                  scrollable={true}
                  width="100%"
                  height="100%"
                  label="Output"
                  border="line"
                  ref={React.createRef<Box>(c => (this.outputEl = c))}
                />
              </Row>
              <Row height="30%">
                <TabPanel ref={React.createRef<TabPanel>(c => (this.outputPanel = c))}>
                  <Tab active={true}>
                    <TabLabel {...focusableOpts()}>Log</TabLabel>
                    <TabBody>
                      <box
                        width="100%"
                        height="100%"
                        label="Log"
                        border="line"
                        ref={React.createRef<Box>(c => (this.logEl = c))}
                      />
                    </TabBody>
                    {}
                  </Tab>
                  <Tab>
                    <TabLabel {...focusableOpts()}>Errors</TabLabel>
                    <TabBody>
                      <box
                        width="100%"
                        height="100%"
                        label="Errors"
                        border="line"
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
          </Column>
          {}
        </Columns>
      </Div>
    )
  }
}

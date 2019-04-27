// import { Box, installExitKeys, isElement, Div, React, Screen, prompt, Columns, Column, createScreen, Element, Br, Rows, Row, Component, TextareaOptions, debug, Textarea } from '../../../src';
// import { inspect } from 'util';
// import { waitFor } from '../../../src/blessed/waitFor';
// import * as accursed from '../../../src';
// import { TODO } from 'misc-utils-of-mine-typescript';
// import { EventEmitter } from 'events';
// const Editor = require('editor-widget')
// var Point = require('text-buffer/lib/point');
// var Range = require('text-buffer/lib/range');

// const focusableOpts: () => TextareaOptions = () => ({
//   mouse: true,
//   keys: true,
//   focusable: true,
//   clickable: true,
//   input: true,
//   keyable: true,
//   border: 'line',
//   style: {
//     bg: 'gray',
//     fg: 'white',
//     border: {
//       type: 'line',
//       fg: 'cyan'
//     },
//     focus: {
//       bg: 'lightgray',
//       fg: 'black',
//       border: {
//         fg: 'red'
//       }
//     },
//   }
// })
// interface P {
//   parent: Screen
// }
// class App extends Component<P> {
//   outputEl: Box;
//   editor: IEditor;
//   logEl: Box;
//   editorContainer: Box;
//   render() {
//     setTimeout(() => {
//       this.afterRender()
//     }, 10);
//     return <Div parent={this.props.parent}>
//       <Columns>
//         <Column width="50%">
//           <Rows>
//             <Row height="60%">
//               <box width="100%" height="100%" label="Core editor" border="line" focusable={true} ref={React.createRef<Box>(c => this.editorContainer = c)}></box>
//               Code Editor<Br />
//             </Row>
//             <Row height="40%">
//               Actions<Br />
//               <button {...focusableOpts()} name="execute-button" content="Execute" onPress={e => this.execute()}></button>
//               <button {...focusableOpts()} name="exit-button" content="Exit" onPress={e => this.exit()}></button>
//               <button {...focusableOpts()} name="help-button" content="Help" onPress={e => this.help()}></button>

//             </Row>{}
//           </Rows>
//         </Column>
//         <Column width="50%">
//           <Rows>
//             <Row height="60%">
//               <box width="100%" height="100%" label="Output" border="line" ref={React.createRef<Box>(c => this.outputEl = c)}></box>
//             </Row>
//             <Row height="40%">
//               <box width="100%" height="100%" label="Log" border="line" ref={React.createRef<Box>(c => this.logEl = c)}></box>
//             </Row>{}
//           </Rows>
//         </Column>
//         {}
//       </Columns>
//     </Div>
//   }
//   exit(): void {
//       this.screen.destroy()
//       process.exit(0)
//   }
//   execute(): void {
//     const _log = []
//     const options = { // DONT REMOVE: will be evaluated!
//       parent: this.outputEl,
//       accursed,
//       log(...args: any[]) {
//         _log.push(...args.map(a => inspect(a)))
//       }
//     }
//     const text = this.editor.textBuf.getText()
//     const code = `
//     (
//     ${text}
//     )(options)`
//     try {
//       eval(code)
//     } catch (error) {
//       debug(error)
//     }
//   }
//   async afterRender() {
//     await waitFor(() => this.editorContainer)

//     const executeButton = this.findDescendant(b => isElement(b) && b.type === 'button' && b.name === 'execute-button')
//     executeButton.focus()
//     this.editor = new Editor({
//       parent: this.editorContainer,
//       ...focusableOpts(),
//       top: 0,
//       left: 0,
//       width: '95%',
//       height: '95%',
//       keys: true,
//       keyable: true,

//     })

//     this.editor.textBuf.setText(examples[0].code)
//     this.editor.language('js')
//     this.editor.once('focus', e => {

//       this.editor.indent(new Range(new Point(Infinity, Infinity), new Point(Infinity, Infinity)))
//     })
//     this.editorContainer.screen.render()
//   }
// }

// interface Range {

// }
// interface IEditor extends EventEmitter {
//   focus(): void
//   indent(range: Range): void
//   buffer: Element
//   render(): void
//   append(text: string, options?: TODO): TODO
//   _updateCursor(): void
//   _updateContent(): void
//   setLanguageMode(opts: { getLanguageId: () => string }): void
//   open(p: string): Promise<IEditor>
//   save(p: string): Promise<string>
//   undo(options: TODO): TODO
//   redo(options: TODO): TODO
//   textBuf: TextBuffer
//   copy: TODO
//   paste: TODO
//   toggleInsertMode(): void

//   language(s: string): void
//   selection: TODO
// }
// /** */
// interface TextBuffer extends EventEmitter {
//   emitDidChangeTextEvent(...args: TODO): TODO
//   getText(): string
//   emitWillChangeTextEvent(): void
//   setText(s: string): void
//   // buffer1.onDidChange(({changes}) => {
//   //   for (const {oldRange, newText} of changes.reverse()) {
//   //     buffer2.setTextInRange(oldRange, newText)
//   //   }
//   // })

//   //   .getTextInRange({
//   //   start: new Point(scroll.row, 0),
//   //   end: scroll.translate(size)
//   // })))
// }
// const examples = [
//   {
//     name: 'simple1',
//     code: `
// function simple1(options) {
//   options.log('starting')
//   options.parent.children.forEach(c => {
//     c.detach();
//     c.destroy()
//   })
//   const b = options.accursed.box({
//     parent: options.parent,
//     content: 'hello world',
//     height: 2, width: 6, top: 0, left: 0,
//     style: {
//       bg: 'red'
//     }
//   })
//   const timer = setInterval(() => {
//     b.top++
//     b.left++
//     options.parent.screen.render()
//     if (b.top > options.parent.height - b.height ||
//       b.left > options.parent.width - b.width) {
//       clearInterval(timer)
//     }
//   }, 100)
//   options.parent.screen.render()
// }
//     `.trim()
//   }
// ]



// function start() {
//   try {
//     var screen = createScreen({
//       // sendFocus: true, 
//       smartCSR: true,
//       title: 'editor-widget example'
//       // , focusable: true,
//       // tput: true
//     })
//     // installExitKeys(screen)
//     // screen.key(['esc'], function (ch, key) {
//     //   screen.destroy()
//     //   process.exit(0)
//     // })
//     screen.key('C-right', k => screen.focusNext())
//     screen.key('C-left', k => screen.focusPrevious())
//     // main(screen)
//     const app = React.render(<App parent={screen}></App>)
//     // screen.append(app)
//     // screen.focusNext()
//     // screen.render()
//     screen.render()
//   } catch (error) {
//     debug(error)

//   }
// }
// start()



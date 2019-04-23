import { tryTo } from 'misc-utils-of-mine-generic'
import { AutoComplete, createScreen, debug, Div, getContent, installExitKeys, React, Screen } from '../src'
import { waitFor } from '../src/blessed/waitFor'

describe('autoComplete', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })
  it('should render', async done => {
    try {
      screen = createScreen({ smartCSR: true, log: 'log.txt', grabKeys: false, focusable: true, sendFocus: true })
      installExitKeys(screen)
      const options = ['asdn', 'asdr', 'asdf', 'sdf', 'dfg', 'dfg', 'ppp', 'poi']
      const el = React.render(
        <Div parent={screen}>
          <AutoComplete
            inputOptions={{
              value: 'as',
              focused: true,
              inputOnFocus: true
            }}
            value="as"
            options={options}
          />
        </Div>
      )

      screen.render()
      screen.key('tab', k => {
        screen.focusNext()
        screen.render()
      })
      screen.key('S-tab', k => {
        screen.focusPrevious()
        screen.render()
      })
      await waitFor(() => getContent(el).includes('as'))
      // TODO: test interaction
      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })
})

// interface P extends TextboxOptions {
//   options: string[]
//   inputOptions?: TextboxOptions
//   listOptions?: ListOptions
// }

// class AutoComplete extends Component<P> {
//   protected options: string[];
//   constructor(p: P, s: {}) {
//     super(p, s)
//     this.options = this.props.options
//   }
//   setOptions(options: string[]) {
//     this.options = options
//   }
//   render() {
//     const listRef = React.createRef<List>()
//     return (
//       <Div {...this.props}>
//         <textbox
//           hoverText="arrows to autocomplete"
//           width={12}
//           border='line'
//           style={{ focus: { fg: 'white', bg: 'darkgray' } }}
//           focusable={true}
//           focused={true}
//           clickable={true}
//           keys={true}
//           mouse={true}
//           keyable={true}
//           {...this.props.inputOptions || {}}
//           onKeyPress={e => {
//             setTimeout(() => {
//               const list = listRef.current!
//               const input = e.currentTarget
//               if (input!._reading && list.hidden) {
//                 list.show()
//                 if (typeof list.selected === 'undefined' && list.items.length) {
//                   list.select(0)
//                 }
//               }
//               if (!input!._reading && !list.hidden) {
//                 list.hide()
//               }
//               const value = input.getContent()
//               if (e.key.name === 'up') {
//                 list.select(list.selected! > 0 ? list.selected! - 1 : list.items.length - 1)
//                 input.setValue(list.getItem(list.selected!) && list.getItem(list.selected!).getContent())
//               }
//               else if (e.key.name === 'down') {
//                 list.select(list.selected! < list.items.length! - 1 ? list.selected! + 1 : 0)
//                 input.setValue(list.getItem(list.selected!) && list.getItem(list.selected!).getContent())
//               }
//               else {
//                 const items = value.trim() ? this.options.filter(o => o.toLowerCase().includes(value.trim().toLowerCase())) : this.options
//                 list.setItems(items)
//               }
//               input.screen.render()
//             }, 10);
//           }}
//         />
//         <Br />
//         <list
//           hidden={true}
//           width={12}
//           height={7}
//           style={{ fg: 'white', bg: 'darkgray', item: { fg: 'white', bg: 'darkgray' }, selected: { bg: 'blue' } }}
//           items={this.options}
//           {...this.props.listOptions || {}}
//           ref={listRef}
//         />
//       </Div>
//     )
//   }
// }

// // jasmine.
// it('should render', async done => {
//   try {
//     screen = createScreen({ smartCSR: true, log: 'log.txt',grabKeys: false, focusable: true, sendFocus: true })
//     installExitKeys(screen)
//     const textRef = React.createRef<Text>()
//     const inputRef = React.createRef<Textbox>()
//     const listRef = React.createRef<List>()

//     const options = [
//       'asdn', 'asdr', 'asdf', 'sdf', 'dfg', 'dfg', 'ppp' ,'poi'
//     ]

//     React.render(
//       <Div parent={screen}>
//         asdasd
//         <Br />
//         hello qoellskdjf
//         <Br />

//         <textbox
//           value="fff"
//           ref={inputRef}
//           {...{
//             width: 14,
//             focusable: true,
//             focused: true,
//             clickable: true,
//             keys: true,
//             mouse: true,
//             keyable: true,
//             border: 'line'
//           }}
//           label="filter"
//           style={{ focus: { fg: 'magenta', bg: 'cyan' } }}
//           // input={true}
//           // on={['key', (ch:any, key:IKeyEventArg)=>{
//           //   debug(key)
//           // }]}
//           //@ts-ignore
//           // on={[['focus', 'blur'], (e:any)=>{
//           //   debug(e)
//           // }]}
//           // on={['focus', (e:any)=>{

//           // }]}

//           onKeyPress={e => {
//             setTimeout(() => {
//               const list = listRef.current!
//               if(e.currentTarget!._reading && list.hidden){
//                 list.show()
//                 if(typeof list.selected==='undefined' && list.items.length){
//                   list.select(0)
//                 }
//               }
//               if(!e.currentTarget!._reading&&!list.hidden){
//                 list.hide()
//               }
//               // if(e.currentTarget.screen.focused===e.currentTarget) {
//                 let value = e.currentTarget.getContent()
//                 // let value =  e.currentTarget.getLines().join('')//e.currentTarget.getValue()
//                 // if(Keys.name==='backspace'){
//                 //   value = value.slice(0, value.length-1)
//                 // }
//                 //TODO: supr
//                 // if(e.ch){// && !e.key.ctrl&&!e.key.alt )
//                 // value =value+ e.ch
//                 // if(e.key.name==='up' || e.key.name==='down'){
//                   // value = value.slice(0, value.length-1)

//                   if(e.key.name==='up'){
//                     list.select(list.selected!>0 ? list.selected! -1 : list.items.length-1)
//                     e.currentTarget.setValue(list.getItem(list.selected!)&&list.getItem(list.selected!).getContent())
//                     // list.hide()
//                   }
//                   else if(e.key.name==='down') {
//                     list.select(list.selected! <list.items.length!-1 ?  list.selected! +1 : 0)
//                     e.currentTarget.setValue(list.getItem(list.selected!)&&list.getItem(list.selected!).getContent())
//                     // list.hide()
//                   }
//                   else {
//                     const items = value.trim() ? options.filter(o=>o.toLowerCase().includes(value.trim().toLowerCase())): options
//                   list.setItems(items)
//                   }

//                   // else if(e.key.name==='tab' && e.currentTarget._reading && typeof list.selected!!=='undefined') {
//                   //   e.currentTarget.setValue(list.getItem(list.selected!).getContent())
//                   // }

//                   // if(e.key.shift){
//                   //   list.select(list.selected!>0 ? list.selected! -1 : list.items.length-1)
//                   // }
//                   // else {
//                   //   list.select(list.selected! <list.items.length!+1 ?  list.selected! -1 : 0)
//                   // }
//                 //   e.currentTarget._done&&e.currentTarget._done(undefined, value)
//                 // }
//                 //  textRef.current!.content = '*'+value+'+'+e.key.name+'*'//options.filter(o=>o.includes(value)).join(', ')

//                   // debug(items)
//                   screen.render()
//                   // textRef.current!.content=e.currentTarget.content//e.currentTarget.getValue()+'-'+e.ch +' - '+JSON.stringify(e.key)
//                 // }
//               // }

//             // debug(e.currentTarget.getContent(), e.currentTarget.getScreenLines())
//             }, 10);

//           }}
//         />
//         <Br />

//         <list
//           style={{ focus: { fg: 'magenta', bg: 'cyan' }, items: {bg: 'red'}, selected: {bg: 'blue'} }}
//           width={14}
//           height={12}
//           hidden={true}
//           ref={listRef}
//           items={options}>
//           </list>
//           <Br/>
//         <text
//           ref={textRef}
//           {...{
//             content: 'text'
//           }}
//         />

//         <button
//           style={{ focus: { fg: 'magenta', bg: 'cyan' } }}
//           width={14}
//           height={12}
//           {...{
//             label: 'list',
//             border: 'line',
//           focusable: true,
//           clickable: true,
//           keys: true,
//           mouse: true,
//           keyable: true,
//         }}
//         content="click1"
//           />

//           <Br/>
//         <text
//           ref={textRef}
//           {...{
//             content: 'text'
//           }}
//         />

//       </Div>
//     )

//     // inputRef.current!.on('focus', e=>debug('focus', listRef.current!.show()))
//     // inputRef.current!.on('blur', e=>debug('blur', listRef.current!.hide()))

//     // screen.on    ('key', (ch, key)=>{
//     //   debug(key)
//     //   textRef.current!.content='screen:'+JSON.stringify(key||{})
//     //   screen.render()
//     // })
//     screen.render()

//     screen.key('tab', k => {
//       screen.focusNext()
//       screen.render()
//     })
//     screen.key('S-tab', k => {
//       screen.focusPrevious()
//       screen.render()
//     })
//       // await waitFor(() => getContent(treeRef.current!).includes('n1'))
//     // expect(getContent(treeRef.current!)).toContain('n2')
//     // expect(getContent(treeRef.current!)).not.toContain('n11')

//     // TODO: press space to verify it expand

//     // screen.program.write(' ')
//     // screen.emit('key', undefined, {name: 'space'})

//     // debug(getContent(tree))

//     // done()
//   } catch (error) {
//     debug('ERROR', error)
//   }
// })

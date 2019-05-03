// describe('tabPanelComponent', () => {
//   fit('', ()=>{
// var a = <box><text>asdasd</text>123123<text></text></box>
//    const c =  React.render(a)
//    console.log(c);

//   })
//   // let screen: Screen
//   // afterEach(() => {
//   //   tryTo(() => screen.destroy())
//   // })
//   // beforeEach(() => {
//   //   screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true, focusable: true })
//   //   installExitKeys(screen)
//   //   screen.key('tab', k => screen.focusNext())
//   //   screen.key('S-tab', k => screen.focusPrevious())
//   // })
//   // // jasmine.DEFAULT_TIMEOUT_INTERVAL = 99999

//   // it('should render labels and body', async done => {
//   //   try {

//   //     screen.render()

//   //     const t1 = (
//   //       <Div parent={screen}>
//   //         <TabPanel activeTab={{ fg: 'red', underline: true }} inactiveTab={{ fg: 'blue', underline: false }}>
//   //           <Tab active={true}>
//   //             <TabLabel style={{ focus: { bg: 'yellow' } }}>tab 1</TabLabel>
//   //             <TabBody>
//   //               body1
//   //               {words().join(' ')}
//   //               <Br />
//   //               <button content={string()} border="line" focusable={true} /> <Br />
//   //               {words().join(' ')}
//   //               <Br />
//   //               <button content="button1" border="line" focusable={true} /> <Br />
//   //               {words().join(' ')}
//   //             </TabBody>
//   //             {}
//   //           </Tab>
//   //           <Tab>
//   //             <TabLabel style={{ focus: { bg: 'yellow' } }}>tab 2</TabLabel>
//   //             <TabBody>
//   //               body2
//   //               {words().join(' ')}
//   //               <Br />
//   //               <button content={string()} border="line" /> <Br />
//   //               {words().join(' ')}
//   //               <Br />
//   //               <button content="button2" border="line" /> <Br />
//   //               {words().join(' ')}
//   //             </TabBody>
//   //             {}
//   //           </Tab>
//   //           {}
//   //         </TabPanel>
//   //       </Div>
//   //     )

//   //     // function isProgram(a: any): a is Program {
//   //     //   return a && a.type === 'program' && a.sendDeviceAttributes //;Program.prototype.restoreReportedCursor
//   //     // }

//   //     // function isNodeConstructor(a: any) {
//   //     //   return a && a.prototype.__proto__ === blessed.widget.Node.prototype;
//   //     // }

//   //     const ass = <Div parent={screen} name="0">
//   //     <Rows name="1"    > <Row name="2">
//   //     <button name="3" onClick={e => { }}>
//   //     </button>alkjsdasd</Row>{}</Rows>
//   //     </Div>

//   //     // function providerHack() {
//   //     //   //@ts-ignore
//   //     //   const f = React._intrinsicElementFactory
//   //     //   //@ts-ignore
//   //     //   const all = Object.values(f).map(v=>v && v.prototype).filter((v, i, a)=>v && v.type && a.indexOf(v)===i)

//   //     // //  l(Object.keys(f))

//   //     // //  l(Object.keys(f).map(i=>`${i}: ${f[i] instanceof blessed.widget.Node}`))

//   //     // debugger
//   //     // }

//   //     const el = React.render(t1)
//   //     screen.append(el)
//   //     screen.render()
//   //     screenLogger(screen).log('test')
//   //     // const l = screenLogger(screen).log
//   //     await waitFor(() => printElement(el).includes('tab 1'))

//   //     // providerHack()

//   //     // expect(printElement(el)).toContain('body1')
//   //     // expect(printElement(el)).toContain('tab 2')
//   //     // expect(printElement(el)).toContain('button1')
//   //     // expect(printElement(el)).not.toContain('body2')

//   //     // done()
//   //   } catch (error) {
//   //     debug('ERROR', error)
//   //   }
//   // })

// })

// let screen:any
// try {

// screen = createScreen({  })
//     installExitKeys(screen)
// var a = <box><text>asdasd</text>123123<text></text></box>
//    const c =  React.render(a)

//    screen.append(React.render(a))
//    debug(getContent(c));
// } catch (error) {
//   debug(error)
//   screen.destroy()
//   process.exit(0)
// }

// // Calls the children callback numTimes to produce a repeated component
// function Repeat(props) {
//   let items = [];
//   for (let i = 0; i < props.numTimes; i++) {
//     items.push(props.children(i));
//   }
//   return <div>{items}</div>;
// }

// function ListOfTenThings() {
//   return (
//     <Repeat numTimes={10}>
//       {(index) => <div key={index}>This is item {index} in the list</div>}
//     </Repeat>
//   );
// }

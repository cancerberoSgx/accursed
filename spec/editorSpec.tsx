// import { sleep, tryTo } from 'misc-utils-of-mine-generic'
// import { Column, Columns, createScreen, printElement, React, Row, Rows, Screen } from '../src'
// import { waitFor } from '../src/blessed/waitFor'
// import {} from '../src/jsx-components'

// describe('editor', () => {
//   let screen: Screen
//   afterEach(() => {
//     tryTo(() => screen.destroy())
//   })
//   beforeEach(() => {
//     tryTo(() => screen.destroy())
//     screen = createScreen({})
//     screen.key('C-q', k => {
//       screen.destroy()
//       process.exit(1)
//     })
//     screen.key('C-right', k => {
//       screen.focusNext()
//       screen.render()
//     })
//   })

//   describe('jsx', () => {
//     // jasmine.DEFAULT_TIMEOUT_INTERVAL=99999

//     it('dont need to pass parent', async done => {
//       const el = React.render(
//         <box>
//           <editor
//             text="function f(a){return a + 11}"
//             language="js"
//             {...{ bindings: { goLeftWord: ['C-u', 'C-left'] } }}
//           />
//         </box>
//       )
//       screen.render()
//       await sleep(100)
//       expect(printElement(screen)).not.toContain('function f(a)')
//       await sleep(100)
//       screen.append(el)
//       screen.render()
//       await waitFor(() => printElement(screen).includes('function f(a)'))
//       expect(printElement(el)).toContain('a + 11')
//       done()
//     })
//     it('dont need a container', async done => {
//       const el = React.render(<editor text={`a:hover { border: 2px solid pink; }`} language="css" />)
//       screen.render()
//       await sleep(100)
//       expect(printElement(screen)).not.toContain('border: 2px solid pink; }')
//       await sleep(100)
//       screen.append(el)
//       screen.render()
//       await waitFor(() => printElement(screen).includes('border: 2px solid pink; }'))
//       expect(printElement(el)).toContain('a:hover')
//       done()
//     })
//     it('multiple editors in same container', async done => {
//       const el = React.render(
//         <Columns>
//           <Column>
//             <Rows>
//               <Row>
//                 <editor text={`a:hover { border: 2px solid pink; }`} language="css" />
//               </Row>
//               <Row>
//                 <editor
//                   text={`
// # Welcome to Foo

// Dolor sit elit id **deserunt ullamco aute anim** fugiat sint Lorem enim voluptate qui dolore.

// ## Qui amet in irure quis irure ullamco Lorem.

// Ex deserunt do aliquip culpa *occaecat aute fugiat id ut nulla* duis eu nisi qui.

//  * Ullamco magna cupidatat dolore in.
//  * Sit sunt est velit ad commodo aliquip laborum excepteur
//  * Nulla aute dolore pariatur cupidatat.

// Minim amet tempor do exercitation ea consequat culpa eiusmod ut in. Eu velit id ipsum mollit:

// \`\`\`ts
// export function f(a: number){
//   return Math.round(a)+1
// }
// \`\`\`.trim()
// `}
//                   language="md"
//                 />
//               </Row>
//               {}
//             </Rows>
//           </Column>
//           <Column>
//             <Rows>
//               <Row>
//                 <editor text={`export function app(){ return 'hola' }`} language="js" />
//               </Row>
//               <Row>
//                 {' '}
//                 <editor text={`{"name": "foo", "version": "1.0.1"}`} language="json" />
//               </Row>
//               {}
//             </Rows>{' '}
//           </Column>
//           {}
//         </Columns>
//       )
//       screen.render()
//       await sleep(100)
//       expect(printElement(screen)).not.toContain('a:hover')
//       await sleep(100)
//       screen.append(el)
//       screen.render()
//       await waitFor(() => printElement(screen).includes('a:hover'))
//       const s = [
//         'deserunt ullamco aute anim',
//         'return Math.round(a)+1',
//         'a:hover { border: 2px solid pink; }',
//         `export function app(){ return 'hola' }`,
//         `{"name": "foo", "version": "1.0.1"}`
//       ]
//       s.forEach(c => expect(printElement(screen)).toContain(c))
//       done()
//     })
//   })
// })

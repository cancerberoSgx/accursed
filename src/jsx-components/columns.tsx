// // Columns
// // <div class="columns">
// //   <div class="column">
// //     First column
// //   </div>
// //   <div class="column">
// //     Second column
// //   </div>
// //   <div class="column">
// //     Third column
// //   </div>
// //   <div class="column">
// //     Fourth column
// //   </div>
// // </div>
// export namespace accursed {

//   interface ColumnsProps extends ColumnsleOptions {
//     // children: [Head, Body]
//     children: Column[]
//   }
//   interface ColumnsColumnProps extends Style {
//     style?: Style
//     children: ColumnsCell | ColumnsCell[]
//   }
//   interface ColumnsCellProps {
//     children: JSX.BlessedJsxText | JSX.BlessedJsxText[]
//   }
//   export class Column extends VirtualComponent<ColumnProps> {}

//   /**
//    * Examples

// Columns of same width:

// ```jsx
// <Columns border="line">
//   <Column bg='red'> column one <button content="asdas"></button> hello</Column>
//   <Column> column two <button content="asdas"></button> hello</Column>
//   <Column style={fg: 'blue'}> column three <button content="asdas"></button> hello</Column>
// </Columns>

// Columns of custom width:

// ```jsx
// <Columns border="line">
//   <Column bg='red' width="30%" > column one <button content="asdas"></button> hello</Column>
//   <Column> column two <button content="asdas"></button> hello</Column>
//   <Column style={fg: 'blue'} width="70%" > column three <button content="asdas"></button> hello</Column>
// </Columns>

// ```
//    */
//   export class Columns extends Component<ColumnsProps> {
//     _saveJSXChildrenProps = true
//     render() {
//       const childProps = getJSXChildrenProps(this)!
//       const ths = childProps.find(e => e.tagName === 'ColumnsHead')!.children.map(c => (c as any).children.join(' '))
//       const tds = childProps
//         .find(e => e.tagName === 'ColumnsBody')!
//         .children.filter(c => (c as any).tagName === 'ColumnsRow')
//         .map(c => (c as any).children.map((c: any) => c.children.join('')))
//       const headStyle = childProps.find(e => e.tagName === 'ColumnsHead')!.attrs || {}
//       const bodyStyle = childProps.find(e => e.tagName === 'ColumnsBody')!.attrs
//       // log(ths, tds, headStyle, bodyStyle)

//       return (
//         <Columns
//           {...this.props}
//           style={{
//             ...this.props.style,
//             header: { ...(this.props.style && this.props.style.header), ...headStyle },
//             cell: { ...(this.props.style && this.props.style.cell), ...bodyStyle }
//           }}
//           {...{ ...(this.props || {}), children: undefined }}
//           data={[ths, ...tds]}
//         />
//       )
//     }
//   }
// }

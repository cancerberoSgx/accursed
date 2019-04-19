// import { React } from '..'
// import { getJSXChildrenProps, VirtualComponent } from '../blessed/virtualElement'
// import { Component } from '../jsx/component'
// import { ListTableOptions, Style } from '../blessedTypes';

// export namespace accursed {

//   interface ListTabProps extends ListTableOptions {
//     // children: [Head, Body]
//     children: ListTabCommand[]
//   }
//   interface ListTabCommandProps extends Style {
//     style?: Style
//     children: ListTabCell | ListTabCell[]
//   }
//   interface ListTabRowProps {
//     children: ListTabCell | ListTabCell[]
//   }
//   interface ListTabBodyProps extends Style {
//     style?: Style
//     children: ListTabRowProps | ListTabRowProps[]
//   }
//   interface ListTabCellProps {
//     children: JSX.BlessedJsxText | JSX.BlessedJsxText[]
//   }
//   export class ListTabCommand extends VirtualComponent<ListTabCommandProps> {}

//   /**
//    * Example:
// ```jsx
// <ListTab>
//   <ListTabCommand onSelect={e=>{}}>Help</ListTabCommand>
// </ListTab>
// ```
//    */
//   export class ListTab extends Component<ListTabProps> {
//     _saveJSXChildrenProps = true
//     render() {
//       const childProps = getJSXChildrenProps(this)!
//       const ths = childProps.find(e => e.tagName === 'ListTabHead')!.children.map(c => (c as any).children.join(' '))
//       const tds = childProps
//         .find(e => e.tagName === 'ListTabBody')!
//         .children.filter(c => (c as any).tagName === 'ListTabRow')
//         .map(c => (c as any).children.map((c: any) => c.children.join('')))
//       const headStyle = childProps.find(e => e.tagName === 'ListTabHead')!.attrs || {}
//       const bodyStyle = childProps.find(e => e.tagName === 'ListTabBody')!.attrs
//       // log(ths, tds, headStyle, bodyStyle)

//       return (
//         <ListTab
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

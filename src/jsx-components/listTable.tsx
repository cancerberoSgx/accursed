import { React } from '..'
import { VirtualComponent, getJSXChildrenProps } from '../blessed/virtualElement';
import { Component } from '../jsx/component';
import { ListTableOptions, Style, Screen } from '../blessedTypes';
import { log } from '../util/logger';
import { Div } from './jsxUtil';
import { createScreen, installExitKeys } from '../blessed';
import { arr, string, number } from '../util/data';

interface ListTableProps extends ListTableOptions{
  // children: [Head, Body]
  children: (ListTableHead | ListTableBody)[]
}
interface ListTableHeadProps extends Style {
  style?: Style
  children: ListTableCell|ListTableCell[]
}
interface ListTableRowProps {
  children:  ListTableCell|ListTableCell[]
}
interface ListTableBodyProps extends Style {
  style?: Style
  children: ListTableRowProps | ListTableRowProps[] 
}
interface ListTableCellProps {
  children: JSX.BlessedJsxText |JSX.BlessedJsxText []
}
export class ListTableHead extends VirtualComponent<ListTableHeadProps> { }
export class ListTableRow extends VirtualComponent<ListTableRowProps> { }
export class ListTableBody extends VirtualComponent<ListTableBodyProps> { }
export class ListTableCell extends VirtualComponent<ListTableCellProps> { }

export class ListTable extends Component<ListTableProps> {
  _saveJSXChildrenProps = true
  render() {
    const childProps = getJSXChildrenProps(this)!
    const ths = childProps
      .find(e => e.tagName === 'ListTableHead')!.children
      .map(c => (c as any).children.join(' '))
    const tds = childProps
      .find(e => e.tagName === 'ListTableBody')!
      .children.filter(c => (c as any).tagName === 'ListTableRow')
      .map(c => (c as any).children
        .map((c: any) => c.children.join('')))
    const headStyle =  childProps
    .find(e => e.tagName === 'ListTableHead')!.attrs || {}
    const bodyStyle =  childProps
    .find(e => e.tagName === 'ListTableBody')!.attrs

    // log(ths, tds, headStyle, bodyStyle)

    return (<listtable {...this.props} style={{...this.props.style, header: {...(this.props.style&&this.props.style.header), ...headStyle}, cell: {...(this.props.style&&this.props.style.cell), ...bodyStyle}}}
      {...{ ...this.props || {}, children: undefined }}
      data={[ths, ...tds]}
    />
    )
  }
}

// function test(){

//   let screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
//   installExitKeys(screen)

//   const data = arr(20).map(i=>([string(), number()]))

//   const t1 = <Div>
//   <ListTable>
//  <ListTableHead fg="red">
//    <ListTableCell>Name1</ListTableCell><ListTableCell>Phone</ListTableCell>
//    {}</ListTableHead>
//  <ListTableBody fg="green">
//    <ListTableRow><ListTableCell>hello</ListTableCell><ListTableCell>world</ListTableCell>{}</ListTableRow>
//    <ListTableRow><ListTableCell>hello2</ListTableCell><ListTableCell>world2</ListTableCell>{}</ListTableRow>
//    {data.map(d=>
//    <ListTableRow><ListTableCell>{d[0]}</ListTableCell><ListTableCell>{d[1]}</ListTableCell>{}</ListTableRow>)}
//  {}</ListTableBody>
//  {}</ListTable>
// </Div>
// screen.append(React.render(t1))
// screen.render()
// }
// test()



// class Head extends VirtualComponent<HeadProps> {}
// class Body extends VirtualComponent<TabBlocksProps> {}
// class TabBlock extends VirtualComponent<TabBlockProps> {}
// class Cell extends VirtualComponent<CellProps> {}

// // component Props, . where the semantics / API is really defined (validated)
// interface TabPanelProps {
//   /** Only must contain only TabHeadings and  TabBlocks children,and only one of each. */
//   // children: (Head | Body)[]
//   children: (Head | Body)[]
// }
// /** only alows  TabBlock there must be  */
// interface TabBlocksProps {
//   children: JSX.BlessedJsxNode | TabBlock[]
// }
// interface TabBlockProps {
//   id: string
//   children: JSX.BlessedJsxNode
// }
// interface HeadProps {
//   children:  Cell[]
// }
// /** inner text is mandatory and only text. id attr is mandatory. */
// interface CellProps {
//   // active?: boolean
//   // focus?: boolean
//   // id: string
//   children: JSX.BlessedJsxNode
// }
// class TabPanel extends Component<TabPanelProps> {
//   render() {
//     return (
//       <Div>
//         Welcome to the soper heroe store, use the tabs below to focus on special super powers.
//         <listbar commands={[]} />
//         <Div />
//       </Div>
//     )
//   }
// }

// const UserApp2 = (
//   <Div>
//     Welcome to the soper heroe store, use the tabs below to focus on special super powers. Here we are inside real
//     blessed components, container box for exampe. But below (TabPanel> are virtual components that won't be
//     rendered at all. Probably other elements wil be rendered instead
//     <TabPanel>
//       <Head>
//         <Cell>
//           Removint this text gives an error
//         </Cell>
//         <Cell>Ttiel1 </Cell>
//         {}

      
//       </Head>
//       <Body>
//         <TabBlock id="12"> blocks must have text and can contain any other kind of element</TabBlock>
//         There cannot be any element besides text between blocks so uncomenting the follwoiing gives
//         {/* <button content=""incalud></button> */}
//         <TabBlock id="2">id is mandatory</TabBlock>
//       </Body>
//       >
//       {/* There cannot be text between TabBlocks and TabPanel asd123 123 
//       un commenting this text gives error*/}
//     </TabPanel>
//   </Div>
// )

import { React } from '..'
import { getJSXChildrenProps, VirtualComponent, isElementData } from '../blessed/virtualElement'
import { Component } from '../jsx/component'
import {  Style, BoxOptions, Element, isElement } from '../blessedTypes';
import { Div, Br } from './jsxUtil';
import { createScreen, installExitKeys } from '../blessed';
import { log } from '../util/logger';

export class TabLabel extends VirtualComponent<TabLabelProps> {}
export class Tab extends VirtualComponent<TabProps> {}
export class TabBody extends VirtualComponent<TabBodyProps> {}

interface ChangeEvent {
  activeTab: number
}
interface TabPanelProps extends BoxOptions {
  children: (Tab)[]
  onChange?: (e: ChangeEvent)=>void
}
interface TabLabelProps {
  children: JSX.BlessedJsxText
}
interface TabBodyProps {
  children: JSX.BlessedJsxNode
}
interface TabProps {  
  active?: boolean
  children: (TabBody | TabLabel)[]
}

export class TabPanel extends Component<TabPanelProps> {
    _saveJSXChildrenProps = true
  render() {
      const childProps = getJSXChildrenProps(this)!
      const tabsData = childProps.filter(c=>c.tagName==='Tab')
      const tabs = tabsData.map((tabData, i)=>{
        const bodyData = tabData.children.filter(isElementData).find(c=>c.tagName==='TabBody')!
        const labelData = tabData.children.filter(isElementData).find(c=>c.tagName==='TabLabel')!
        const counter = i
        const body = <Div hidden={tabData.attrs && !tabData.attrs.active} name={'tab_body_'+counter}>{...bodyData.children}</Div>
        const label = <button border="line" content={labelData.children.join(' ' )} onClick={e=>this.selectTabNamed(e.currentTarget.name)} name={'tab_label_'+counter} ></button>
        const tab =  {body, label}
        return tab
      })
    return (
      <Div> 
        {...tabs.map(t=>t.label)}
        <Br/>
        {...tabs.map(t=>t.body)}
      </Div>
    )
  }
  protected selectTabNamed(tabName: String) {
    if(tabName.startsWith('tab_label_')){
      const id = parseInt(tabName.substring('tab_label_'.length))
      if(id!==NaN) {
        this.selectTab(id);
      }
    }
  }

  selectTab(tabIndex: number) {
    this.filterDescendants(d => isElement(d) && !!d.name && d.name.startsWith('tab_body_')).forEach(body => {
      if (body.name !== 'tab_body_' + tabIndex) {
        body.hide();
        log('body hide()', body.name);
      }
      else {
        log('body show()', body.name);
        body.show();
      }
    });
    this.blessedElement.screen.render();
    this.props.onChange && this.props.onChange({ activeTab: tabIndex });
  }
  
}

// function test(){
//   try {
//   const   screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
//     installExitKeys(screen)

//     // const data = [...arr(20).map(i => [string(), number()]), ['last3', 'lastNumber3']]
//     const t1 = (
//       <Div parent={screen}>
//       {/* elcome to the soper  */}
//         <TabPanel>
//       <Tab active={true}>
//         <TabLabel>tab 1</TabLabel>
//         <TabBody>
//          body1
//           {/* <button content="sldhfjdh"></button> */}
//         </TabBody>
//       {}</Tab>
//       <Tab>
//         <TabLabel>tab 2</TabLabel>
//         <TabBody>
//           body2
//          {/* asdasd <button content="aasdasdasd"></button>asdasd */}
//         </TabBody>
//       {}</Tab>
//           {}
//         </TabPanel>
//         {/* heroe store, use the tabs below to focus on special super powers. */}
//       </Div>
//     )

//     const el = React.render(t1)
//     screen.append(el)
//     screen.render()

//     // waitFor(() => getContent(el).includes('Name'))
//     // expect(getContent(el)).toContain('world2')
//     // expect(getContent(el)).toContain('lastNumber3')
//     // done()
//   } catch (error) {
//     log('ERROR', error)
//   }
// }

// test()
// }
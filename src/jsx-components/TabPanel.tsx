import { React } from '..'
import { findDescendant } from '../blessed'
import { getJSXChildrenProps, isElementData, VirtualComponent } from '../blessed/virtualElement'
import { BoxOptions, Button, Element, isElement, Layout, Node, Style } from '../blessedTypes'
import { Component } from '../jsx/component'
import { focusableOpts } from '../util/sharedOptions'
import { CollapsibleProps } from './collapsible'
import { Div } from './jsxUtil'

export class TabLabel extends VirtualComponent<TabLabelProps> {}
export class Tab extends VirtualComponent<TabProps> {}
export class TabBody extends VirtualComponent<TabBodyProps> {}

interface ChangeEvent {
  activeTab: number
}

export interface TabPanelProps extends BoxOptions {
  children: (Tab)[]
  updateScreenOnChange?: boolean
  onChange?: (e: ChangeEvent) => void
  activeTab?: BoxOptions
  inactiveTab?: BoxOptions
}

interface TabLabelProps extends BoxOptions {
  children: JSX.BlessedJsxText
}

interface TabBodyProps extends BoxOptions {
  children: JSX.BlessedJsxNode
}

export interface TabProps extends CollapsibleProps {
  active?: boolean
  children: (TabBody | TabLabel)[]
}

/**
 * Example: 
```
<TabPanel activeStyle={{ fg: 'red', underline: true }} inactiveStyle={{ fg: 'blue', underline: false }}>
  <Tab active={true}>
    <TabLabel style={{ focus: { bg: 'yellow' } }}>tab 1</TabLabel>
    <TabBody>
      body1
      {words().join(' ')}
      <Br />
      <button content={string()} border="line" focusable={true} /> <Br />
      {words().join(' ')}
      <Br />
      <button content="button1" border="line" focusable={true} /> <Br />
      {words().join(' ')}
    </TabBody>
    {}
  </Tab>
  <Tab>
    <TabLabel style={{ focus: { bg: 'yellow' } }}>tab 2</TabLabel>
    <TabBody>
      body2
      {words().join(' ')}
      <Br />
      <button content={string()} border="line" /> <Br />
      {words().join(' ')}
      <Br />
      <button content="button2" border="line" /> <Br />
      {words().join(' ')}
    </TabBody>
    {}
  </Tab>
  {}
</TabPanel>
```
 */

export class TabPanel extends Component<TabPanelProps> {
  _saveJSXChildrenProps = true

  render() {
    this.props.activeTab = this.props.activeTab || {}
    this.props.inactiveTab = this.props.inactiveTab || {}
    const childProps = getJSXChildrenProps(this)!
    const tabsData = childProps.filter(c => c.tagName === 'Tab')
    const tabs = tabsData.map((tabData, i) => {
      const bodyData = tabData.children.filter(isElementData).find(c => c.tagName === 'TabBody')!
      const labelData = tabData.children.filter(isElementData).find(c => c.tagName === 'TabLabel')!
      // const counter = (this.props._tabNameCounter || 0)
      const counter = i
      const active = tabData.attrs && !!tabData.attrs.active
      // debug(labelData.children.join(' '), active)
      const body = (
        <Div {...bodyData.attrs || {}} hidden={!active} name={'tab_body_' + counter}>
          {...bodyData.children}
        </Div>
      )
      const label = (
        <button
          {...focusableOpts()}
          border="line"
          content={labelData.children.join(' ')}
          {...(active?this.props.activeTab : this.props.inactiveTab)||{}}
          {...labelData.attrs || {}}
          style={{
            ...((labelData.attrs && labelData.attrs.style) || {}),
            ...((active ? (this.props.activeTab && this.props.activeTab.style) : (this.props.inactiveTab && this.props.inactiveTab.style)) || {})
          }}
          onPress={e => this.selectTabNamed(e.currentTarget.name)}
          onClick={e => this.selectTabNamed(e.currentTarget.name)}
          name={'tab_label_' + counter}
        />
      )
      const tab = { body, label }
      return tab
    })
    return (
      <Div>
        {...tabs.map(t => t.label)}
        {...tabs.map(t => t.body)}
      </Div>
    )
  }

  protected selectTabNamed(tabName: String) {
    if (tabName.startsWith('tab_label_')) {
      const id = parseInt(tabName.substring('tab_label_'.length))
      if (id !== NaN) {
        this.selectTab(id)
      }
      // if (this.props.updateScreenOnChange) {
      this.screen.render()
      // }
    }
  }

  selectTab(tabIndex: number) {
    this.filterDescendants(TabPanel.isBody).forEach(body => {
      if (body.name !== 'tab_body_' + tabIndex) {
        body.hide()
      } else {
        body.show()
      }
    })
    this.filterDescendants(TabPanel.isLabel).forEach(label => {
      if (label.name !== 'tab_label_' + tabIndex) {
        label.style = { ...(label.style || {}), ...(this.props.inactiveTab && this.props.inactiveTab.style|| {}) }
      } else {
        label.style = { ...(label.style || {}), ...(this.props.activeTab && this.props.activeTab.style || {}) }
      }
    })
    this.props.onChange && this.props.onChange({ activeTab: tabIndex })
  }

  insertTab(tabProps: Partial<TabProps>, labelProps: Partial<TabLabelProps>, bodyProps: TabBodyProps, index: number) {
    const tabPanel = React.render(
      <TabPanel>
        <Tab {...tabProps}>
          <TabLabel {...labelProps}>{labelProps.content || labelProps.children || index}</TabLabel>
          <TabBody {...bodyProps}>{bodyProps.children}</TabBody>
          {}
        </Tab>
        {}
      </TabPanel>
    )

    const body = findDescendant(tabPanel, TabPanel.isBody) as Element | undefined
    const label = findDescendant(tabPanel, TabPanel.isLabel) as Element | undefined
    const bodies = this.filterDescendants(TabPanel.isBody) as Element[]

    // logText(this.element, body, label)
    const labels = this.filterDescendants(TabPanel.isLabel) as Element[]

    // debug(JSON.stringify(getJSXChildrenProps(this)!.find(c => c.tagName === 'Tab')))

    // debug(JSON.stringify(getTreeNode(tabPanel)))

    // debug(JSON.stringify(getTreeNode(this.element)))

    // bodies.map( e=>(e as any).name + ' - ' + (e as any).content))

    // if(bodies.length>index){
    //   body.name = 'tab_body_'+index
    //   this.blessedElement.insertBefore(body, bodies[index])
    //   for(let i = index; i<bodies.length; i++){
    //     bodies[i].name='tab_body_'+(i+1)
    //   }
    // }else {
    body.name = 'tab_body_' + (bodies.length + 1)
    this.blessedElement.append(body)
    // }
    // if(labels.length>=index){
    //   label.name = 'tab_label_'+index
    //   this.blessedElement.insertBefore(label, labels[index])
    //   for(let i = index; i<labels.length; i++){
    //     labels[i].name='tab_label_'+(i+1)
    //   }
    // }else {
    label.name = 'tab_label_' + (labels.length + 1)
    this.blessedElement.append(label)
    // }
    // debug(JSON.stringify(getJSXChildrenProps(this)!.find(c => c.tagName === 'Tab')),

    // mapDescendants(this.element, e=>(e as any).name + ' - ' + (e as any).content),
    this.screen.render()

    // bodies.map( e=>(e as any).name + ' - ' + (e as any).content))
  }

  protected static isBody(d: Node): d is Layout {
    return isElement(d) && !!d.name && d.name.startsWith('tab_body_')
  }

  static isLabel(e: Node): e is Button {
    return isElement(e) && !!e.name && e.name.startsWith('tab_label_')
  }
}

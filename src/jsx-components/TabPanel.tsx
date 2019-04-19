import { React } from '..'
import { getJSXChildrenProps, isElementData, VirtualComponent } from '../blessed/virtualElement'
import { BoxOptions, isElement } from '../blessedTypes'
import { Component } from '../jsx/component'
import { log } from '../util/logger'
import { Br, Div } from './jsxUtil'

export class TabLabel extends VirtualComponent<TabLabelProps> {}
export class Tab extends VirtualComponent<TabProps> {}
export class TabBody extends VirtualComponent<TabBodyProps> {}

interface ChangeEvent {
  activeTab: number
}
interface TabPanelProps extends BoxOptions {
  children: (Tab)[]
  onChange?: (e: ChangeEvent) => void
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
    const tabsData = childProps.filter(c => c.tagName === 'Tab')
    const tabs = tabsData.map((tabData, i) => {
      const bodyData = tabData.children.filter(isElementData).find(c => c.tagName === 'TabBody')!
      const labelData = tabData.children.filter(isElementData).find(c => c.tagName === 'TabLabel')!
      const counter = i
      const body = (
        <Div hidden={tabData.attrs && !tabData.attrs.active} name={'tab_body_' + counter}>
          {...bodyData.children}
        </Div>
      )
      const label = (
        <button
          border="line"
          content={labelData.children.join(' ')}
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
        <Br />
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
    }
  }

  selectTab(tabIndex: number) {
    this.filterDescendants(d => isElement(d) && !!d.name && d.name.startsWith('tab_body_')).forEach(body => {
      if (body.name !== 'tab_body_' + tabIndex) {
        body.hide()
        log('body hide()', body.name)
      } else {
        log('body show()', body.name)
        body.show()
      }
    })
    this.blessedElement.screen.render()
    this.props.onChange && this.props.onChange({ activeTab: tabIndex })
  }
}

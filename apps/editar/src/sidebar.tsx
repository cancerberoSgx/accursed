import { Br, Div, React, Tab, TabBody, TabLabel, TabPanel, TreeView, TreeViewNode } from 'accursed'
import { join, resolve } from 'path'
import { ls, test } from 'shelljs'
import { ActionManager } from './actionManager'
import { Component } from './component'
import { File, State } from './state'
import { focusableOpts } from './style'
import { PREFIX } from './util'
import { SIDEBAR_ACTION, SetCwdAction, OpenFilesAction } from './sidebarActions';

export class Sidebar extends Component {
  render() {
    return (
      <Div>
        <TabPanel>
          <Tab active={true} _data={{ [PREFIX('sidebarTool')]: 'explorer' }}>
            <TabLabel {...focusableOpts()}>Explorer</TabLabel>
            <TabBody>
              <Explorer {...this.props} />
            </TabBody>
            {}
          </Tab>
          <Tab active={false} _data={{ [PREFIX('sidebarTool')]: 'search' }}>
            <TabLabel {...focusableOpts()}>Search</TabLabel>
            <TabBody>
              <textbox {...focusableOpts()} value="search" />
              <Br />
              <checkbox {...focusableOpts()} checked={this.s.search.caseSensitive} content="Case sensitive" />
              <Br />
              Files to include: <Br />
              <textbox {...focusableOpts()} value="" />
              <Br />
            </TabBody>
            {}
          </Tab>
          <Tab active={false} _data={{ [PREFIX('sidebarTool')]: 'sourceControl' }}>
            <TabLabel {...focusableOpts()}>Source Control</TabLabel>
            <TabBody>
              <textbox {...focusableOpts()} value="Message" />
              <Br />
              Changes:
              <Br />
              <list {...focusableOpts()} items={['files.txt', 'changed.md']} height="100%" />
              <Br />
            </TabBody>
            {}
          </Tab>
          {}
        </TabPanel>
      </Div>
    )
  }
}

// interface ExplorerProps extends Props{

// }
export class Explorer extends Component {
  treeView: TreeView<File>

  render() {
    ActionManager.get().onActionDispatched(SIDEBAR_ACTION.SET_CWD,(a: SetCwdAction, s)=>this.onCwdChanged(a, s))

    

    return (
      <treeview<File>
        {...focusableOpts()}
        width="100%"
        height="100%"
        rootNodes={this.buildRootNodes()}
        onNodeSelect={e => {
          this.dispatch({
            type: SIDEBAR_ACTION.OPEN_FILES,
            paths: [e.path]
          })
        }}
        onNodeExpand={async e => {
          const f = (e as any) as File
          if (f.isDirectory && !f.directoryLoaded) {
            e.children.push(...listDirectoryAsNodes(f.filePath))
            this.treeView.setNodes()
            this.screen.render()
          } else if (!f.isDirectory) {
            this.dispatch({
              type: SIDEBAR_ACTION.OPEN_FILES,
              paths: [e.path]
            })
          }
        }}
        ref={React.createRef<TreeView<File>>(c => (this.treeView = c))}
      />
    )
  }

  onCwdChanged(a: SetCwdAction, s: State) {
    this.treeView.setNodes(s.cwdRootFiles)
    this.screen.render()
  }

  buildRootNodes(): TreeViewNode[] {
    return this.s.cwdRootFiles
  }
}



export function listDirectoryAsNodes(cwd: string) {
  return ls(cwd).map(p => ({
    filePath: resolve(join(cwd, p)),
    children: [],
    name: p,
    isDirectory: test('-d', resolve(join(cwd, p)))
  }))
}


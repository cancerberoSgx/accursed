import { Br, debug, Div, React, Tab, TabBody, TabLabel, TabPanel, TreeView, TreeViewNode } from 'accursed'
import { join, resolve } from 'path'
import { Action } from 'redux'
import { ls, test } from 'shelljs'
import { ActionManager } from './actionManager'
import { Component } from './component'
import { File, State } from './state'
import { initialState } from './store'
import { focusableOpts } from './style'
import { PREFIX } from './util'

export class Sidebar extends Component {
  render() {
    return (
      <Div>
        <TabPanel>
          <Tab active={true} _data={{ [PREFIX('sidebarTool')]: 'explorer' }}>
            <TabLabel {...focusableOpts()}>Explorer</TabLabel>
            <TabBody>
              <Explorer {...this.props} />
              {/* <treeview {...focusableOpts()} width='100%' height="100%" rootNodes={[{name: '/home', expanded: true, children: [{name: 'foo.txt', children: [{name: 'foo11.txt', expanded: true,children: []}]}, {name: 'foo2.txt', expanded: true, children: []}, {name: 'foo3.txt', expanded: true, children: []}  ]}]}
      onNodeSelect={e=>{

      }}
      /> */}
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
    // debug('sidebar Explorer onActionDispatched222' )
    // this.debug('sidebar Explorer onActionDispatched', !!ActionManager.get() )
    ActionManager.get().onActionDispatched(SIDEBAR_ACTION.SET_CWD, this.onCwdChanged.bind(this))
    // debug('sidebar Explorer onActionDispatched', 2 )

    return (
      <treeview<File>
        {...focusableOpts()}
        width="100%"
        height="100%"
        // rootNodes={[{name: '/home', expanded: true, children: [{name: 'foo.txt', children: [{name: 'foo11.txt', expanded: true,children: []}]}, {name: 'foo2.txt', expanded: true, children: []}, {name: 'foo3.txt', expanded: true, children: []}  ]}]}
        rootNodes={this.buildRootNodes()}
        onNodeSelect={e => {
          // this.debug('onNodeSelect')
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

            //   const files = await this.props.context.fs.ls(f.filePath)
            //  files .map(c=>{
            //   })
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
    // this.debug('onCwdChanged', s)
    //await till there is a tree? TODO
    this.treeView.setNodes(s.cwdRootFiles)
    this.screen.render()
  }

  buildRootNodes(): TreeViewNode[] {
    return this.s.cwdRootFiles
  }
}

export enum SIDEBAR_ACTION {
  OPEN_FILES = 'SIDEBAR_ACTION_OPEN_FILE',
  SELECT_FILES = 'SIDEBAR_ACTION_SELECT',
  SET_CWD = 'SIDEBAR_ACTION_SET_CWD' // TODO: MOVE TO MORE GENREAL file
}

export function setCwd(s: State = initialState, a: SetCwdAction) {
  debug('setCwd', s)
  const s2 = { ...s, cwd: a.cwd, cwdRootFiles: listDirectoryAsNodes(a.cwd) }
  debug(s2)
  return s2
}

/** this happens when the user explicitly enters [ENTER] or doiuble clicks with mouse, expliocitly giving the gesture of open the file and nnt when they just navigate though the tree with arrow keys */
export interface OpenFilesAction extends Action<SIDEBAR_ACTION.OPEN_FILES> {
  type: SIDEBAR_ACTION.OPEN_FILES
  paths: string[]
}
/** this happens when the users control-click or single click one or more files. The gesture is just select them to some action after. Could be opening the files, could be diff, could be see control version history, etc */
export interface SelectFilesAction extends Action<SIDEBAR_ACTION.OPEN_FILES> {
  type: SIDEBAR_ACTION.OPEN_FILES
  paths: string[]
}
/**  */
export interface SetCwdAction extends Action<SIDEBAR_ACTION.SET_CWD> {
  type: SIDEBAR_ACTION.SET_CWD
  cwd: string
}

function listDirectoryAsNodes(cwd: string) {
  return ls(cwd).map(p => ({
    filePath: resolve(join(cwd, p)),
    children: [],
    name: p,
    isDirectory: test('-d', resolve(join(cwd, p)))
  }))
}

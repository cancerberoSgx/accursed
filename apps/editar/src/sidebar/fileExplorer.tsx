import { React, TreeView, TreeViewNode } from 'accursed'
import { Component } from '../component'
import { File, State } from '../store/state'
import { focusableOpts } from '../style'
import { SetCwdAction, SIDEBAR_ACTION } from './sidebarActions'
import { listDirectoryAsNodes } from './treeViewUtil'

export class FileExplorer extends Component {
  treeView: TreeView<File>
  constructor(p, s) {
    super(p, s)
    this.onActionDispatched(SIDEBAR_ACTION.SET_CWD, (a, s) => this.onCwdChanged(a, s))
  }

  render() {
    return (
      <treeview<File>
        {...focusableOpts()}
        width="100%"
        height="100%"
        rootNodes={this.buildRootNodes()}
        onNodeSelect={e => {
          this.debug('explorer selected')
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

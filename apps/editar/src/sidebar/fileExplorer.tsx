import { React, ref, TreeView, TreeViewNode } from 'accursed'
import { File, State } from '../store/state'
import { Component } from '../util/component'
import { focusableOpts } from '../util/style'
import { SetCwdAction, SIDEBAR_ACTION } from './sidebarActions'
import { listDirectoryAsNodes } from './sideBarReducers'

export class FileExplorer extends Component {
  treeView: TreeView<File>

  constructor(p, s) {
    super(p, s)
    this.onActionDispatched(SIDEBAR_ACTION.SET_CWD, (a, s) => this.onCwdChanged(a, s))
    this.onNodeSelect = this.onNodeSelect.bind(this)
  }

  render() {
    return (
      <treeview<File>
        {...focusableOpts()}
        style={{
          bg: 'darkgray'
        }}
        width="100%"
        height="100%"
        rootNodes={this.buildRootNodes()}
        onNodeSelect={this.onNodeSelect as any}
        onNodeExpand={this.onNodeSelect as any}
        ref={ref<TreeView<File>>(c => (this.treeView = c))}
      />
    )
  }

  private onNodeSelect(f: File) {
    if (f.isDirectory && !f.directoryLoaded) {
      f.children.push(...listDirectoryAsNodes(f.filePath))
      this.treeView.setNodes()
      this.screen.render()
    } else if (!f.isDirectory) {
      this.dispatch({
        type: SIDEBAR_ACTION.OPEN_FILES,
        paths: [f.filePath]
      })
    }
  }

  onCwdChanged(a: SetCwdAction, s: State) {
    this.treeView.setNodes(s.cwdRootFiles)
    this.screen.render()
    this.treeView.focus()
  }

  buildRootNodes(): TreeViewNode[] {
    return this.s.cwdRootFiles
  }
}

// [0x1f4dd, 0x1f4c1, 0x1f4c2, 0x1f4c4].forEach(n=>{
//   console.log(  String.fromCodePoint(n));
// })

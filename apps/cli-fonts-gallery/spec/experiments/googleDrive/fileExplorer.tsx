import { Component, React, ref, showInModal, TreeView } from 'accursed'
import { focusableOpts } from '../../../src/util/style'
import { P } from './app'
import { File, listFiles } from './drive'

export class FileExplorer extends Component<P> {
  treeView: TreeView<File>

  constructor(p, s) {
    super(p, s)
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
        rootNodes={this.props.rootFiles}
        onNodeSelect={this.onNodeSelect as any}
        onNodeExpand={this.onNodeSelect as any}
        ref={ref<TreeView<File>>(c => (this.treeView = c))}
      />
    )
  }

  private async onNodeSelect(f: File) {
    if (f.isDirectory && !f.directoryLoaded) {
      f.children.push(...(await listFiles(f.fileId)))
      this.treeView.setNodes()
      this.screen.render()
    } else if (!f.isDirectory) {
      const text = await this.props.fileManager.get(f.fileId)
      showInModal(this.screen, text)
      // this.dispatch({
      //   type: SIDEBAR_ACTION.OPEN_FILES,
      //   paths: [f.filePath]
      // });
    }
  }
  // listDirectoryAsNodes(filePath: string) {
  //   return []
  //   // throw new Error('Method not implemented.');
  // }

  // onCwdChanged(a: SetCwdAction, s: State) {
  //   this.treeView.setNodes(s.cwdRootFiles)
  //   this.screen.render()
  //   this.treeView.focus()
  // }

  // buildRootNodes(){
  //   return  []
  // }
}

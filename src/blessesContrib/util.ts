import * as contrib from 'blessed-contrib'
/**
 * notifies when used "hovers" a tree node (not enter, just overs the node when navigating with arrow keys.)
 */
export function onTreeNodeFocus<T extends contrib.Widgets.TreeElementNode>(
  tree: contrib.Widgets.TreeElement<T>,
  fn: (selectedNode: T) => void
) {
  tree.rows.key(['down', 'up'], k => {
    const selectedNode =
      tree.nodeLines && tree.rows && tree.rows.selected && tree.nodeLines[tree.rows.getItemIndex(tree.rows.selected)]
    if (selectedNode) {
      fn(selectedNode)
    }
  })
}

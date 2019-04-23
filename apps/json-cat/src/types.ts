import * as contrib from 'blessed-contrib'
import { TreeViewNode } from '../../../dist/src';

export interface Options {
  /**
   * could be a file or a url. if not provided input will be read from stdin
   */
  input?: string
  /** if given, only nodes matching the given CCS4 selector will be shown. http://www.w3.org/TR/2011/WD-selectors4-20110929/#subject  */
  filter?: string

  help?: boolean
  /** if true it wont render any UI and just consume the json input and verify it's OK */
  testInput?: boolean
}

export interface TNode extends TreeViewNode {
  // children: TChildren
}
export type TChildren = { [name: string]: TNode }
export interface managerOptions {
  noColors?: boolean
  renderMode?: 'waitForJsonLoad' | 'progressively'
  loadingUpdateInterval?: number
  noLoadingFeedback?: boolean
}

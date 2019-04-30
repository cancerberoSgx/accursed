import { basename } from 'path';
import { State } from '../store/state';
import { initialState } from '../store/store';
import { listDirectoryAsNodes } from './sidebar';
import { SetCwdAction, OpenFilesAction } from './sidebarActions';
let sideBarReducers;
export function setCwd(s: State = initialState, a: SetCwdAction) {
  return { ...s, cwd: a.cwd, cwdRootFiles: listDirectoryAsNodes(a.cwd) };
}
export function openFiles(s: State = initialState, a: OpenFilesAction) {
  return {
    ...s,
    documents: [
      ...s.documents,
      ...a.paths.filter(p => !s.documents.find(d => d.path === p)).map(p => ({ path: p, name: basename(p) }))
    ]
  }; //.find(p=>!a.paths.includes(f.path!)}
}

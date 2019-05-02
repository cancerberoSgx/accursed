import { React, ref, Component, TreeView, TreeViewNode, createScreen, installFocusAndExitKeysForEditorWidget, debug, showInModal } from 'accursed'
import { focusableOpts } from '../../../src/util/style';
import { authorizeAndRun } from './driveClient';
import { google, drive_v3 } from 'googleapis';
import { readFileSync, createWriteStream, writeFileSync } from 'fs';
import { P, App } from './app';
import { fstat } from 'fs-extra';

export interface File extends TreeViewNode {
isDirectory: boolean
directoryLoaded: boolean
fileId: string
mimeType: string
}



export class FileManager{
  files : {fileId: string, filePath: string}[]= []
  static instance = new FileManager()
  async get(fileId: string) {
    const f = this.files.find(f=>f.fileId===fileId)
    if(f){
      return readFileSync(f.filePath).toString()
    }
    else {
      const filePath = await downloadFile(fileId)
      this.files.push({fileId, filePath})
      return readFileSync(filePath).toString()
  }
}
}

async function start(){  
  try {
    const rootFiles = await listFiles()
  const screen = createScreen({
        useBCE: true,
        smartCSR: true,
        dockBorders: true
      })
      installFocusAndExitKeysForEditorWidget(screen)
      const AppConstructor = () => <App  rootFiles={rootFiles} fileManager={FileManager.instance}/>
      screen.append(React.render(AppConstructor()))
      screen.render()

  } catch (error) {
    console.error(error);
    
  }
}
start()



export function downloadFile(fileId: string): Promise<string> {
  return authorizeAndRun<string>(async auth=>{
const drive = google.drive({version: 'v3', auth});
const filePath = 'tmp/'+fileId
// var dest = createWriteStream(filePath);
// return new Promise(resolve=>{
  try {
    const res = await drive.files.export({
      fileId,
      // alt: 'media',
      mimeType: 'text/plain'
    })
    writeFileSync(filePath, res.data)
    return filePath
    // debug(res)
    
  } catch (error) {
    debug(error)
  }
  // return 'tmp/foo.txt'

// (drive.files.get({
//   fileId,
//   alt: 'media'
// }) as any).on('end', function () {
//       // console.log('Done');
//       resolve(filePath)
//     }).on('data', function (data) {
//       debug(data)
//       // resolve(filePath)
//     })
//     .on('error', function (err) {
//       // console.log('Error during download', err);
//       debug(err)
//     })
//     .pipe(dest);
// })
})
    }


export function listFiles(parentId?: string): Promise<File[]> {
  return authorizeAndRun<File[]>(async auth=>{
const drive = google.drive({version: 'v3', auth});
const res =  await drive.files.list({
  pageSize: 20,
  fields: 'nextPageToken, files(id, name, mimeType)',
  q: parentId ? `'${parentId}' in parents` : undefined
})
return res.data.files.map(f=>({
  fileId: f.id,
  name: f.name,
  isDirectory: f.mimeType==='application/vnd.google-apps.folder',
  children: [],
  mimeType: f.mimeType,
  directoryLoaded: false
}))
})
}



// function listFiles(auth): Promise<drive_v3.Schema$File[]> {
//   // https://developers.google.com/drive/api/v3/search-files
// return new Promise(resolve=>{
// console.log('listFiles');
// const drive = google.drive({version: 'v3', auth});
// drive.files.list({
//   pageSize: 10,
//   fields: 'nextPageToken, files(id, name)',
//   q: 'fullText contains \'hello\''
//   // folderId: '0B5OdpGrX0Ow3MmI5OThiYTMtYmQyNS00ZWJmLTg1MGYtYzljZDYxNzE2N2Y4'
// }, (err, res) => {
//               try {
//     if (err) return console.log('The API returned an error: ' + err);
//     const files = res.data.files;
// console.log('listFiles', files);

//     resolve(files)
//   } catch (error) {
//     console.error(error);
//     resolve(error)
//   }
//   });
// })
// }


// // const globby = require('globby');
// import * as globby from 'globby'
// import{gitignore} from 'globby'
// import { ls, test, pwd } from 'shelljs';
// import * as pMap from 'p-map'
// import { getRelativePath, dirname, pathJoin, parseGitIgnore } from 'misc-utils-of-mine-generic';
// import { FS } from '../../src/context/context';
// import { FSImpl } from '../../src/context/impl/fsImpl';

// // const picomatch = require('picomatch');

// // console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true

// // // strip leading './' from strings
// // const format = str => str.replace(/^\.\//, '');
// // const isMatch = picomatch(['./foo*bar'], { format });
// // console.log(isMatch('./foohihibar', ['./foo*bar'])); //=> true
// // picomatch.makeRe(input[, options]);

// // console.log(picomatch.makeRe('*.js'), picomatch.makeRe('./foo*bar'));

// (async () => {
//   // console.log(require('picomatch')('./src/*.ts')('./src/cli.ts'))
//   // console.log(picomatch(picomatch.makeRe('./foo*bar'))('./foohihibar'))

//   console.log( await FSImpl.instance.search(['**/*.ts']));
  
//   // console.log(await FSImpl.instance.glob(['./src/*.ts']));
  
// })();




// // interface Options{
// //   fs?: FS
// //   cwd?: string,
// //   patterns: string[]
// //   /** ignore files ignored in .gitignore file in cwd if any? */
// //   gitIgnore?: boolean
// //   ignorePatterns?: boolean
// // }

// // async function listFiles(options: Options){
// //   const fs = options.fs||FSImpl.instance
// //   const cwd = options.cwd||'.';
// //   if(options.gitIgnore){
// //     const gi = await fs.read(pathJoin(cwd, '.gitignore'))
// //     if(gi) {
// //       const g = parseGitIgnore(gi, {cwd, fileName: '.gitignore'})

// //     }
// //   }
// //   const isIgnored = await  gitignore({cwd: pwd().toString()})
// //  (await fs.ls(cwd) ) .filter(f=>fs.isDirectory(f)).filter(f=>!isIgnored(f.toString()))
// // const foldersPatterns = options.patterns.map(p=>p.startsWith('**') ? p.substring(1) : p)

// // }
// // (async () => {
// //   const isIgnored = await  gitignore({cwd: pwd().toString()})
// //   const folders = ls('.').filter(f=>test('-d', f)).filter(f=>!isIgnored(f.toString()))
// //   const currentFolderFiles = await globby('*.json', {gitignore: true, onlyFiles: true});
  
// //   const result = await pMap(folders, f=>globby(f+'/**/*.json', {gitignore: true, onlyFiles: false}))
// //   console.log(folders, currentFolderFiles, result);
  
// //   // const currentFolderFiles = = await globby('*.json', {gitignore: true, onlyFiles: true});
  
// // 	// console.log(paths);
// // 	//=> ['unicorn', 'rainbow']
// // })();


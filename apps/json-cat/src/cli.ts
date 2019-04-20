import { appendFileSync, existsSync, createReadStream } from 'fs'
import { Options } from './types'
import * as oboe from 'oboe'
import { Tree } from './tree';
import { JSONValue } from 'misc-utils-of-mine-typescript';

/**

Aha! json-cat [ 'name' ] [ { name: 'json-cat' }, 'json-cat' ]
Aha! 0.0.3 [ 'version' ] [ { name: 'json-cat', version: '0.0.3' }, '0.0.3' ]
Aha! command line interactive tool to explorer Unicode emojis [ 'description' ] [ { name: 'json-cat',
    version: '0.0.3',
    description: 'command line interactive tool to explorer Unicode emojis' },
  'command line interactive tool to explorer Unicode emojis' ]
Aha! dist/src/index.js [ 'main' ] [ { name: 'json-cat',
    version: '0.0.3',
    description: 'command line interactive tool to explorer Unicode emojis',
    main: 'dist/src/index.js' },
  'dist/src/index.js' ]
...
Aha! tsc --watch [ 'scripts', 'watch' ] [ { name: 'json-cat',
    version: '0.0.3',
    description: 'command line interactive tool to explorer Unicode emojis',
    main: 'dist/src/index.js',
    types: 'dist/src/index.d.ts',
    bin: '.bin/json-cat.js',
    scripts: { watch: 'tsc --watch' } },
  { watch: 'tsc --watch' },
  'tsc --watch' ]
Aha! tsc [ 'scripts', 'build' ] [ { name: 'json-cat',
    version: '0.0.3',
    description: 'command line interactive tool to explorer Unicode emojis',
    main: 'dist/src/index.js',
    types: 'dist/src/index.d.ts',
    bin: '.bin/json-cat.js',
    scripts: { watch: 'tsc --watch', build: 'tsc' } },
  { watch: 'tsc --watch', build: 'tsc' },
  'tsc' ]


 */
// type OboeCallback = (value: any, path: string[], partials: any[])>=void
// <T=any> = [...any[]]


export async function main(args: Options) {
  if (args.help) {
    help()
    return process.exit(0)
  }
  const filter = args.filter || '*'
  let json: oboe.Oboe

  const tree = new Tree()
  tree.render()



  if (args.input && existsSync(args.input)) {
    json = oboe(createReadStream(args.input))
  }
  else if (args.input) {
    json = oboe(createReadStream(args.input))
  }
  else {
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    json = oboe(process.stdin)
  }
  json.node({
    //@ts-ign ore
    [filter]: (value, path, partials) => {
      tree.handle(value, path, partials)
      // console.log('Aha! ' + value, path, ...args);
      // console.log(path);
    }
  })
  json.done(() => {
    tree.loaded=true
    // console.log('DONE');
  })
  json.fail(err => {
    tree.loaded=true
    //TODO
    // console.log('FAIL', err);
  })



}

function help() {
  console.log(`
Usage examples: 

  --input (optional) input file path or url. if not given it will consume stdin
`)
}

import { appendFileSync, existsSync, createReadStream } from 'fs'
import { Options } from './types'
import * as oboe from 'oboe'
import { Tree } from './tree';


export function main(args: Options) {
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
    [filter]: (value, path, partials) => {
      tree.handle(value, path, partials)
    }
  })
  json.done(() => {
    tree.loaded=true
  })
  json.fail(err => {
    tree.loaded=true
    tree.failed(err)
    //TODO
    // console.log('FAIL', err);
  })
  return tree
}

function help() {
  console.log(`
Usage examples: 

  --input (optional) input file path or url. if not given it will consume stdin
`)
}

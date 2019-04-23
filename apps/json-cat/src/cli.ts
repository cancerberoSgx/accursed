import { debug } from 'accursed'
import { createReadStream, existsSync } from 'fs'
import * as oboe from 'oboe'
import { DataManager } from './manager/DataManager'
import { Options } from './types'

export async function main(args: Options) {
  if (args.help) {
    help()
    return process.exit(0)
  }
  const filter = args.filter || '*'
  let json: oboe.Oboe

  let tree: DataManager = null as any
  // const tree = new Tree()
  if (!args.testInput) {
    try {
      tree = new DataManager()
      await tree.render()
    } catch (error) {
      debug('before', error)
      debug('ERRR', error)
    }
  }

  if (args.input && existsSync(args.input)) {
    json = oboe(createReadStream(args.input))
  } else if (args.input) {
    json = oboe(createReadStream(args.input))
  } else {
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    json = oboe(process.stdin)
  }

  args.testInput && console.log('Listening for nodes matching filter: ' + filter)

  json.node({
    [filter]: (value, path, partials) => {
      tree && tree.handle(value, path, partials)
      args.testInput && console.log('json node', path)
    }
  })
  json.done(value => {
    if (tree) {
      tree.loaded = value
    }
    args.testInput && console.log('done reading json')
  })
  json.fail(err => {
    tree.loaded = err
    tree && tree.failed(err)
    //TODO
    args.testInput && console.log('FAIL', err)
  })
  return tree
}

function help() {
  console.log(`
Usage examples: 

  --input (optional) input file path or url. if not given it will consume stdin
`)
}

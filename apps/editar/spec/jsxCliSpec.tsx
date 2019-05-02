import { ansi, Driver, InteractionSpecHelper } from 'cli-driver'
import { labels } from '../src/util/labels'

describe('cli', () => {
  let client: Driver
  let helper: InteractionSpecHelper
  // console.log( ansi.keys.getSequenceFor({name: 'f', control: true, shift: true}))

  beforeAll(async done => {
    client = new Driver()
    helper = new InteractionSpecHelper(client)
    await client.start({
      notSilent: true
    })
    done()
  })

  afterAll(async done => {
    await helper.clear()
    await client.destroy().catch()
    helper = null as any
    done()
  })

  it('ts-node src/cli should render and quit with control-q', async done => {
    await client.enter('npx ts-node -T src/cli')
    expect(await helper.waitForStrippedDataToInclude(labels.sidebarExplorerTab))
    await client.enter(ansi.keys.getSequenceFor({ name: 'q', ctrl: true }))
    await helper.expectLastExitCode(true)
    done()
  })

  it('node bin/editar should render and quit with control-q', async done => {
    await client.enter('node bin/editar')
    expect(await helper.waitForStrippedDataToInclude(labels.sidebarExplorerTab))
    await client.enter(ansi.keys.getSequenceFor({ name: 'q', ctrl: true }))
    await helper.expectLastExitCode(true)
    done()
  })
})

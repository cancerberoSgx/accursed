import { ansi, Driver, InteractionSpecHelper } from 'cli-driver'

describe('cli', () => {
  let client: Driver
  let helper: InteractionSpecHelper

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
    expect(await helper.waitForStrippedDataToInclude('Editor'))
    await client.enter(ansi.keys.getSequenceFor({ name: 'q', ctrl: true }))
    await helper.expectLastExitCode(true)
    done()
  })

  xit('node bin/ should render and quit with control-q', async done => {
    await client.enter('node bin/editar')
    expect(await helper.waitForStrippedDataToInclude('Editor'))
    await client.enter(ansi.keys.getSequenceFor({ name: 'q', ctrl: true }))
    await helper.expectLastExitCode(true)
    done()
  })
})

import { Driver } from 'cli-driver'
import { Helper } from './interactionHelper'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000

describe('astExplorerSpec', () => {
  let client: Driver
  let helper: Helper

  beforeAll(async done => {
    client = new Driver()
    helper = new Helper(client)
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

  it('should quit with q', async done => {
    await client.enter('npx ts-node src/cli/cliMain')
    expect(await helper.waitForStrippedDataToInclude('Project View'))
    // expect(await helper.waitForStrippedDataToInclude('Code View'))
    await client.enter('q')
    await helper.expectLastExitCode(true)
    done()
  })

  it('should toggle view with v, should fail toggle to code view and modal should close with q but not the app', async done => {
    await client.enter('npx ts-node src/cli/cliMain')
    expect(await helper.waitForStrippedDataToInclude('Project View'))
    await client.enter('v')
    let s = await helper.waitForStrippedDataToInclude('try again')
    await client.enter('q')
    // TODO: wait not to contain
    await client.time(300)

    await client.enter('h')
    s = await helper.waitForStrippedDataToInclude('Welcome to')

    await client.enter('q')
    // TODO: wait not to contain
    await client.time(300)
    await client.enter('q')
    await client.time(300)
    await helper.expectLastExitCode(true)
    done()
  })
})

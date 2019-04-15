import { Driver } from 'cli-driver'
import { Helper } from './interactionHelper'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000

describe('jsx', () => {
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

  it('should render box with content and no children', async done => {
    await client.enter('npx ts-node spec/assets/jsxNoChildren.tsx')
    expect(await helper.waitForStrippedDataToInclude('hehehehehe'))
    await client.enter('q')
    await helper.expectLastExitCode(true)
    done()
  })

  it('should render box with one button children', async done => {
    await client.enter('npx ts-node spec/assets/jsxOneChild.tsx')
    const s = await helper.waitForStrippedDataToInclude('click')
    ;['hello', 'click', 'box', 'content'].forEach(w => expect(s).toContain(w))
    await client.enter('q')
    done()
  })
})

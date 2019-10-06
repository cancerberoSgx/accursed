import { Driver, InteractionSpecHelper } from 'cli-driver'

describe('jsxCli', () => {
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

  xit('should render box with content and no children', async done => {
    await client.enter('npx ts-node -T spec/assets/jsxNoChildren.tsx')
    expect(await helper.waitForStrippedDataToInclude('hehehehehe'))
    await client.enter('q')
    await helper.expectLastExitCode(true)
    done()
  })

  it('should render box with one button children', async done => {
    await client.enter('npx ts-node -T spec/assets/jsxOneChild.tsx')
    const s = await helper.waitForStrippedDataToInclude('click')
    ;['hello', 'click', 'box', 'content'].forEach(w => expect(s).toContain(w))
    await client.enter('q')
    done()
  })
})

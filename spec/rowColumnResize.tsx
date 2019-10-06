import { Button2, Column, Columns, Div, Element, installVisibleOnAncestorFocus, isElement, React, Screen, findDescendantNamed, rowColumnResizeHandler, Row, Rows } from '../src'
import { focusableOpts } from '../src/util/sharedOptions'
 
export function rowColumnResize(screen: Screen){
      installVisibleOnAncestorFocus({
        screen,
        ancestorPredicate: e => isElement(e) && e.options && e.options._data && e.options._data.rowColumnResize,
        targetPredicate: (e: Element) => e.name === 'rowColumnResize'
      })
      const t1 = (
        <Div>
          <Rows>
            <Row name="column1" height="20%" _data={{ rowColumnResize: { height: 20 } }}>
              <Button2 {...focusableOpts()} onClick={e => {}}>
                >focusable
              </Button2>
              <Div height={1} name="rowColumnResize" hidden={true}>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: false })}>
                  {'<'}
                </Button2>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: false })}>
                  {'>'}
                </Button2>
              </Div>

              <Columns>
                <Column name="column1" bg="yellow" width="20%" _data={{ rowColumnResize: { width: 20 } }}>
                  <Button2 {...focusableOpts()} onClick={e => {}}>
                    >focusable
                  </Button2>
                  <Div width={10} name="rowColumnResize" hidden={true}>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: true })}>
                      {'<'}
                    </Button2>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: true })}>
                      {'>'}
                    </Button2>
                  </Div>
                </Column>

                <Column name="column2" width="50%" bg="magenta" _data={{ rowColumnResize: { width: 50 } }}>
                  <Button2 {...focusableOpts()} onClick={e => {}}>
                    >focusable
                  </Button2>
                  <Div width={10} name="rowColumnResize" bg="magenta" hidden={true}>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: true })}
                      bg="green">
                      {'<'}
                    </Button2>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: true })}
                      bg="green">
                      {'>'}
                    </Button2>
                  </Div>
                </Column>
                <Column name="column3" width="30%" bg="red" _data={{ rowColumnResize: { width: 30 } }}>
                  <Button2 {...focusableOpts()} onClick={e => {}}>
                    >focusable
                  </Button2>
                  <Div width={10} name="rowColumnResize" bg="red" hidden={true}>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: true })}
                      bg="green">
                      {'<'}
                    </Button2>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: true })}
                      bg="green">
                      {'>'}
                    </Button2>
                  </Div>
                </Column>
                {}
              </Columns>
            </Row>

            <Row name="column2" height="50%" bg="cyan" _data={{ rowColumnResize: { height: 50 } }}>
              <Button2 {...focusableOpts()} onClick={e => {}}>
                >focusable
              </Button2>
              <Div height={1} name="rowColumnResize" bg="cyan" hidden={true}>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: false })}
                  bg="green">
                  {'<'}
                </Button2>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: false })}
                  bg="green">
                  {'>'}
                </Button2>
              </Div>

              <Columns>
                <Column name="column1" width="20%" _data={{ rowColumnResize: { width: 20 } }} bg="gray">
                  <Button2 {...focusableOpts()} onClick={e => {}}>
                    >focusable
                  </Button2>
                  <Div width={10} name="rowColumnResize" hidden={true} bg="gray">
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: true })}>
                      {'<'}
                    </Button2>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: true })}>
                      {'>'}
                    </Button2>
                  </Div>
                </Column>

                <Column name="column2" width="50%" bg="magenta" _data={{ rowColumnResize: { width: 50 } }}>
                  <Button2 {...focusableOpts()} onClick={e => {}}>
                    >focusable
                  </Button2>
                  <Div width={10} name="rowColumnResize" bg="cyan" hidden={true}>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: true })}
                      bg="green">
                      {'<'}
                    </Button2>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: true })}
                      bg="green">
                      {'>'}
                    </Button2>
                  </Div>
                </Column>
                <Column name="column3" width="30%" bg="red" _data={{ rowColumnResize: { width: 30 } }}>
                  <Button2 {...focusableOpts()} onClick={e => {}}>
                    >focusable
                  </Button2>
                  <Div width={10} name="rowColumnResize" bg="red" hidden={true}>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: true })}
                      bg="green">
                      {'<'}
                    </Button2>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: true })}
                      bg="green">
                      {'>'}
                    </Button2>
                  </Div>
                </Column>
                {}
              </Columns>
            </Row>
            <Row name="column3" height="30%" bg="green" _data={{ rowColumnResize: { height: 30 } }}>
              <Button2 {...focusableOpts()} onClick={e => {}}>
                >focusable
              </Button2>
              <Div height={1} name="rowColumnResize" bg="green" hidden={true}>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: false })}
                  bg="green">
                  {'<'}
                </Button2>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: false })}
                  bg="green">
                  {'>'}
                </Button2>
              </Div>

              <Columns>
                <Column name="column1" width="20%" _data={{ rowColumnResize: { width: 20 } }} bg="orange">
                  <Button2 {...focusableOpts()} onClick={e => {}}>
                    >focusable
                  </Button2>
                  <Div width={10} name="rowColumnResize" hidden={true} bg="orange">
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: true })}>
                      {'<'}
                    </Button2>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: true })}>
                      {'>'}
                    </Button2>
                  </Div>
                </Column>

                <Column name="column2" width="50%" bg="magenta" _data={{ rowColumnResize: { width: 50 } }}>
                  <Button2 {...focusableOpts()} onClick={e => {}}>
                    >focusable
                  </Button2>
                  <Div width={10} name="rowColumnResize" bg="magenta" hidden={true}>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: true })}
                      bg="green">
                      {'<'}
                    </Button2>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: true })}
                      bg="green">
                      {'>'}
                    </Button2>
                  </Div>
                </Column>
                <Column name="column3" width="30%" bg="red" _data={{ rowColumnResize: { width: 30 } }}>
                  <Button2 {...focusableOpts()} onClick={e => {}}>
                    >focusable
                  </Button2>
                  <Div width={10} name="rowColumnResize" bg="red" hidden={true}>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: true })}
                      bg="green">
                      {'<'}
                    </Button2>
                    <Button2
                      {...focusableOpts()}
                      border={undefined}
                      onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: true })}
                      bg="green">
                      {'>'}
                    </Button2>
                  </Div>
                </Column>
                {}
              </Columns>
            </Row>
            {}
          </Rows>
        </Div>
      )
      return t1 
}

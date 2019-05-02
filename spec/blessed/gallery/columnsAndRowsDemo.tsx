import { Button2, Column, Columns, findDescendantNamed, Row, Rows } from '../../../src'
import { Div } from '../../../src/jsx-components/jsxUtil'
import { Component } from '../../../src/jsx/component'
import { React } from '../../../src/jsx/createElement'

export class ColumnsAndRowsDemo extends Component {
  render() {
    return (
      <Div>
        <Rows>
          <Row bg="red" height="20%" name="row1">
            <Button2
              onClick={e => {
                findDescendantNamed(e.currentTarget.screen, 'row1').height = '40%'
                findDescendantNamed(e.currentTarget.screen, 'row2').height = '20%'
                findDescendantNamed(e.currentTarget.screen, 'row3').height = '40%'
                e.currentTarget.screen.render()
              }}>
              40-20-40
            </Button2>
            <Columns>
              <Column name="column1" width="20%">
                <Button2
                  onClick={e => {
                    findDescendantNamed(e.currentTarget.screen, 'column1').width = '40%'
                    findDescendantNamed(e.currentTarget.screen, 'column2').width = '20%'
                    findDescendantNamed(e.currentTarget.screen, 'column3').width = '40%'
                    e.currentTarget.screen.render()
                  }}>
                  40-20-40
                </Button2>
              </Column>
              <Column name="column2" width="50%" bg="cyan">
                <Button2
                  onClick={e => {
                    findDescendantNamed(e.currentTarget.screen, 'column1').width = '10%'
                    findDescendantNamed(e.currentTarget.screen, 'column2').width = '70%'
                    findDescendantNamed(e.currentTarget.screen, 'column3').width = '20%'
                    e.currentTarget.screen.render()
                  }}>
                  10-70-20
                </Button2>
              </Column>
              <Column name="column3" width="30%" bg="green">
                <Button2
                  onClick={e => {
                    findDescendantNamed(e.currentTarget.screen, 'column1').width = '20%'
                    findDescendantNamed(e.currentTarget.screen, 'column2').width = '10%'
                    findDescendantNamed(e.currentTarget.screen, 'column3').width = '70%'
                    e.currentTarget.screen.render()
                  }}>
                  20-10-70
                </Button2>
              </Column>
              {}
            </Columns>
          </Row>
          <Row bg="blue" height="40%" name="row2">
            <Button2
              onClick={e => {
                findDescendantNamed(e.currentTarget.screen, 'row1').height = '10%'
                findDescendantNamed(e.currentTarget.screen, 'row2').height = '70%'
                findDescendantNamed(e.currentTarget.screen, 'row3').height = '20%'
                e.currentTarget.screen.render()
              }}>
              10-70-20
            </Button2>
          </Row>
          <Row bg="yellow" height="40%" name="row3">
            <Button2
              onClick={e => {
                findDescendantNamed(e.currentTarget.screen, 'row1').height = '20%'
                findDescendantNamed(e.currentTarget.screen, 'row2').height = '10%'
                findDescendantNamed(e.currentTarget.screen, 'row3').height = '70%'
                e.currentTarget.screen.render()
              }}>
              20-10-70
            </Button2>
          </Row>
          {}
        </Rows>
      </Div>
    )
  }
}

import React from 'react';
import DataTable from 'react-data-table-component';
import { Container, Form } from 'semantic-ui-react';

import generateUsers from '../../api/generator/usergenerator';
import generateSessions from '../../api/generator/sessiongenerator';

import usercolumns from '../../api/generator/usercolumns';
import sessioncolumns from '../../api/generator/sessioncolumns';

class Generate extends React.Component {
  state = { numusers: '', numsesh: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { numusers, numsesh } = this.state;

    const userlist = generateUsers(numusers);
    const sessionlist = generateSessions(numsesh, userlist);

    return (
      <div>
        <Container fluid>
          <div>
            <Form>
              <Form.Group>
                <Form.Input
                  placeholder='Number of users'
                  name='numusers'
                  value={numusers}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </div>
          <DataTable
            noHeader
            columns={usercolumns}
            data={userlist}
            keyField={userlist.username}
            dense
            pagination
            defaultSortField='date'
            theme='dark'
            highlightOnHover
          />
        </Container>
        <br/>
        <Container fluid>
          <div>
            <Form>
              <Form.Group>
                <Form.Input
                  placeholder='Number of sessions'
                  name='numsesh'
                  value={numsesh}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </div>
          <DataTable
            noHeader
            columns={sessioncolumns}
            data={sessionlist}
            keyField={sessionlist.start}
            dense
            pagination
            defaultSortField='date'
            theme='dark'
            highlightOnHover
          />
        </Container>
      </div>
    );
  }
}

export default Generate;

import React from 'react';
import { Icon, Table, Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Sessions table. See pages/ListStudySessions.jsx. */
class ViewSession extends React.Component {
  render() {
    return (
        <Grid divided="vertically">
          <Grid.Row>
            <Grid.Column><Header as='h1'>{this.props.studysession.course}</Header></Grid.Column>
            <Grid.Column><Header as='h1'>{this.props.studysession.topic}</Header></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column><Header as='h2'>{this.props.studysession.date}</Header></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column><Header as='h2'>{this.props.studysession.timeBegin}</Header></Grid.Column>
            <Grid.Column><Header as='h2'>{this.props.studysession.timeEnd}</Header></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Header as='h2'>Owner: {this.props.studysession.owner}</Header>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require a document to be passed to this component. */
ViewSession.propTypes = {
  studysession: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ViewSession);

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon, Button, Loader, Image, Label, Segment, Grid, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import dayjs from 'dayjs';
import { UserProfiles } from '../../api/userprofiles/UserProfiles';
import { StudySessions } from '../../api/studysessions/StudySessions';
import profileStyle from '../components/sessions/profilestyle';
import SessionCard from '../components/sessions/SessionCard';
import EditProfile from '../components/profile/EditProfile';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  TopInfo,
  Owner,
  Major,
  Avatar,
  Stats,
  MiddleInfo,
  SessionDate,
  SessionTime,
  SessionDesc,
  BottomInfo,
  JoinButton,
  LeaveButton,
  EditButton,
  NumberParticipants,
  Participants,
  Grasshoppers,
  Senseis,
  ParticipantAvatars,
  AvatarGH,
  AvatarSS,
  AvatarNum,
  SessionDateLength,
  SessionLength,
} from '../components/profile/profile';

const MySwal = withReactContent(Swal);

const columns = [
  {
    name: 'DATE',
    selector: 'start',
    compact: true,
    style: {
      fontSize: '10px',
      color: 'rgba(255, 255, 255, 0.5)',
      paddingLeft: '5px',
      paddingRight: '5px',
    },
    width: '80px',
    format: row => dayjs(row.start).format('MM/DD h:mm A'),
  },
  {
    name: 'TOPIC',
    selector: 'topic',
    compact: true,
    maxWidth: '159px',
  },
];

/** A simple static component to render some text for the landing page. */
class Profile2 extends React.Component {

  editProfilePop(id) {
    MySwal.fire({
      showConfirmButton: false,
      background: 'transparent',
      width: 275,
      padding: '0',
      html: <EditProfile doc={id} />,
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    console.log(Meteor.user());

    const profile = this.props.userprofile;
    const { name, avatar, bio, points, major, year } = this.props.userprofile;

    return (
      <Card>
        <CardHeader>
            <Owner>
              {name.first} {name.last}
            </Owner>
            <Major>
              {major}
            </Major>
        </CardHeader>
        <CardBody>
          <TopInfo>
            <Avatar avatar={avatar}/>
            <Stats>
              <span>Verified Student</span>
              <span>Joined:</span>
              <span>Active:</span>
            </Stats>
            <Stats>
              <span>Year:</span>
              <span>Created:</span>
              <span>Attended:</span>
            </Stats>
          </TopInfo>
        </CardBody>
        <CardFooter>

        </CardFooter>
      </Card>
    );
  }
}

/** Require an array of StudySessions in the props. */
Profile2.propTypes = {
  // userprofile: PropTypes.array.isRequired,
  userprofile: PropTypes.object,
  studysessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Sessions.
  const subscription1 = Meteor.subscribe('UserProfiles');
  const subscription2 = Meteor.subscribe('StudySessions');
  return {
    studysessions: StudySessions.find({}).fetch(),
    // userprofile: UserProfiles.find({}).fetch(),
    userprofile: UserProfiles.findOne({}),
    ready: subscription1.ready() && subscription2.ready(),
  };
})(Profile2);

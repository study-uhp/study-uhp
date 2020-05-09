import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import dayjs from 'dayjs';
import { Icon, Loader } from 'semantic-ui-react';
import { UserProfiles } from '../../../api/userprofiles/UserProfiles';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  TopInfo,
  Course,
  OwnerInfo,
  Avatar,
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
} from './card';

const mockdata = {
  name: {
    first: 'Study',
    last: 'UHp',
  },
  avatar: '/images/studyuhp_logo_square.png',
  course: 'COURSE',
  topic: 'Session Topic',
  description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. ' +
    'Maxime recusandae fuga quae autem ad provident minima perfer.',
  start: dayjs(),
  end: dayjs(),
  owner: 'studyuhp@hawaii.edu',
  participants: {
    grasshopper: [],
    sensei: [],
  },
};

class SessionCard extends React.Component {

  /** Pass in a user, get back the url to their avatar */
  getUserAvatar = (user) => {
    const profile = _.find(
      this.props.userprofiles, function (obj) {
        return obj.user === user;
      },
    );

    return profile.avatar;
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    /**
     *  Destructure the studdysession prop to make the conditional statements simpler.
     *  If the user has not clicked on a study session this is actually an empty object
     *  and the card will default to using the values in its state.
     */
    const {
      course,
      topic,
      description,
      start,
      end,
      owner,
      participants,
    } = this.props.studysession;

    /** These two arrays hold the list of avatar images for the session particpants */
    const grasshopperList = [];
    const senseiList = [];

    /** The number of avatars to display on the card before show '+...' */
    const displayAvatars = 3;

    /** For each participant in the list, get their avatar */
    if (participants) {
      participants.grasshopper.forEach(
        user => grasshopperList.push(
          this.getUserAvatar(user),
        ),
      );
      participants.sensei.forEach(
        user => senseiList.push(
          this.getUserAvatar(user),
        ),
      );
    }

    /** Get the name and avatar of who created the session, or mock data. */
    const { name, avatar } = owner
      ? _.find(
        this.props.userprofiles, function (obj) {
          return obj.user === owner;
        },
      )
      : {
        name: mockdata.name,
        avatar: mockdata.avatar,
      };

    let button;
    const username = Meteor.user().username;

    if (participants) {
      if (owner === Meteor.user().username) {
        button = <EditButton>EDIT SESSION</EditButton>;
      }
      if (_.contains(participants.grasshopper, username) || _.contains(participants.sensei, username)) {
        button = <LeaveButton>LEAVE SESSION</LeaveButton>;
      } else {
        button = <JoinButton>JOIN SESSION</JoinButton>;
      }
    } else {
      button = <JoinButton>JOIN SESSION</JoinButton>;
    }

    return (
      /**
       *  If no studysession is passed in from the user clicking on the table, gray out the card.
       *  Picking 'topic' is arbitrary, any empty value means a session has not been passed. The
       *  logic for displaying the rest of the card info is basically the same. Yes, wrapper hell.
       */
      <div style={ topic ? {} : { opacity: '.2', pointerEvents: 'none' } }>
        <Card>
          <CardHeader>
            <span>{ topic || mockdata.topic }</span>
          </CardHeader>
          <CardBody>
            <TopInfo>
              <Course>{ course ? `ICS ${course}` : mockdata.course }</Course>
              <OwnerInfo>
                <span style={{
                  fontSize: '.6rem',
                  color: 'rgba(0,0,0,.5)',
                }}>
                  STARTED BY
                </span>
                <span>
                  {name.first} {name.last}
                </span>
              </OwnerInfo>
              <Avatar avatar={avatar}/>
            </TopInfo>
            <MiddleInfo>
              <SessionDateLength>
                <SessionDate>
                  {
                    start
                    ? dayjs(start).format('ddd MMM D')
                    : mockdata.start.format('ddd MMM D')
                  }
                </SessionDate>
                <SessionLength>
                  <Icon name='clock outline'/>
                  {
                    start
                    ? `${dayjs(end).diff(dayjs(start), 'm')} min`
                    : `${mockdata.end.diff(mockdata.start, 'm')} min`
                  }
                </SessionLength>
              </SessionDateLength>
              <SessionTime>
                {
                  start
                  ? dayjs(start).format('hh:mm A')
                  : mockdata.start.format('hh:mm A')
                } - {
                  end
                  ? dayjs(end).format('hh:mm A')
                  : mockdata.end.format('hh:mm A')
                }
              </SessionTime>
              <SessionDesc>
                { description || mockdata.description }
              </SessionDesc>
            </MiddleInfo>
          </CardBody>
              <CardFooter>
            <BottomInfo>
                {button}
            </BottomInfo>
            <NumberParticipants>
              {
                participants
                ? grasshopperList.length + senseiList.length
                : ''
              } OTHER PARTICIPANTS
            </NumberParticipants>
            <Participants>
              <Grasshoppers>
                GRASSHOPPERS
                <Participants>
                  <ParticipantAvatars>
                    {/* Only display the '+..' if the participants number exceeds set amount */}
                    {
                      grasshopperList.length > displayAvatars
                      ? (
                        <AvatarNum>
                          +{grasshopperList.length - displayAvatars}
                        </AvatarNum>
                      )
                      : ''
                    }
                    {/* Return the avatar of each participant, up to set amount */}
                    {
                      participants
                      ? (
                        _.first(grasshopperList, displayAvatars).map(
                          item => <AvatarGH key={item} avatar={item}/>,
                        )
                      )
                      : ''
                    }
                  </ParticipantAvatars>
                </Participants>
              </Grasshoppers>
              <Senseis>
                SENSEIS
                <Participants>
                  <ParticipantAvatars>
                    {/* Only display the '+..' if the participants number exceeds set amount */}
                    {
                      senseiList.length > displayAvatars
                      ? (
                        <AvatarNum>
                          +{senseiList.length - displayAvatars}
                        </AvatarNum>
                      )
                      : ''
                    }
                    {/* Return the avatar of each participant, up to set amount */}
                    {
                      participants
                      ? (
                        _.first(senseiList, displayAvatars).map(
                          item => <AvatarSS key={item} avatar={item}/>,
                        )
                      )
                      : ''
                    }
                  </ParticipantAvatars>
                </Participants>
              </Senseis>
            </Participants>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

SessionCard.propTypes = {
  studysession: PropTypes.object.isRequired,
  userprofiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to all user profiles.
  const subscription = Meteor.subscribe('AllUserProfiles');
  return {
    userprofiles: UserProfiles.find({}).fetch(),
    ready: subscription.ready(),
  };
})(SessionCard);

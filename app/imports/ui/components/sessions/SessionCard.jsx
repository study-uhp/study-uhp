import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserProfiles } from '../../../api/userprofiles/UserProfiles';
import { _ } from 'meteor/underscore';
import dayjs from 'dayjs';
import { 
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  TopInfo,Course,
  OwnerInfo,
  Avatar,
  MiddleInfo,
  SessionDate,
  SessionTime,
  SessionDesc,
  BottomInfo,
  JoinButton,
  NumberParticipants,
  Participants,
  Grasshoppers,
  Senseis,
  ParticipantAvatars,
  AvatarGH,
  AvatarSS,
  AvatarNum,
  SessionDateLength,
  SessionLength
} from './card';
import { Icon } from 'semantic-ui-react';

const mockdata = {
  name: {
    first: 'USER',
    last: 'NAME',
  },
  avatar: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
  course: 'COURSE',
  topic: 'SESSION TOPIC',
  description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. ' +
    'Maxime recusandae fuga quae autem ad provident minima perfer.',
  start: dayjs(),
  end: dayjs(),
  owner: 'studyuhp@hawaii.edu',
  participants: {
    grasshopper: [],
    sensei: [],
  }
}

class SessionCard extends React.Component {

  handleClick = () => {
    // console.log(UserProfiles.find({}).fetch());
    // console.log(_.where(this.props.userprofiles, { user: Meteor.user().username }));
    // console.log(_.filter(this.props.userprofiles, function (obj) { return obj.user === Meteor.user().username }));
    // console.log(_.find(this.props.userprofiles, function (obj) { return obj.user === Meteor.user().username }));
    console.log(this.props.studysession.participants.grasshopper)
  }
  handleClick2 = (list) => {
    // console.log(UserProfiles.find({}).fetch());
    // console.log(_.where(this.props.userprofiles, { user: Meteor.user().username }));
    // console.log(_.filter(this.props.userprofiles, function (obj) { return obj.user === Meteor.user().username }));
    // console.log(_.find(this.props.userprofiles, function (obj) { return obj.user === Meteor.user().username }));
    console.log(list)
  }

  getUserAvatar = (owner) => {
    const sessionowner = _.find(
      this.props.userprofiles, function (obj) {
        return obj.user === owner
      });

    return sessionowner.avatar;
  }

  render() {
    /** 
     *  Destructure the studdysession prop to make the conditional statements simpler.
     *  If the user has not clicked on a study session this is actually an empty object
     *  and the card will default to using the values in its state.
     */
    const { course, topic, description, start, end, owner, participants } = this.props.studysession;
    // const avatar = owner ? this.getUserAvatar(owner) : 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg';
    
    const grasshopperList = [];
    const senseiList = [];
    const displayAvatars = 3;

    participants ? participants.grasshopper.forEach(user => grasshopperList.push(this.getUserAvatar(user))) : '';
    participants ? participants.sensei.forEach(user => senseiList.push(this.getUserAvatar(user))) : '';

    const { name, avatar } = owner ? _.find(
      this.props.userprofiles, function (obj) {
        return obj.user === owner
      }
      ) : { name: mockdata.name, avatar: mockdata.avatar }

    return (
      /**
       *  If no studysession is passed in from the user clicking on the table, gray out the card.
       *  Picking 'topic' is arbitrary, any empty value means a session has not been passed. The
       *  logic for displaying the rest of the card info is basically the same.
       */
      <div style={ topic ? {} : { opacity: '.2', pointerEvents: 'none' } }>
        <Card>
          <CardHeader>
            <span>{ topic ? topic : mockdata.topic }</span>
          </CardHeader>
          <CardBody>
            <TopInfo>
              <Course>{ course ? 'ICS ' + course : mockdata.course }</Course>
              <OwnerInfo>
                <span style={{ fontSize: '.6rem', color: 'rgba(0,0,0,.5)' }}>STARTED BY</span>
                <span>{name.first} {name.last}</span>
              </OwnerInfo>
              <Avatar avatar={avatar}/>
            </TopInfo>
            <MiddleInfo>
              <SessionDateLength>
                <SessionDate>{ start ? dayjs(start).format('ddd MMM D') : mockdata.start.format('ddd MMM D') }</SessionDate>
                <SessionLength>
                  <Icon name='clock outline'/>
                  { start ? 
                  dayjs(end).diff(dayjs(start), 'm') + ' min' : mockdata.end.diff(mockdata.start, 'm') + ' min' }
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
                { description ? description : mockdata.description }
              </SessionDesc>
            </MiddleInfo>
            <BottomInfo>
              <JoinButton onClick={() => this.handleClick2(grasshopperList)}>JOIN SESSION</JoinButton>
            </BottomInfo>
          </CardBody>
          <CardFooter>
            <NumberParticipants>
              {grasshopperList.length + senseiList.length} OTHER PARTICIPANTS
            </NumberParticipants>
            <Participants>
              <Grasshoppers>
                <span style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.5)' }}>GRASSHOPPERS</span>
                <Participants>
                  <ParticipantAvatars>
                    {grasshopperList.length > displayAvatars ? (
                      <AvatarNum>
                        +{grasshopperList.length - displayAvatars}
                      </AvatarNum>
                    ) : ''}
                    { participants ? (
                        _.first(grasshopperList, displayAvatars).map(
                          item => <AvatarGH key={item} avatar={item}/>
                        )
                      ) : ''
                    }
                  </ParticipantAvatars>
                </Participants>
              </Grasshoppers>
              <Senseis>
                <span style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.5)' }}>SENSEIS</span>
                <Participants>
                  <ParticipantAvatars>
                    {senseiList.length > displayAvatars ? (
                      <AvatarNum>
                        +{senseiList.length - displayAvatars}
                      </AvatarNum>
                    ) : ''}
                    { participants ? (
                        _.first(senseiList, displayAvatars).map(
                          item => <AvatarSS key={item} avatar={item}/>
                        )
                      ) : ''
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

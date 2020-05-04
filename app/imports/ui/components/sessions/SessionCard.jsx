import React from 'react';
import PropTypes from 'prop-types';
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
  AvatarSS
} from './card';

class SessionCard extends React.Component {
  constructor(props) {
    super(props);

    /** Give the card a default state with placeholder info */
    this.state = {
      topic: 'SESSION TOPIC',
      course: 'COURSE',
      owner: 'studyuhp@hawaii.edu',
      date: '05/05/2020',
      timeBegin: '09:00:00 AM',
      timeEnd: '10:00:00 AM',
    };
}

  render() {
    /** 
     *  Destructure the studdysession prop to make the conditional statements simpler.
     *  If the user has not clicked on a study session this is actually an empty object
     *  and the card will default to using the values in its state.
     */
    const { topic, course, date, timeBegin, timeEnd, owner } = this.props.studysession;

    return (
      /**
       *  If no studysession is passed in from the user clicking on the table, gray out the card.
       *  Picking 'topic' is arbitrary, any empty value means a session has not been passed. The
       *  logic for displaying the rest of the card info is basically the same.
       */
      <div style={ topic ? { opacity: '1' } : { opacity: '.2', pointerEvents: 'none' } }>
        <Card>
          <CardHeader>
            <span>{ topic ? topic : this.state.topic }</span>
          </CardHeader>
          <CardBody>
            <TopInfo>
              <Course>{ course ? course : this.state.course }</Course>
              <OwnerInfo>
                <span style={{ fontSize: '.6rem', color: 'rgba(0,0,0,.5)' }}>STARTED BY</span>
                <span>{ owner ? owner : this.state.owner }</span>
              </OwnerInfo>
              <Avatar avatar="https://react.semantic-ui.com/images/avatar/small/matthew.png"/>
            </TopInfo>
            <MiddleInfo>
              <SessionDate>{ date ? date : this.state.date }</SessionDate>
              <SessionTime>
                { timeBegin ? timeBegin : this.state.timeBegin } - { timeEnd ? timeEnd : this.state.timeEnd }
              </SessionTime>
              <SessionDesc>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime recusandae fuga quae autem ad provident minima perfer.
              </SessionDesc>
            </MiddleInfo>
            <BottomInfo>
              <JoinButton>JOIN SESSION</JoinButton>
            </BottomInfo>
          </CardBody>
          <CardFooter>
            <NumberParticipants>
              5 OTHER PARTICIPANTS
            </NumberParticipants>
            <Participants>
              <Grasshoppers>
                <span style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.5)' }}>GRASSHOPPERS</span>
                <ParticipantAvatars>
                  <AvatarGH avatar="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"/>
                  <AvatarGH avatar="https://react.semantic-ui.com/images/avatar/small/steve.jpg"/>
                  <AvatarGH avatar="https://react.semantic-ui.com/images/avatar/small/matthew.png"/>
                </ParticipantAvatars>
              </Grasshoppers>
              <Senseis>
                <span style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.5)' }}>SENSEIS</span>
                <ParticipantAvatars>
                  <AvatarSS avatar="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"/>
                  <AvatarSS avatar="https://react.semantic-ui.com/images/avatar/small/jenny.jpg"/>
                  <AvatarSS avatar="https://react.semantic-ui.com/images/avatar/small/molly.png"/>
                </ParticipantAvatars>
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
};

export default SessionCard;

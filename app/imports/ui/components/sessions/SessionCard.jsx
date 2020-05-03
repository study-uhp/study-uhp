import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Loader } from 'semantic-ui-react';

const Card = styled.div`
  width: 275px;
  margin: auto;
  border-radius: 5px;
  position: relative;
  text-align: center;
  box-shadow: -1px 5px 10px -6px black;
  z-index: 9999;
`

const CardHeader =  styled.div`
  min-height: 3.5rem;
  background: #1b1c1d;
  color: rgba(255,255,255,.87);
  font-weight: bold;
  text-align: left;
  padding-top: .5rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

const CardBody = styled.div`
  background: #606465;
  min-height: 100px;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
`

const CardFooter = styled.div`
  min-height: 70px;
  background: #393D3F;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`

const TopInfo = styled.div`
  display: flex;
  margin-bottom: .5rem;
  justify-content: space-between;
  margin-top: -1.75rem;
`

const Course = styled.div`
  background: #1b1c1d;
  color: rgba(255,255,255,.87);
  border-radius: 5px;
  border: 2px solid #1b1c1d;
  margin-bottom: 2rem;
  margin-top: -.25rem;
  padding-left: .5rem;
  padding-right: .5rem;
  font-size: .75rem;
`
const OwnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  padding: 0;
  background: #606465;
  font-size: .75rem;
  text-align: right;
  line-height: 1rem;
  margin-top: .75rem;
  margin-right: .25rem;
`

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(https://react.semantic-ui.com/images/avatar/large/matthew.png);
  background-size: contain;
  border: 2px solid #606465;
  margin-top: -.25rem;
`

const MiddleInfo = styled.div`
  display: flex;
  margin-bottom: 2rem;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
`
const SessionDate = styled.div`
  font-weight: bold;
`
const SessionTime = styled.div`
  color: rgba(0,0,0,.5);
  font-size: .75rem;
`
const SessionDesc = styled.div`
  color: rgba(0,0,0,.87);
  padding-top: 1rem;
`

const BottomInfo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: -2rem;
`
const JoinButton = styled.button`
  background-color: #005325;
  color: rgba(255,255,255,.87);
  font-weight: 700;
  border-style: none;
  padding: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: .5rem;
  padding-bottom: .5rem;
  border-radius: 25px;
  cursor: pointer;
`
const NumberParticipants = styled.div`
  text-align: center;
  color: rgba(255,255,255,.6);
  font-size: .8rem;
  padding-top: .5rem;
  padding-bottom: .5rem;
`
const Participants = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const Grasshoppers = styled.div`
  display: flex;
  flex-direction: column;
`

const Senseis = styled.div`
  display: flex;
  flex-direction: column;
`

const ParticipantAvatars = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  margin-right: .5rem;
`

const AvatarGH = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: url(${props => props.avatar});
  background-size: contain;
  margin-right: -.5rem;
  border: 2px solid #3A7D44;
  box-shadow: -1px 5px 5px -6px black;
`

const AvatarSS = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: url(${props => props.avatar});
  background-size: contain;
  margin-right: -.5rem;
  border: 2px solid #254D32;
  box-shadow: -1px 5px 5px -6px black;
`

class SessionCard extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.studysession) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <div>
        <Card>
          <CardHeader>
            <span>{this.props.studysession.topic}</span>
          </CardHeader>
          <CardBody>
            <TopInfo>
              <Course>{this.props.studysession.course}</Course>
              <OwnerInfo>
                <span style={{ fontSize: '.6rem', color: 'rgba(0,0,0,.5)' }}>STARTED BY</span>
                <span>{this.props.studysession.owner}</span>
              </OwnerInfo>
              <Avatar/>
            </TopInfo>
            <MiddleInfo>
              <SessionDate>{this.props.studysession.date}</SessionDate>
              <SessionTime>{this.props.studysession.timeBegin} - {this.props.studysession.timeEnd}</SessionTime>
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
  studysession: PropTypes.object,
};

export default SessionCard;

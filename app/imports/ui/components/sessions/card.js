import styled from 'styled-components';

/** Custom styles for each sub-component of the card layout */
export const Card = styled.div`
  width: 275px;
  margin: auto;
  border-radius: 5px;
  position: relative;
  text-align: center;
  box-shadow: -1px 5px 10px -6px black;
  z-index: 9999;
`
export const CardHeader =  styled.div`
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
export const CardBody = styled.div`
  background: #606465;
  min-height: 100px;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
`
export const CardFooter = styled.div`
  min-height: 70px;
  background: #393D3F;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`
export const TopInfo = styled.div`
  display: flex;
  margin-bottom: .5rem;
  justify-content: space-between;
  margin-top: -1.75rem;
`
export const Course = styled.div`
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
export const OwnerInfo = styled.div`
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
export const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(${props => props.avatar});
  background-size: contain;
  border: 2px solid #606465;
  margin-top: -.25rem;
`
export const MiddleInfo = styled.div`
  display: flex;
  margin-bottom: 2rem;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
`
export const SessionDateLength = styled.div`
  display: flex;
  justify-content: space-between;
`
export const SessionDate = styled.div`
  font-weight: bold;
  line-height: 1rem;
  color: rgba(0,0,0,.67);
`
export const SessionLength = styled.div`
  font-weight: bold;
  line-height: 1rem;
  font-size: .75rem;
  color: rgba(0,0,0,.37);
`
export const SessionTime = styled.div`
  color: rgba(0,0,0,.5);
  font-size: .75rem;
`
export const SessionDesc = styled.div`
  color: rgba(0,0,0,.87);
  padding-top: 1rem;
`

export const BottomInfo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: -2rem;
`
export const JoinButton = styled.button`
  background-color: rgb(0, 83, 37);
  color: rgba(255,255,255,.87);
  font-weight: 700;
  border-style: none;
  padding: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: .5rem;
  padding-bottom: .5rem;
  border-radius: 25px;
  &:hover {
    cursor: pointer;
    background-color: rgb(0, 100, 45); // <Thing> when hovered
  }
`
export const NumberParticipants = styled.div`
  text-align: center;
  color: rgba(255,255,255,.6);
  font-size: .8rem;
  padding-top: .5rem;
  padding-bottom: .5rem;
`
export const Participants = styled.div`
  display: flex;
  justify-content: space-evenly;
`
export const Grasshoppers = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  font-size: .6rem;
  color: rgba(255,255,255,.5);
`
export const Senseis = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  font-size: .6rem;
  color: rgba(255,255,255,.5);
`
export const ParticipantAvatars = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  margin-right: .5rem;
`
export const AvatarGH = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: url(${props => props.avatar});
  background-size: contain;
  margin-right: -.5rem;
  border: 2px solid #3A7D44;
  box-shadow: -1px 5px 5px -6px black;
`
export const AvatarSS = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: url(${props => props.avatar});
  background-size: contain;
  margin-right: -.5rem;
  border: 2px solid #254D32;
  box-shadow: -1px 5px 5px -6px black;
`
export const AvatarNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 10px;
  border-radius: 50%;
  color: rgba(255, 255, 255, .67);
  background-color: rgba(27, 28, 29, .5);
  margin-right: -.5rem;
  /* border: 2px solid #254D32; */
  box-shadow: -1px 5px 5px -6px black;
`

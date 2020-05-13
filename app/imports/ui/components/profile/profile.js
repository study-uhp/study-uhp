import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  margin: auto;
  margin-top: 60px;
  z-index: -1;
`;

/** Custom styles for each sub-component of the card layout */
export const Card = styled.div`
  width: 400px;
  margin: auto;
  border-radius: 5px;
  position: relative;
  text-align: center;
  box-shadow: -1px 5px 10px -6px black;
  z-index: 9999;
`;
export const CardHeader = styled.div`
  min-height: 4.5rem;
  background: #1b1c1d;
  color: rgba(255,255,255,.87);
  text-align: right;
  padding-top: .5rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;
export const CardBody = styled.div`
  background: #606465;
  min-height: 17.214rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;
export const CardFooter = styled.div`
  min-height: 4rem;
  background: #393D3F;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;
export const Owner = styled.div`
  padding: 0;
  font-size: 1.75rem;
  font-weight: bold;
  line-height: 1rem;
  margin-top: .5rem;
  margin-right: .5rem;
`;
export const Major = styled.div`
  padding: 0;
  color: rgba(255, 255, 255, .5);
  line-height: 1rem;
  margin-top: .5rem;
  margin-right: .5rem;
`;
export const TopInfo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;
  margin-top: -.75rem;
`;
export const Avatar = styled.div`
  width: 125px;
  height: 125px;
  border-radius: 50%;
  background-color: #606465;
  background-image: url(${props => props.avatar});
  background-size: contain;
  border: 2px solid #606465;
  margin-top: -3.5rem;
  box-shadow: -1px 5px 10px -6px black;
`;
export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  font-size: .85rem;
  text-align: right;
`;
export const MiddleInfo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  margin-right: 1.5rem;
  margin-left: 1.5rem;
  flex-direction: column;
  text-align: left;
`;
export const CourseHeader = styled.h5`
  color: rgba(0, 0, 0, 0.5);
  text-align: left;
  margin-bottom: .5rem;
  margin-top: .5rem;
`;
export const CourseList = styled.div`
  display: flex;
  margin-bottom: .5rem;
  flex-direction: row;
  justify-content: flex-start;
`;

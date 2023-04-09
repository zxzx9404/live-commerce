import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { choiceWatchingBroadCast, StartBroadcastAsync } from "../../reducers/broadcastSlice";


const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  display: grid;
  grid-template-columns: 2fr 10fr;
  border: 1px solid grey;
  border-radius: 8px;
  background: white;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonDiv = styled.div`
  float: right;
`;

const TitleText = styled.p`
  font-size: 20px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const ContentText = styled.p`
  display: flex;
  font-size: 15px;
  margin-right: 20px;
  align-items: center;
  justify-content: center;
`;

const SLiveButton = styled.button`
  background-color: white;
  border-radius: 8px;
  border: 1px solid red;
  color: red;
  :hover {
    background-color: red;
    color: white;
  }
`;

const SItemImg = styled.img`
  height: 100px;
  width: 100px;
`;

const STextDiv = styled.div`
  text-align: left;
  margin-top: 15px;
  margin-left: 20px;
`;


function MyBroadcastListItem(props) {
  const { myBroadcast, onClick } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickLive = () => {
    dispatch(choiceWatchingBroadCast(myBroadcast))
    dispatch(StartBroadcastAsync(myBroadcast.broadcastId))
    navigate(`/live/${myBroadcast.broadcastId}`)
  }
  return (
    <Wrapper>
      <div>
        <SItemImg src={myBroadcast.imagePath} alt="이미지샘플"/>
      </div>
      <STextDiv>
        <TitleDiv>
          <TitleText onClick={onClick}>{myBroadcast.broadcastTitle}</TitleText>
          <ButtonDiv>
            <SLiveButton
              onClick={onClickLive}
              >Go Live</SLiveButton>
          </ButtonDiv>
        </TitleDiv>
        <ContentDiv>
          <ContentText>{myBroadcast.broadcastDescription}</ContentText>
          <ContentText>{myBroadcast.broadcastReservationTime}</ContentText>
        </ContentDiv>
      </STextDiv>
    </Wrapper>
  );
}

export default MyBroadcastListItem
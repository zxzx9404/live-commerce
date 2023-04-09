import React from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { searchDetailItemAsync } from "../../reducers/itemSlice"
import logosample from "../../assets/logo.png"


const SCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 400px;
  margin-left: 25px;
  margin-right: 25px;
  margin-bottom: 0px;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  :hover {
    background: lightgrey;
  }
  text-align: center;
`;


const SCardImg = styled.img`
  width: 248px;
  height: 250px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const SCardBodyDiv = styled.div`
  // width: 100%;
`;

const SCardTitleP = styled.p`
  margin-top: 10px;
  font-size: 30px;
`;

const SCardContentP = styled.p`
  font-size: 20px;
`;


function SearchItem(props) {
  const broadcast = props.broadcast
  const time = broadcast.broadcastReservationTime.split('T')

  const dispatch = useDispatch();
  
  const onClick = () => {
    dispatch(searchDetailItemAsync(broadcast.item_id))
  }
  
  return (
      <SCardDiv onDoubleClick={onClick}>
        <SCardImg variant="top" src={logosample} alt="이미지" />
        <SCardBodyDiv>
          <SCardTitleP>{broadcast.broadcastTitle}</SCardTitleP>
          <SCardContentP>{time[0]} {time[1]}</SCardContentP>
          <SCardContentP>{broadcast.broadcastDescription}</SCardContentP>
        </SCardBodyDiv>
      </SCardDiv>
    )
}

export default SearchItem;
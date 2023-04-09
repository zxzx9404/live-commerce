import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyBroadcastList from "./MyBroadcastList";
import Pagination from "../common/ui/Pagination";
import { useSelector } from 'react-redux';

const SItemDiv = styled.div`
  width: 100%;
  max-width: 70%;
  border-radius: 8px;
  margin-left: 10px;
`;

function MyBroadcast() {

  const navigate = useNavigate();


  const limit = 5 // 한 페이지에 나올 매물 수
  const [page, setPage] = useState(1); // 페이지
  const offset = (page - 1) * limit; // 페이지별 매물들을 받아오기 위한 index offset


  const { myBroadcast } = useSelector((state) => state.broadcastSlice);

  return (
    <SItemDiv>
      { myBroadcast ? <div><MyBroadcastList
        myBroadcasts={myBroadcast.slice(offset, offset+limit)}
        onClickItem={(item) => {
          navigate(`/broadcasts/${item.broadcast_id}`);
        }}
      />
      <Pagination
        total={myBroadcast.length}
        limit={limit}
        page={page}
        setPage={setPage}
      /></div> : <></>}
    </SItemDiv>
  )
}

export default MyBroadcast;
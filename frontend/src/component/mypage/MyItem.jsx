import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "./PostList";
import Pagination from "../common/ui/Pagination";
import { useSelector } from 'react-redux';

const ItemDiv = styled.div`
  width: 100%;
  max-width: 70%;
  height: 700px;
  border-radius: 8px;
  margin-left: 10px;
`;

function MyItem() {

  const navigate = useNavigate();


  const limit = 5 // 한 페이지에 나올 매물 수
  const [page, setPage] = useState(1); // 페이지
  const offset = (page - 1) * limit; // 페이지별 매물들을 받아오기 위한 index offset

  const { myItem } = useSelector((state) => state.itemSlice);

  return (
    <ItemDiv>
      { myItem ? <div><PostList
        posts={myItem.slice(offset, offset+limit)}
        onClickItem={(item) => {
          navigate(`/mypage/myitem/${item.id}`);
        }}
      />
      <Pagination
        total={myItem.length}
        limit={limit}
        page={page}
        setPage={setPage}
      /></div> : <></>}
    </ItemDiv>
  )
}

export default MyItem;
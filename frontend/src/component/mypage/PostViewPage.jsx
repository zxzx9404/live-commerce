import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/ui/Button";
import data from "../../data.json";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 70%;
`;

const SPostContainerDiv = styled.div`
  padding: 8px 16px;
  border: 1px solid grey;
  border-radius: 8px;
`;

const STitleTextP = styled.p`
  font-size: 30px;
  font-weight: 500;
  align-items: center;
  justify-content: center;
`;

const SContentTextP = styled.p`
  font-size: 20px;
  white-space: pre-wrap;
  align-items: center;
  justify-content: center;
`;

function PostViewPage() {
  const navigate = useNavigate();
  const {postId} = useParams();
  const post = data.find((item) => {
    return parseInt(item.id) === parseInt(postId);
  });
  
  return (
    <Wrapper>
      <Container>
        <Button
          title="뒤로 가기"
          onClick={() => {
            navigate(-1);
          }}
        />
        <SPostContainerDiv>
          <STitleTextP>{post.title}</STitleTextP>
          <SContentTextP>{post.type}</SContentTextP>
          <SContentTextP>{post.building_type}</SContentTextP>
          <SContentTextP>{post.manage_fee}</SContentTextP>
        </SPostContainerDiv>
        <Button
          title="방송 등록"
          onClick={() => {
            navigate(`/broadcasts/new`);
          }}
        />
      </Container>
    </Wrapper>
  )
}

export default PostViewPage;
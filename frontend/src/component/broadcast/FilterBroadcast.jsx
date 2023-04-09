import React from 'react';
import { useSelector } from 'react-redux';
import Filter from "../common/Filter";
import FilterButton from "../common/FilterButton";
import styled from "styled-components";
import ItemList from "../item/ItemList";
import SearchBroadcast from "../item/SearchBroadcast";

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 30px;
    align-items: flex-start;
    justify-content: center;
    white-space: nowrap;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
    &::-webkit-scrollbar {
      display: none;
    }
`;

const SButtonLineDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr 2fr;
`;

function FilterBroadcast() {
  const { filterBroadcast } = useSelector((state) => state.filterSlice);
  
  return (
    <div>
      <SButtonLineDiv>
        <div />
        <FilterButton />
      </SButtonLineDiv>
      <div id="filterDiv" style={{ display: "none" }}>
        <Filter />
      </div>
      <Wrapper>
        <h2>방송 검색 결과</h2>
      </Wrapper>
      <ItemList>
      {filterBroadcast && filterBroadcast.length ? filterBroadcast.map((broadcast, index) => (
        <SearchBroadcast
        broadcast={broadcast}
        />
      )
        ) : <h3>검색 결과가 없습니다...</h3>}
      </ItemList>
    </div>
  )
}

export default FilterBroadcast;
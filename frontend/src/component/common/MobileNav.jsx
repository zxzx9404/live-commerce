import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import mypagelogo from "../../assets/mypagelogo.png"
import logo from "../../assets/logo.png"
import searchbutton from "../../assets/searchbutton.png"
import axios from "axios";
import SearchInfoModal from "./ui/SearchInfoModal";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../reducers/userSlice";
import { FaSignOutAlt } from "react-icons/fa";


const Navbar = styled.nav`
  position: flex;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #F8EDE3;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const NavDiv = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background: #DFD3C3;
  }
`;

const NavSearchBarDiv = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const NavLeftDiv = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  margin-left: 20px;
`;

const NavRightDiv = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  margin-right: 20px;
`;


const activeStyle = {
  'textDecoration': 'none',
  color: '#289951',
  fontWeight: 700,
};

const nonActiveStyle = {
  'textDecoration': 'none',
  color: '#000000',
};

const SImg = styled.img`
  width: 30px;
  height: 30px;
`;

const SButton = styled.button`
  border-radius: 10px;
  margin-left: 10px;
  height: 35px;
  border: 0 solid black;
  background-color: #00ff0000; 
`;

const SLogoImg = styled.img`
  width: 40px;
  height: 40px;
`;

const SInput = styled.input`
  width: 300px;
  height: 35px;
  border-radius: 10px;
  border: 0 solid black;
`;

const SSelect = styled.select`
  margin-right: 2 0px;
  height: 40px;
  width: 200px;
  border-radius: 8px;
`;

const LogoutIcon = styled(FaSignOutAlt)`
  cursor: pointer;
  font-size: 30px;

`


const MobileNav = () => {
  // 메뉴 토글
  const [menuToggle, setMenuToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);

  
  // 로그인 여부 파악
  const { me } = useSelector((state) => state.userSlice);

  // 페이지 렌더링시 시도코드 받아오기
  useEffect(() => {
    axios.get('/items/sido')
    .then(res => {
      setSidoAll(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },[])


  // 시도 고르기
  const [sidoAll, setSidoAll] = useState('')
  const [sido, setSido] = useState('')
  const sidoSelect = (e) => {
    setSido(e.target.value)
    axios.get(`/items/gugun/${e.target.value}`)
    .then(res => {
      setGugunAll(res.data)
    })
    .catch(err => {
      alert('지역 정보를 받아오는데 실패하였습니다.')
      console.log(err)
    })
  };

  // 구군 고르기
  const [gugunAll, setGugunAll] = useState('')
  const [gugun, setGugun] = useState('')
  const gugunSelect = (e) => {
    setGugun(e.target.value)
    axios.get(`/items/dong/${e.target.value}`)
    .then(res => {
      setDongAll(res.data)
    })
    .catch(err => {
      alert('지역 정보를 받아오는데 실패하였습니다.')
      console.log(err)
    })
  };

  // 동 고르기
  const [dongAll, setDongAll] = useState('')
  const [dong, setDong] = useState('')
  const dongSelect = (e) => {
    setDong(e.target.value)
  };


  const [search, setSearch] = useState('');
  const onChange = (e) => {
          setSearch(e.target.value)
      }
 
  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      onClick()
    }
  }

  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logout());
    navigate("/")
  }

  const navigate = useNavigate();

  // 검색
  const onClick = () => {
    if (search || dong) {
      navigate(`/items/search/${search}&${dong}`)
      setSearch('')
      setGugunAll('')
      setDongAll('')
      setDong('')
    }
  }


  return (
    <Navbar>
      <NavLeftDiv>
        <NavDiv>
          <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/">
          <SLogoImg src={logo} alt="#" />
          </NavLink>
        </NavDiv>
        <NavDiv onClick={() => setMenuToggle(!menuToggle)}>
          <NavLink style={nonActiveStyle}>
            {menuToggle ? '닫기' : '메뉴'}
          </NavLink>
        </NavDiv>
        {menuToggle && <NavDiv>
          <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/broadcasts">
            방송
          </NavLink>
        </NavDiv>}
        {menuToggle && <NavDiv>
          <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/items">
            매물
          </NavLink>
        </NavDiv>}
        {menuToggle && <NavDiv>
          <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/interests">
            관심
          </NavLink>
        </NavDiv>}
      </NavLeftDiv>
      <NavRightDiv>
      <NavDiv onClick={() => setSearchToggle(!searchToggle)}>
          <NavLink style={nonActiveStyle}>
            {searchToggle ? '닫기' : '검색'}
          </NavLink>
        </NavDiv>
        {searchToggle && <NavSearchBarDiv>
          <SearchInfoModal />
          <SSelect onChange={sidoSelect}>
            <option value="" disabled selected style={{display: "none"}}>시/도</option>
            {(sidoAll) ? sidoAll.map((sido, index) => {
              return (
                <option key={sido.sidoCode} value={sido.sidoCode}>{sido.sidoName}</option>
              )
            }) : null}
          </SSelect>
          <SSelect onChange={gugunSelect}>
          <option value="" disabled selected style={{display: "none"}}>구/군</option>
            {(gugunAll) ? gugunAll.map((gugun, index) => {
              return (
                <option key={gugun.gugunCode} value={gugun.gugunCode}>{gugun.gugunName}</option>
              )
            }) : null}
          </SSelect>
          <SSelect onChange={dongSelect}>
          <option value="" disabled selected style={{display: "none"}}>동/리</option>
            {(dongAll) ? dongAll.map((dong, index) => {
              return (
                <option key={dong.dongCode} value={dong.dongCode}>{dong.dongName}</option>
              )
            }) : null}
          </SSelect>
        </NavSearchBarDiv>}
        {searchToggle && <NavSearchBarDiv>
           <SInput type="text" value={search} onChange={onChange} onKeyDown={(e) => activeEnter(e)} placeholder=" 검색어를 입력하세요" />
           <SButton disabled={(search || dong) ? false : true}><SImg src={searchbutton} alt="#" onClick={onClick} /></SButton>
        </NavSearchBarDiv>}
        { me ? <NavDiv><NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/mypage">
          <SImg src={mypagelogo} alt="#" />
          </NavLink></NavDiv> : <></>
          }
        <NavDiv>
        { me ? <LogoutIcon onClick={signOut}></LogoutIcon> : <NavLink style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)} to="/signin">
            로그인  
          </NavLink>
          }
        </NavDiv>
      </NavRightDiv>
    </Navbar>
  );
};

export default MobileNav;
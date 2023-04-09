import styled from "styled-components";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router";
import useInput from '../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from "react";
import { signInAsync, findPasswordAsync, clearFindPasswordDone } from "../../reducers/userSlice";
import kakao from "../../assets/kakaoLogin.png";
import naver from "../../assets/naverLogin.png";
import Swal from "sweetalert2";

const Wrapper = styled.div`
  display: flex;
  background-color: #F8EDE3;
  height: 100%;
  justify-content: center;
  text-align: center;

`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: white;
  width: 60%;
  @media (max-width:1024px){
    grid-template-columns: 1fr;
    width: 80%;
  }
  height: 50%;
  border-radius: 10px;
  margin: 200px auto;
`

const SLeftDiv = styled.div`
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  display: inline-block;
  @media (max-width:1024px){
    display: none;
  }
  width: 100%;
  height: 100%;
`

const SRightDiv = styled.form`
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 20px;
`

const SCustomInput = styled.input`
  width: 80%;
`

const SNormalButton = styled.button`
  background: #F8EDE3;
  margin-top: 1.5rem;
  width: 60%;
`;

const SSignUpP = styled.p`
  display: inline-block;
  font-size: 1rem;
  color: blue;
  cursor: pointer;
`;

const SImg = styled.img`
  width: 120px;
  height: 35px;
`;


function Login() {
  const navigate = useNavigate();
  const [userEmail, onChangeEmail] = useInput('');
  const [userPassword, onChangePassword] = useInput('');
  const { signInDone, findPasswordDone } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

  useEffect(() => {
    if (signInDone) {
      Swal.fire({
        icon: 'success',
        title: '로그인 성공!',
        showConfirmButton: false,
        timer: 500
      })
      navigate('/');
    }
  }, [signInDone])

  useEffect(() => {
    if (findPasswordDone) {
      dispatch(clearFindPasswordDone())
    }
  }, [findPasswordDone])

  
  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      signInButtonClick()
    }
  }

  const findPassword = () => {
    if (userEmail === "") {
      Swal.fire({
        icon: 'warning',
        title: '이메일을 입력해주세요!',
        showConfirmButton: false,
        timer: 1000
      })
      return
    }
    if (!regex.test(userEmail)) {
      Swal.fire({
        icon: 'warning',
        title: '이메일 형식으로 입력해주세요!',
        showConfirmButton: false,
        timer: 1000
      })
      return
    }
    Swal.fire({
      icon: 'info',
      title: '이메일로 임시 비밀번호를 발급하였습니다.',
      showConfirmButton: false,
      timer: 1000
    })
    dispatch(findPasswordAsync(
      {
        id: userEmail
      }
    ))
  }

  const signInButtonClick = useCallback(() => {
    if (!regex.test(userEmail)) {
      Swal.fire({
        icon: 'warning',
        title: '이메일 형식으로 입력해주세요!',
        showConfirmButton: false,
        timer: 1000
      })
      return
    }
    if (userPassword.length < 8 && userPassword.length > 30) {
      Swal.fire({
        icon: 'warning',
        title: '패스워드는 8자 이상 30자 이하로 입력해주세요!',
        showConfirmButton: false,
        timer: 1000
      })
      return
    }
    dispatch(signInAsync(
      {
        userEmail: userEmail,
        userPassword: userPassword,
      }
    ));
  })

  return (
    <Wrapper>
      <Container>
        <SLeftDiv />
        <SRightDiv style={{textAlign:"center"}}>
          <div style={{fontSize: "3rem", color: 'rgba(214, 174, 242, 1)'}}>방방</div>
          <div style={{fontSize: "1rem"}}>돌아 오신걸 환영해요</div>
          <div style={{textAlign: "left", marginTop: "3rem", marginLeft: "10%"}}>이메일</div>
          <SCustomInput placeholder="이메일을 입력해주세요" value={userEmail} required onChange={onChangeEmail}/>
          <div style={{textAlign: "left", marginLeft: "10%"}}>비밀번호</div>
          <SCustomInput placeholder="비밀번호를 입력해주세요" value={userPassword} required onChange={onChangePassword} onKeyDown={(e) => activeEnter(e)} type="password"/>
          <div style={{textAlign: "left", marginLeft: "10%"}}>
            <SSignUpP
            onClick={findPassword}>비밀번호를 잊으셨나요?</SSignUpP>
          </div>
          <SNormalButton type="button" onClick={() => {signInButtonClick()}}>로그인</SNormalButton>
          <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center'}}>
          <a type="button" href="https://i8a405.p.ssafy.io/api/oauth2/authorization/kakao"><SImg src={kakao} alt="카카오" /></a>
          &nbsp;&nbsp;
          <a type="button" href="https://i8a405.p.ssafy.io/api/oauth2/authorization/naver"><SImg src={naver} alt="네이버" /></a>
          </div>
          <div style={{textAlign: "left", marginLeft: "10%", marginTop: '10px'}}>
            <label>계정이 필요하신가요?</label>
            <SSignUpP
            onClick={() => {
              navigate("/signup")
            }}>가입하기</SSignUpP>
          </div>
        </SRightDiv>
      </Container>
    </Wrapper>
  );
}

export default Login;

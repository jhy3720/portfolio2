// Login.tsx

import React, { useState, useRef, useEffect } from 'react';
import axios from '../lib/Axios'; // Axios 인스턴스 가져오기
import '../css/Login.css'
import { Route, Link, useNavigate, Routes } from "react-router-dom";
import { Cookies } from 'react-cookie';
import moment from 'moment';
//선언하지 않아도, 디바이스 혹은 locale의 시간을 불러온다. 
import 'moment/locale/ko';	//대한민국



const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
 	return cookies.set(name, value, {...options}); 
}

export const getCookie = (name: string) => {
 return cookies.get(name); 
}

export const removeCookie = (name: string) => {
  return cookies.remove(name);
};


function Login() {

  //페이지 이동을 위한 함수 반환
  const navigate = useNavigate();
  const [ip, setIp] = useState('');
  //2023.07.26 유재호 별명 변수
  const [nickName, setNickName] = useState('');
  let [id, setId] = useState("");
  let [pwd, setPwd] = useState("");

  //프로젝트 실행 시 최초 IP주소를 불러와 저장?
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((data) => setIp(data.ip))
      .catch((error) => console.error(error));
  }, []); // 빈 배열을 전달하면 컴포넌트가 마운트되기 직전에만 이 훅이 실행됩니다.
  
  /**
  *------------------------------------------------------------------------
  *  
  * 2023.06.12 최현우
  * 계정정보를 보내어 토큰값을 리턴받는 메서드
  * 리턴값으로 받은 토큰 및 키 값을 로컬 스토리지에 저장
  *------------------------------------------------------------------------
  * 2023.06.16 유재호
  * token,userdata 대문자로 변경
  *------------------------------------------------------------------------
  */
  const Login = async () => {

    try {

      if (!ip) {
        alert('IP 주소를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      await axios.post('/restapis/login/loginToken', {
        userId: id, // 프론트엔드에서 입력한 사용자 ID
        userPw: pwd, // 프론트엔드에서 입력한 비밀번호
        userIP: ip, // 프론트엔드에서 입력한 IP 주소
        //userKey: "key", //키값 요양병원 번호같은?        
      }).then(response =>{

        // 로컬 스토리지에 토큰 저장
        localStorage.setItem("authToken", response.data.TOKEN); // response.data.token
        localStorage.setItem("key", response.data.ACCOUNTDATA.accountKey);
        console.log(response);
        //쿠키 저장
        setCookie("Islogin",response.data.TOKEN.substring(0,9)+moment().format('YYYYMMDDHHmmss')); 

        navigate("/");

      }).catch(error =>{

        alert("ID 혹은 비밀번호가 일치하지않습니다.")// 예외 처리
        
      })

    } catch (error) {     

      console.log(error);

    }
  };

  const ChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {

    id = event.target.value;
  }

  const ChangePw = (event: React.ChangeEvent<HTMLInputElement>) => {

    pwd = event.target.value;
  }
  
  return (
    <div className="Login"> 
      <div className="header">
        <h1>
          <button onClick={()=>{navigate("/")}}>
            Life
          </button>
        </h1>
      </div>

      <div className="loginform">

        <h1> Log In</h1>
        <h3>LIFE에 로그인하여 더 많은 이력서 보기</h3>
        
    
        <label htmlFor="ID">ID</label>
        <input type="text"  defaultValue={id} onChange={(event)=>ChangeId(event)} name="아이디" placeholder="아이디" id="ID" />
      
        <label htmlFor="password">password</label>
        <input type="password" defaultValue={pwd} onChange={(event)=>ChangePw(event)}  placeholder="비밀번호" id='password'/>
      

        <button onClick={Login}>Log In</button>
        <h6>계정이 없다면? <a href="/signup">회원가입</a></h6>

      </div>
    </div>   
  );
}

export default Login;

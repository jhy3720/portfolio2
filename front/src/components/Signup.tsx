// Signup.tsx

import React, { useState, useRef, useEffect } from 'react';
import axios from '../lib/Axios'; // Axios 인스턴스 가져오기
import '../css/Signup.css'
import { Route, Link, useNavigate, Routes } from "react-router-dom";
import moment from 'moment';
//선언하지 않아도, 디바이스 혹은 locale의 시간을 불러온다. 
import 'moment/locale/ko';	//대한민국


function Signup() {
    
  //페이지 이동을 위한 함수 반환
  const navigate = useNavigate();

  let [id, setId] = useState("");
  let [pwd, setPwd] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [nickname, setNickname] = useState("");
  let [work, setWork] = useState("");


  const ChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {

    id = event.target.value;
  }

  const ChangePw = (event: React.ChangeEvent<HTMLInputElement>) => {

    pwd = event.target.value;
  }

  const ChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {

    name = event.target.value;
  }

  const ChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {

    email = event.target.value;
  }

  const ChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {

    phone = event.target.value;
  }

  const ChangeNick = (event: React.ChangeEvent<HTMLInputElement>) => {

    nickname = event.target.value;
  }

  const ChangeWork = (event: React.ChangeEvent<HTMLInputElement>) => {

    work = event.target.value;
  }

  const checkEmail = (email :string) => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

    // 형식에 맞는 경우 true 리턴
    return regExp.test(email)
  }

  const Register = async()=>{

    try {

      let isTrue = await checkEmail(email);

      const nowTime = moment().format('YYYYMMDDHHmmss');

      if(isTrue){

        const response =  axios.post('/restapis/login/register', {

          id: id,
          password: pwd,
          cellphone: phone,
          email:email,
          name:name,
          nickname:nickname,
          work:work,
          accLoginDate:nowTime,
          accStDate:nowTime,
          accEndDate:"99991231235959",
          accPwChangeDate:nowTime

        });

        console.log(response) 
        //리턴 값 처리

      }else{
       
        window.alert("이메일 형식을 확인하세요")
      }


    } catch (error) {
      // 예외 처리
    }

  }
  


  return (
    <div className="Signup">
      <h1><button onClick={()=>{navigate("/")}}>Life</button></h1>

      <div className="law">
        <h3>이용약관</h3>
        <p>
          선언형 React는 상호작용이 많은 UI를 만들 때 생기는 어려움을 줄여줍니다. <br></br>
          애플리케이션의 각 상태에 대한 간단한 뷰만 설계하세요. <br></br>
          그럼 React는 데이터가 변경됨에 따라 적절한 컴포넌트만 효율적으로 갱신하고 렌더링합니다. <br></br>
          선언형 뷰는 코드를 예측 가능하고 디버그하기 쉽게 만들어 줍니다. <br></br>
          컴포넌트 기반 스스로 상태를 관리하는 캡슐화된 컴포넌트를 만드세요. <br></br>
          그리고 이를 조합해 복잡한 UI를 만들어보세요.<br></br>
          컴포넌트 로직은 템플릿이 아닌 JavaScript로 작성됩니다.<br></br>
          따라서 다양한 형식의 데이터를 앱 안에서 손쉽게 전달할 수 있고,<br></br>
          DOM과는 별개로 상태를 관리할 수 있습니다.<br></br>
          한 번 배워서 어디서나 사용하기 기술 스택의 나머지 부분에는 관여하지 않기 때문에, <br></br>
          기존 코드를 다시 작성하지 않고도 React의 새로운 기능을 이용해 개발할 수 있습니다. <br></br>
          React는 Node 서버에서 렌더링을 할 수도 있고, React Native를 이용하면 모바일 앱도 만들 수 있습니다.<br></br>
        </p>
      </div>

      <div className="inf">
        <label htmlFor="ID">ID</label>
        <input type="text"  defaultValue={id} onChange={(event)=>ChangeId(event)} name="아이디" placeholder="아이디" id="ID" />

        <label htmlFor="pwd">비밀번호</label>
        <input type="password"  defaultValue={pwd} onChange={(event)=>ChangePw(event)} name="비밀번호" placeholder="비밀번호" id="password" />

        <label htmlFor="name">이름</label>
        <input type="text"  defaultValue={name} onChange={(event)=>ChangeName(event)} name="이름" placeholder="이름" id="name" />

        <label htmlFor="email">이메일</label>
        <input type="text"  defaultValue={email} onChange={(event)=>ChangeEmail(event)} name="이메일" placeholder="이메일" id="email" />

        <label htmlFor="phone">핸드폰번호</label>
        <input type="text"  defaultValue={phone} onChange={(event)=>ChangePhone(event)} name="핸드폰번호" placeholder="핸드폰번호" id="phone" />

        <label htmlFor="nickname">닉네임</label>
        <input type="text"  defaultValue={nickname} onChange={(event)=>ChangeNick(event)} name="닉네임" placeholder="닉네임" id="nickname" />
        
        <label htmlFor="work">직업</label>
        <input type="text"  defaultValue={work} onChange={(event)=>ChangeWork(event)} name="직업" placeholder="직업" id="work" />

        <button onClick={Register}>회원가입</button>
      </div>
    </div>
  );
}

export default Signup;
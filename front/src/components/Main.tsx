// main.tsx

import React, { useState, useRef, useEffect } from 'react';
import axios from '../lib/Axios'; // Axios 인스턴스 가져오기
import '../css/Main.css'
import { Route, Link, useNavigate, Routes } from "react-router-dom";
import { Cookies } from 'react-cookie';


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

/**
*------------------------------------------------------------------------
* 2023.07.05 유재호
* 
* 라우터를 이용하여 페이지 교체를 위해 App에서 Main으로 코드 이동
*------------------------------------------------------------------------
*/
function Main() {

  //페이지 이동을 위한 함수 반환
  const navigate = useNavigate();

  /**
  *------------------------------------------------------------------------
  * 2023.06.16 유재호
  * 
  * 2023.06.16 유재호 메인화면 커버플로우 썸네일 이미지 변수
  *------------------------------------------------------------------------
  * 2023.06.27 유재호
  * 
  * 배열로 구현하였으나 리액트는 배열로 데이터 직접 업데이트 시 상태 변화를 
  * 감지하지 못하기 떄문에 Usestate상태변수로 변경
  *------------------------------------------------------------------------
  */
  const [imageFiles, setImageFiles] = useState<string[]>(['', '', '', '','']); // imageFiles 상태 변수 선언
  
  //2023.06.27 유재호 현재 선택된 이미지의 인덱스를 저장하는 변수
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  //2023.06.29 유재호 웹페이지 로딩 상대 변수
  const [Loading, setLoading] = useState(true);

  //2023.06.27 유재호 coverflow 컨테이너의 속성을 변경하기 위해 사용하는 변수
  const coverflowRef = useRef<HTMLDivElement>(null);
  
  //2023.07,17 유재호 로그인 여부 확인 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //2023.07.26 유재호 별명 변수
  const [nickName, setNickName] = useState('');



  /**
  *------------------------------------------------------------------------
  * 2023.06.27 유재호
  * 
  * 컨테이너에 휠 변경 이벤트 리스너를 추가, 삭제하는 로직
  *------------------------------------------------------------------------
  */
  useEffect(() => {
    const coverflowContainer = coverflowRef.current;
    if (coverflowContainer) {
      coverflowContainer.addEventListener('wheel', handleScroll);
      return () => {
        coverflowContainer.removeEventListener('wheel', handleScroll);
      };
    }
  }, [selectedImageIndex]);
  
  useEffect(() => {
    GetResume();
  }, []);

  /**
  *------------------------------------------------------------------------
  * 2023.07.17 유재호
  * 
  * 
  * userId 쿠키를 확인하여 변수를 바꿔주는 메소드 
  *------------------------------------------------------------------------
  */
  useEffect(() =>{

    let cookie = getCookie("Islogin");

    if(cookie){

      setIsLoggedIn(true);

    }else{

      setIsLoggedIn(false);

    }

  },[])


  /**
  *------------------------------------------------------------------------
  * 2023.07.18 유재호
  * 
  * 쿠키를 삭제하여 로그아웃 기능을 하는 메소드
  *------------------------------------------------------------------------
  */
  const handleLogout = async () => {

    try {

      // 로컬 스토리지에 토큰 삭제
      
      localStorage.removeItem("authToken");
      localStorage.removeItem("key");

      //쿠키 저장
      removeCookie("Islogin"); // 쿠키 삭제
      window.location.replace("/") //화면 새로고침

    } catch (error) {
      // 예외 처리
    }
  };

  /**
  *------------------------------------------------------------------------
  * 2023.06.16 유재호
  * 
  * 마우스 휠 회전시 커버플로우 가운데 이미지의 인덱스 번호 변경되어
  * 다음 이미지로 변경되는 메소드 
  *------------------------------------------------------------------------
  */
  const handleScroll = (event: WheelEvent) => {

    //새로운 인덱스 부여 
    const newIndex = selectedImageIndex - Math.sign(event.deltaY);
    setSelectedImageIndex((newIndex + imageFiles.length) % imageFiles.length);

  };

  const handleButtonClick = (index: number) => {
    setSelectedImageIndex(index);
  };



  /**
  *------------------------------------------------------------------------
  * 2023.06.16 유재호
  * 
  * 썸네일 정보를 받아와 메인화면 커버플로우에 데이터를 넣어주는 메소드
  *------------------------------------------------------------------------
  * 2023.06.27 유재호
  *
  * 리턴받은 이미지 값을 배열에 저장하는 부분에서 갱신된 정보를 리액트가 인지하지
  * 못해 화면 리플레시가 바로 되지않는 문제가 발생 함
  * 때문에 이미지값을 저장하는 변수를 배열에서 상태변수로 변경하고 Set프로퍼티를
  * 사용하여 이미지를 저장하도록 변경
  *------------------------------------------------------------------------
  */
  const GetResume = async () => {

    axios.post('/restapis/resume/getResume',{

      selectType: 'All',
      serchData: ''

    }).then((response) => {

      console.log(response);

      const newImageFiles = response.data.THUMB_NAIL.map((imagefile: { contentAsByteArray: number[] }) => {
        const byteArray = new Uint8Array(imagefile.contentAsByteArray);
        const blob = new Blob([byteArray], { type: 'image/png' });
        return URL.createObjectURL(blob);
      });

      setImageFiles(newImageFiles);
      setLoading(false);
      setSelectedImageIndex(imageFiles.length - 1);
    })
    .catch((error) => {
      // 예외 처리
    });

  };

  //2023.06.29 유재호 웹페이지 로딩 확인하여 출력
  if (Loading) {

    return <div> </div>;

  }

 
  //로그인시 출력화면 변경
  if(isLoggedIn){
    return(
      <div className="Main">
      <div className="header">
        <h1><button onClick={()=>{navigate("/")}}>Life</button></h1>
          <div className="search">
            <input type="text" id="Search" placeholder="통합검색">
            </input>  
          </div>      
          <div className="nav">
            <button>{nickName}</button>
            <p>님 환영합니다.</p>
            <button onClick={handleLogout}>Log out</button>
            
              
          </div>
      </div> 

      <div className="coverflow-container" ref={coverflowRef}>
      {imageFiles.map((file, index) => (
        <div
          key={index}
          className={`image-container ${index === selectedImageIndex ? 'selected' : ''}`}
          style={{
            transform: `rotateY(${(index - selectedImageIndex) * (360 / imageFiles.length)}deg) translateZ(200px)`
          }}
        >
          <button onClick={() => handleButtonClick(index)}>
            <img src={`${file}`} alt={`Thumbnail  ${index + 1}`} />
          </button>
        </div>
      ))}
        
      </div>
      <div className="content">
        <button type="button" >
          <img src="https://cdn-icons-png.flaticon.com/512/45/45009.png?w=826&t=st=1686659616~exp=1686660216~hmac=cf8d2ecb3330622e67d20020271c270c4f36468fa25ddff82b3a7168483794e0" alt="이미지 편집"/>
        </button>
        <button type="button">
          <img src="https://cdn-icons-png.flaticon.com/512/1167/1167256.png?w=826&t=st=1686659679~exp=1686660279~hmac=032ab90ce792d0a3f9859ceeaee9474ebf3dff7e2f07f47baa63e497dd52336b" alt="랭크"/>
        </button>
        <button type="button">
          <img src="https://cdn-icons-png.flaticon.com/512/61/61050.png?w=826&t=st=1686659816~exp=1686660416~hmac=6e8234c9c8875c9f4dd0c44909fe07c770db92c2f20b70bfb2f007fd70a0ee9c"alt="더보기"/>
        </button>
      </div>
          
    </div>
    );
  }

  return (
    <div className="Main">
      <div className="header">
        <h1><button onClick={()=>{navigate("/")}}>Life</button></h1>
          <div className="search">
            <input type="text" id="Search" placeholder="통합검색">
            </input>  
          </div>      
          <div className="nav">

              <button onClick={()=>{navigate("login");}}>Log in</button>
              <button onClick={()=>{navigate("signup");}}>Sign up</button>
              
          </div>
      </div> 

      <div className="coverflow-container" ref={coverflowRef}>
      {imageFiles.map((file, index) => (
        <div
          key={index}
          className={`image-container ${index === selectedImageIndex ? 'selected' : ''}`}
          style={{
            transform: `rotateY(${(index - selectedImageIndex) * (360 / imageFiles.length)}deg) translateZ(200px)`
          }}
        >
          <button onClick={() => handleButtonClick(index)}>
            <img src={`${file}`} alt={`Thumbnail  ${index + 1}`} />
          </button>
        </div>
      ))}
        
      </div>
      <div className="content">
        <button type="button" >
          <img src="https://cdn-icons-png.flaticon.com/512/45/45009.png?w=826&t=st=1686659616~exp=1686660216~hmac=cf8d2ecb3330622e67d20020271c270c4f36468fa25ddff82b3a7168483794e0" alt="이미지 편집"/>
        </button>
        <button type="button">
          <img src="https://cdn-icons-png.flaticon.com/512/1167/1167256.png?w=826&t=st=1686659679~exp=1686660279~hmac=032ab90ce792d0a3f9859ceeaee9474ebf3dff7e2f07f47baa63e497dd52336b" alt="랭크"/>
        </button>
        <button type="button">
          <img src="https://cdn-icons-png.flaticon.com/512/61/61050.png?w=826&t=st=1686659816~exp=1686660416~hmac=6e8234c9c8875c9f4dd0c44909fe07c770db92c2f20b70bfb2f007fd70a0ee9c"alt="더보기"/>
        </button>
      </div>
          
    </div>
  );
}

export default Main;

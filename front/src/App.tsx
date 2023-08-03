// App.tsx

import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import Logincomponent from './components/Login';
import Main from './components/Main';
import Signupcomponent from './components/Signup';


/**
*------------------------------------------------------------------------
* 2023.07.05 유재호
* 
* 라우터를 이용하여 페이지 교체를 위해 App에서 Main으로 코드 이동
* 페이지 변경시 사용되는 메소드
*------------------------------------------------------------------------
*/
function App() {

  return (
    <div className="App">

      {/*페이지 교체를 위한 라우터 */}
      <BrowserRouter>
       
          <Routes>
            <Route path="/login" element={<Logincomponent />} />
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<Signupcomponent /> } />
          </Routes>

      </BrowserRouter> 

    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Main from './MainPage';
import SignUp from './SignUp';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [users, setUsers] = useState([]); // 사용자 정보를 관리하는 상태

  // 회원 가입 처리 함수
  const handleSignUp = (newUser) => {
    // 사용자 정보를 추가하는 로직을 여기에 구현
    setUsers([...users, newUser]);
  };

  return (
    <div className="App">
      <h1>앱 제목</h1>
      <Routes>
        <Route path="/login" element={<Login Loginuser={setAuthenticated} users={users} />}/>
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />}/>
        <Route path="/main" element={authenticated ? <Main /> : <Login Loginuser={setAuthenticated} users={users} />}/>
      </Routes>
    </div>
  );
}

export default App;

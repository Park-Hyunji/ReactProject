import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ Loginuser , users}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigate();

  const handleLogin = () => {
    const user = users.find((u) => u.id === username && u.password === password);
    if (user) {
      Loginuser(true);
      navigator('./main');
    } else {
      alert('로그인 실패. 아이디와 비밀번호를 확인하세요.');
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <br/>
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <br/>
      <button onClick={handleLogin}>로그인</button><Link to="/signup">회원 가입</Link>

    </div>
  );
};

export default Login;

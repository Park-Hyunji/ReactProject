import React, { useState } from 'react';
import './App.css';
import Login from './Login';

import userData from './users.json'; // JSON 파일 가져오기

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <h2>메인 페이지</h2>
          <p>환영합니다! 이것은 메인 페이지입니다.</p>
        </div>
      ) : (
        <Login users={userData.users} onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

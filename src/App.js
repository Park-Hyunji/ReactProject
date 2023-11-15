import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import HomePage from './homePage';
import SignUp from './SignUp';
import usersData from './users.json';
import ComputerProgramming from './board/ComputerProgramming/ComputerProgramming'
import ComputerProgrammingWriter from'./board/ComputerProgramming/writer'
import ComputerProgrammingPostview from'./board/ComputerProgramming/PostView'
import ProgrammingLab from './board/ProgrammingLab/ProgrammingLab'
import ProgrammingLabWriter from './board/ProgrammingLab/writer'
import ProgrammingLabPostview from './board/ProgrammingLab/PostView'
import Web from './board/Web/Web'
import WebPostview from './board/Web/PostView'
import WebWriter from './board/Web/writer'
import Capstone from './board/Capstone/Capstone'
import CapstonePostview from './board/Capstone/PostView'
import CapstoneWriter from './board/Capstone/writer'
import YouTube from './Youtube'
import Quiz from './Quiz'
import TimeTable from './timetable/TimeTable'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  // 회원 가입 처리 함수
  const handleSignUp = (newUser) => {setUsers([...users, newUser]); setIsSignUpSuccess(true);};

  useEffect(() => { setUsers(usersData);}, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={authenticated ? (<HomePage />) : ( <Login Loginuser={setAuthenticated} users={users} />)}/>
          <Route path="/signup" element={isSignUpSuccess ? (<Login Loginuser={setAuthenticated} users={users} />) : (<SignUp onSignUp={handleSignUp} />)}/>
          <Route path ="/main" element={<HomePage />}></Route>
          <Route path="/ComputerProgramming" element = {<ComputerProgramming /> } />
          <Route path="/ComputerProgramming/writer" element = {<ComputerProgrammingWriter /> } />
          <Route path="/ComputerProgramming/:idx" element = {<ComputerProgrammingPostview /> } />
          <Route path="/ProgrammingLab" element = {<ProgrammingLab /> } />
          <Route path="/ProgrammingLab/writer" element = {<ProgrammingLabWriter /> } />
          <Route path="/ProgrammingLab/:idx" element = {<ProgrammingLabPostview /> } />
          <Route path="/Web" element = {<Web /> } />
          <Route path="/Web/writer" element = {<WebWriter /> } />
          <Route path="/Web/:idx" element = {<WebPostview /> } />
          <Route path="/Capstone" element = {<Capstone /> } />
          <Route path="/Capstone/writer" element = {<CapstoneWriter /> } />
          <Route path="/Capstone/:idx" element = {<CapstonePostview /> } />
          <Route path="/YouTube" element={<YouTube/>} />
          <Route path="/Quiz" element={<Quiz/>}/>
          <Route path="/TimeTable" element={<TimeTable/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

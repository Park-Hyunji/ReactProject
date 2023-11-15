import 'bootstrap/dist/css/bootstrap.css';
import Header from './Layout/Header';
import { Link } from 'react-router-dom';
import './homePage.css';
import React from 'react';
//import TimeTable from './timetable/TimeTable';
//import Quiz from './Quiz';
//import YouTube from './Youtube';
//import TodoList from './todoList/TodoList';
import Button from '@mui/material/Button';
const HomePage = () => {
  return (
    <>
    <Header />
    <div className='fullMain'>

      <div className='namebox'>
        <div className='name'>
        computer engineering
        </div>
      </div>

      <div className='timetableContainer' style={{ fontFamily: 'taebaek'}}>
        <Button className='timetableButton' as={Link} to="/TimeTable" style={{ fontFamily: 'taebaek'}} >
          시간표 보러가기 
        </Button>
      </div>

      <div className='whiteboxContainer'>
          {/* 왼쪽 구역 */}
          <div className='section1'>
          <Link to="/Quiz">오늘의 문제</Link>
            <p></p>
            <p>오늘의 문제를 풀어보세요</p>
          </div>

          {/* 오른쪽 구역 */}
          <div className='section2'>
          <Link to="/Youtube">트랙 소개영상</Link>
            <p></p>
            <p>트랙 소개영상 보러가기</p>
          </div>
        </div>
      

    </div>
    
    </>
  );
};

export default HomePage;


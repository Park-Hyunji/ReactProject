import React, { useState, useEffect } from 'react';
import { doc, collection, addDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Input, Button } from 'antd'; // Import Button from 'antd'
import './Quiz.css';
import Header from '../Layout/Header';
import { FiMessageCircle } from "react-icons/fi";

const problemsData = [
  { id: 1, question: '두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오' },
  { id: 2, question: 'N을 입력받은 뒤, 구구단 N단을 출력하는 프로그램을 작성하시오.' },
  { id: 3, question: 'N개의 정수가 주어진다. 이때, 최솟값과 최댓값을 구하는 프로그램을 작성하시오.' },
  { id: 4, question: '시험 점수를 입력받아 90 ~ 100점은 A, 80 ~ 89점은 B, 70 ~ 79점은 C, 60 ~ 69점은 D, 나머지 점수는 F를 출력하는 프로그램을 작성하시오.' },
  { id: 5, question: '알파벳으로만 이루어진 단어를 입력받아, 그 길이를 출력하는 프로그램을 작성하시오.' },
];

const hint = [
  { id: 1, hint: 'scanf()' },
  { id: 2, hint: 'for문' },
  { id: 3, hint: '배열' },
  { id: 4, hint: 'if문' },
  { id: 5, hint: 'strlen()' },
];

const { TextArea } = Input;

const App = () => {
  const [randomProblem, setRandomProblem] = useState({});
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]);
  const [showHint, setShowHint] = useState(false); // Added state for hint visibility

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * problemsData.length);
    setRandomProblem(problemsData[randomIndex]);

    const repliesRef = collection(db, 'Qcomments');
    onSnapshot(repliesRef, (snapshot) => {
      const repliesData = [];
      snapshot.forEach((doc) => {
        const reply = { id: doc.id, ...doc.data() };
        repliesData.push(reply);
      });
      setReplies(repliesData);
    });
  }, []);

  const filteredReplies = replies.filter((reply) => reply.questionId === randomProblem.id);

  const handleReplySubmit = async () => {
    if (reply.trim() !== '') {
      const replyData = {
        text: reply,
        questionId: randomProblem.id,
      };

      const repliesRef = collection(db, 'Qcomments');
      await addDoc(repliesRef, replyData);

      setReply('');
    }
  };

  const handleReplyDelete = async (replyId) => {
    try {
      await deleteDoc(doc(db, 'Qcomments', replyId));
    } catch (error) {
      console.error('Error deleting reply: ', error);
    }
  };

  const renderCommentText = (text) => {
    // Replace newline characters with HTML line break tags
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const handleHintToggle = () => {
    setShowHint(!showHint);
  };

  return (
    <>
      <Header />
      <div className="Quiz">
        <div className="problem">
          <h1>오늘의 문제</h1>
          <br />
          <br />
          {randomProblem && (
            <div>
              <p>{randomProblem.question}</p>
            </div>
          )}
          <div className="hint">
          <Button onClick={handleHintToggle}>힌트</Button>
          {showHint && <p>{hint.find(item => item.id === randomProblem.id)?.hint}</p>}
        </div></div>

        <div className="replies-section">
          <div>
            <TextArea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="댓글을 입력하세요"
            />
            <button onClick={handleReplySubmit}>댓글 남기기</button>
          </div>
          {filteredReplies.length > 0 ? (
            // Reverse the order of filteredReplies before mapping
            filteredReplies.reverse().map((reply) => (
              <div key={reply.id} className="comment">
                <div className="comment-content">
                  <div className="icon"><FiMessageCircle size={35} /></div>
                  <p>{renderCommentText(reply.text)}</p>
                  </div>
                <button onClick={() => handleReplyDelete(reply.id)}>삭제</button>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </>
  );
};

export default App;

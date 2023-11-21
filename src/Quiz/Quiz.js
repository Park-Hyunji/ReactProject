import React, { useState, useEffect } from 'react';
import { doc, collection, addDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Input, Button } from 'antd';
import './Quiz.css';
import Header from '../Layout/Header';
import { FiMessageCircle } from 'react-icons/fi';
import SplitPane from 'react-split-pane';

const problemsData = [
  { id: 1, question: '두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오' },
  { id: 2, question: 'N을 입력받은 뒤, 구구단 N단을 출력하는 프로그램을 작성하시오.' },
  { id: 3, question: 'N개의 정수가 주어진다. 이때, 최솟값과 최댓값을 구하는 프로그램을 작성하시오.' },
  { id: 4, question: '시험 점수를 입력받아 90 ~ 100점은 A, 80 ~ 89점은 B, 70 ~ 79점은 C, 60 ~ 69점은 D, 나머지 점수는 F를 출력하는 프로그램을 작성하시오.' },
  { id: 5, question: '알파벳으로만 이루어진 단어를 입력받아, 그 길이를 출력하는 프로그램을 작성하시오.' },
];

const problemInput = [
  { id: 1, input: '첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)' },
  { id: 2, input: '첫째 줄에 N이 주어진다. N은 1보다 크거나 같고, 9보다 작거나 같다.' },
  { id: 3, input: '첫째 줄에 정수의 개수 N (1 ≤ N ≤ 1,000,000)이 주어진다. 둘째 줄에는 N개의 정수를 공백으로 구분해서 주어진다. 모든 정수는 -1,000,000보다 크거나 같고, 1,000,000보다 작거나 같은 정수이다.' },
  { id: 4, input: '첫째 줄에 시험 점수가 주어진다. 시험 점수는 0보다 크거나 같고, 100보다 작거나 같은 정수이다.' },
  { id: 5, input: '첫째 줄에 영어 소문자와 대문자로만 이루어진 단어가 주어진다. 단어의 길이는 최대 100이다.' },
]

const problemOutput = [
  { id: 1, output: '첫째 줄에 A+B를 출력한다.' },
  { id: 2, output: '출력형식과 같게 N*1부터 N*9까지 출력한다.' },
  { id: 3, output: '첫째 줄에 주어진 정수 N개의 최솟값과 최댓값을 공백으로 구분해 출력한다.' },
  { id: 4, output: '시험 성적을 출력한다.' },
  { id: 5, output: '첫째 줄에 입력으로 주어진 단어의 길이를 출력한다.' },
]

const QInput = [
  { id: 1, input: '1 2' },
  { id: 2, input: '2' },
  { id: 3, input: '5 20 10 35 30 7' },
  { id: 4, input: '100' },
  { id: 5, input: 'pulljima' },
]


const QOutput = [
  { id: 1, output: '3' },
  { id: 2, output: '2 * 1 = 2 2 * 2 = 4 2 * 3 = 6 2 * 4 = 8 2 * 5 = 10 2 * 6 = 12 2 * 7 = 14 2 * 8 = 16 2 * 9 = 18' },
  { id: 3, output: '7 35' },
  { id: 4, output: 'A' },
  { id: 5, output: '8' },
]

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
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isCodePaneOpen, setIsCodePaneOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [selectedProblemInput, setSelectedProblemInput] = useState('');
  const [selectedProblemOutput, setSelectedProblemOutput] = useState('');
  const [selectedQInput, setSelectedQInput] = useState('');
  const [selectedQOutput, setSelectedQOutput] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * problemsData.length);
    const selectedProblem = problemsData[randomIndex];
    setRandomProblem(selectedProblem);

    // Find the corresponding values for problemInput, problemOutput, expectedInput, and expectedOutput
    const selectedInput = problemInput.find(item => item.id === selectedProblem.id);
    const selectedOutput = problemOutput.find(item => item.id === selectedProblem.id);
    const expectedInput = QInput.find(item => item.id === selectedProblem.id);
    const expectedOutput = QOutput.find(item => item.id === selectedProblem.id);

    setSelectedProblemInput(selectedInput ? selectedInput.input : '');
    setSelectedProblemOutput(selectedOutput ? selectedOutput.output : '');
    setSelectedQInput(expectedInput ? expectedInput.input : '');
    setSelectedQOutput(expectedOutput ? expectedOutput.output : '');

    const repliesRef = collection(db, 'Qcomments');
    onSnapshot(repliesRef, (snapshot) => {
      const repliesData = [];
      snapshot.forEach((doc) => {
        const reply = { id: doc.id, ...doc.data() };
        repliesData.push(reply);
      });
      setReplies(repliesData);
    });

    const answersRef = collection(db, 'Qanswers');
    onSnapshot(answersRef, (snapshot) => {
      const answersData = [];
      snapshot.forEach((doc) => {
        const answer = { id: doc.id, ...doc.data() };
        answersData.push(answer);
      });
      setAnswers(answersData);
    });
  }, []);

  const filteredReplies = replies.filter((reply) => reply.questionId === randomProblem.id);
  const filteredAnswers = answers.filter((answer) => answer.questionId === randomProblem.id);

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

  const handleAnswerSubmit = async () => {
    if (answer.trim() !== '') {
      const answerData = {
        text: answer,
        questionId: randomProblem.id,
      };

      const answersRef = collection(db, 'Qanswers');
      await addDoc(answersRef, answerData);

      setAnswer('');
    }
  };

  const handleReplyDelete = async (replyId) => {
    try {
      await deleteDoc(doc(db, 'Qcomments', replyId));
    } catch (error) {
      console.error('Error deleting reply: ', error);
    }
  };

  const handleAnswerDelete = async (answerId) => {
    try {
      await deleteDoc(doc(db, 'Qanswers', answerId));
    } catch (error) {
      console.error('Error deleting answer: ', error);
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

  const renderAnswerText = (text) => {
    // Replace newline characters with HTML line break tags for answers
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const toggleCodePane = () => {
    setIsCodePaneOpen(!isCodePaneOpen);
  };

  const handleHintToggle = () => {
    setShowHint(!showHint);
  };

  return (
    <>
      <Header />
      <SplitPane split="vertical" minSize={300} defaultSize={isCodePaneOpen ? 500 : 0}>
        <div className={`sidebar${isCodePaneOpen ? '' : ' hidden'}`}>
          <h2><strong>문제 정보</strong></h2>
          <br /><br />
          <div className="input">
            <h3>입력</h3>
            <hr /><div>{selectedProblemInput}</div>
          </div>
          <br /><br />
          <div className="output">
            <h3>출력</h3>
            <hr /><div>{selectedProblemOutput}</div>
            <br /><br />
          </div>
          <div className="expected-input">
            <h3>예상 입력</h3>
            <hr /><div>{selectedQInput}</div>
            <br /><br />
          </div>
          <div className="expected-output">
            <h3>예상 출력</h3>
            <hr /><div>{selectedQOutput}</div>
          </div>
          <br /><br />
          <div className="hint">
            <Button onClick={handleHintToggle}>힌트</Button>
            {showHint && <p>{hint.find(item => item.id === randomProblem.id)?.hint}</p>}
          </div>
        </div>
        <div className="Quiz">
          <div className="problem">
            <h1>오늘의 문제</h1>
            <Button onClick={toggleCodePane} className="toggle-button">
              {isCodePaneOpen ? 'Infomation Close' : 'Infomation Open'}
            </Button>
            <br />
            {randomProblem && (
              <div>
                <p>{randomProblem.question}</p>
              </div>
            )}
          </div>
          <hr />
          <div className="input-answer-section">
            <div className="answers-comments-section">
              <div className="answers-section">
                <h2>정답</h2>
                <div className="answer-area-container">
                  <TextArea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="정답을 입력하세요"
                  />
               
                <Button onClick={handleAnswerSubmit} className="submit-button">
                  저장
                </Button> 
                <Button onClick={() => handleAnswerDelete(answer.id)} className="delete-button">
                        삭제
                </Button>
                </div>
                {filteredAnswers.length > 0 ? (
                  filteredAnswers.reverse().map((answer) => (
                    <div key={answer.id} className="answer">
                      <div className="answer-content">
                        <p>{renderAnswerText(answer.text)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p></p>
                )}
              </div>
              <div className="comments-section">
                <h2>댓글</h2>
                <div className="text-area-container">
                  <TextArea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="댓글을 입력하세요"
                  />
               
                <Button onClick={handleReplySubmit} className="submit-button">
                  댓글 남기기
                </Button>
                 </div>
                {filteredReplies.length > 0 ? (
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
          </div>
        </div>
      </SplitPane>
    </>
  );
};

export default App

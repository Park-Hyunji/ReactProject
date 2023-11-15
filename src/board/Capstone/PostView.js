import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, orderBy, where, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useLocation } from 'react-router-dom';
import './PostView.css';
import { useNavigate } from 'react-router-dom';
import whiteheart from '../img/human.png'
import { Card,Input, } from 'antd';
import heart from '../img/blueheart.png'
import commentboogie from '../img/commentboogie.jpeg'
import moment from 'moment';

const { TextArea } = Input;
const PostView = ({ history }) => {
  const { idx } = useParams();
  const [data, setData] = useState(null);
  const location = useLocation();
  const postData = location.state.data;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postRef = doc(db, 'posts4', idx);
        const postSnap = await getDoc(postRef);
  
        if (postSnap.exists()) {
          setData(postSnap.data());
        } else {
          setData(null);
        }
  
        // 해당 게시글의 댓글만 가져오기
        const commentsQuery = query(
          collection(db, 'comments4'),
          where('postId', '==', postData?(postData[idx].id) : "없습니다"), // postId로 필터링
          orderBy('createdAt', 'asc')
        );
        const commentsSnapshot = await getDocs(commentsQuery);
  
        const commentsData = commentsSnapshot.docs.map((doc) => doc.data());
  
        // postId가 일치하는 댓글만 선택
        const filteredComments = commentsData.filter(comment => comment.postId === postData?(postData[idx].id): "없습니다");
  
        setComments(filteredComments);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };
  
    fetchPostData();
  }, [idx, location, postData]);


  const handleCommentSubmit = async (postId) => {
    if (!newComment.trim()) {
      return;
    }

    

    const commentData = {
      postId: postId,
      content: newComment,
      createdAt: moment().format('YYYY.MM.DD HH:mm:ss')
    };

    try {
      // 댓글 추가
      await addDoc(collection(db, 'comments4'), commentData);

      // 댓글 목록 업데이트
      setComments([...comments, commentData]);

      // 새 댓글 입력값 초기화
      setNewComment('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  return (
    <>
    <div className="post-view-wrapper">
        {postData ? (
          <>
          <div className="post-view-row">
            <img src={whiteheart} alt={whiteheart} width="60"></img> 익명  <label className="comment-time">{postData[idx].createAt}</label>
            </div>
            <div className="post-view-title">
              
              <label>{postData[idx].title}</label>
            </div>
            
            <div className="post-view-content">
              
              <div dangerouslySetInnerHTML={{ __html: postData[idx].content }} />
            </div>

            <div className="post-view-row">
            <form className="comment-form">
            <TextArea
              className="comment-textarea"
              showCount maxLength={100}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요"
            />
            <img className="comment-submit" src={heart} alt="Submit Comment" onClick={() => handleCommentSubmit(postData[idx].id)} />
          </form>
          </div>

          <div className="post-view-row">
            <div className="comment-container">
              {comments.map((comment, index) => (
                <div key={index} className="comment-item">
                  <img src={commentboogie} width="50"></img>
                  <p className="comment-content">{comment.content}</p>
                  <p className="comment-time">{comment.createdAt}</p>
                </div>
              ))}
            </div>
          </div>

        </>
      ) : (
        '해당 게시글을 찾을 수 없습니다.'
      )}
      <button className="post-view-go-list-btn" onClick={() => navigate('/Capstone')}>
        목록으로 돌아가기
      </button>
    </div>
  </>
);
      }

export default PostView;





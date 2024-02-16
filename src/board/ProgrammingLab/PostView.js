import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, orderBy, where, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useLocation } from 'react-router-dom';
import './PostView.css';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import dm from '../img/dm.png';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { GoPerson } from "react-icons/go";



const { TextArea } = Input;

const PostView = () => {
  const { idx } = useParams();
  const location = useLocation();
  const postData = location.state.data;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postRef = doc(db, 'posts2', idx);
        await getDoc(postRef);

        

        // 해당 게시글의 댓글만 가져오기
        const commentsQuery = query(
          collection(db, 'comments2'),
          where('postId', '==', postData ? postData[idx].id : '없습니다'), // postId로 필터링
          orderBy('createdAt', 'asc')
        );
        const commentsSnapshot = await getDocs(commentsQuery);

        const commentsData = commentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // postId가 일치하는 댓글만 선택
        const filteredComments = commentsData.filter((comment) => comment.postId === postData ? postData[idx].id : '없습니다');

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
      createdAt: moment().format('YYYY.MM.DD HH:mm:ss'),
    };

    try {
      // 댓글 추가
      const commentRef = await addDoc(collection(db, 'comments2'), commentData);

      // 댓글 목록 업데이트
      setComments([...comments, { id: commentRef.id, ...commentData }]);

      // 새 댓글 입력값 초기화
      setNewComment('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      // Delete the comment from Firestore
      await deleteDoc(doc(db, 'comments2', commentId));

      // Update the comments list by filtering out the deleted comment
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  return (
    <>
      <div className="post-view-wrapper">
        {postData ? (
          <>
            <div className="post-view-row">
              <p style={{ fontFamily: 'bori' }}>
             
                <GoPerson  size={25} style={{ width: "30"}}/>익명{' '}
                <label className="comment-time">{postData[idx].createdAt}</label>
              </p>
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
                  showCount
                  maxLength={100}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요"
                />
                <img
                  src={dm}
                  alt="Submit Comment"
                  onClick={() => handleCommentSubmit(postData[idx].id)}
                  style={{ width: '45px', height: '50px' }}
                />
              </form>
            </div>

            <div className="post-view-row">
              <div className="comment-container">
                {comments.map((comment, index) => (
                  <div key={index} className="comment-item">
                   <GoPerson  size={30} style={{ width: "50", marginTop : "10"}}/> 
                   <p className="comment-content" style={{fontSize: "20px"}}>{comment.content}</p>
                    <p className="comment-time">{comment.createdAt}</p>
                    <IconButton aria-label="delete" size="small"
                     onClick={() => handleCommentDelete(comment.id)}>
                      <DeleteIcon fontSize="small"
                      className="comment-delete-btn"
                      />
                      </IconButton>
                  
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          '해당 게시글을 찾을 수 없습니다.'
        )}
        <button className="post-view-go-list-btn" onClick={() => navigate('/ProgrammingLab')}>
          목록으로 돌아가기
        </button>
      </div>
    </>
  );
};

export default PostView;




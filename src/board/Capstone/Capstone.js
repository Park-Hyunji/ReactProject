import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommonTable from '../../table/CommonTable';
import CommonTableColumn from '../../table/CommonTableColumn';
import CommonTableRow from '../../table/CommonTableRow';
import Header from '../../Layout/Header';
import { FloatButton } from 'antd';
import { useNavigate } from 'react-router-dom';
import {collection,getDocs,orderBy,query,deleteDoc,doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import Pagination from 'react-bootstrap/Pagination';
import heart from '../img/blueheart.png'

const ComputerProgramming = () => {
  const [dataList, setDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const navigate = useNavigate();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const postCollection = collection(db, 'posts4');
      const snapshot = await getDocs(query(postCollection, orderBy('createdAt', 'desc')));
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        createdAt: doc.data().createdAt,
        content: doc.data().content,
        comments: doc.data().comments || [],
        views: doc.data().views || 0,
      }));
      setDataList(postData);
      console.log(postData);
    };

    fetchData();
  }, []);

  const totalPosts = dataList.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dataList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const handleDeleteClick = (postId) => {
    setDeleteTargetId(postId);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const postRef = doc(db, 'posts4', deleteTargetId);
      await deleteDoc(postRef);

      const updatedDataList = dataList.filter((item) => item.id !== deleteTargetId);
      setDataList(updatedDataList);

      setDeleteModalVisible(false);
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setDeleteTargetId(null);
  };

  return (
    <>
      <Header />
      <FloatButton onClick={() => navigate('./writer')} />
      <div className="korean-font" style={{ fontFamily: 'HSSaemaul-Regular', fontWeight: 'bold', fontSize: '28px', color: 'skyblue' }}>
      <img src={heart} alt={heart}></img>캡스톤디자인 게시판<img src={heart} alt={heart}></img></div>

      <CommonTable headersName={['글번호', '제목', '작성일', '삭제']} >
        {currentPosts.map((item, index) => (
          <CommonTableRow key={index + indexOfFirstPost} >
            <CommonTableColumn >{index + 1 + indexOfFirstPost}</CommonTableColumn>
            <CommonTableColumn>
              <Link to={`/Capstone/${index + indexOfFirstPost}`} state={{ data: currentPosts }} style={{ fontFamily :"Uiyeun", fontSize : '30px', color : 'black'}} >
                {item.title}
              </Link>
            </CommonTableColumn>
            <CommonTableColumn>{item.createdAt}</CommonTableColumn>
            <CommonTableColumn>
              <DeleteOutlined onClick={() => handleDeleteClick(item.id)} />
            </CommonTableColumn>
          </CommonTableRow>
        ))}
      </CommonTable>

      <div className="d-flex justify-content-center mt-3">
        <Pagination>
          <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              onClick={() => paginate(i + 1)}
              active={i + 1 === currentPage}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>

      <Modal
        title="게시물 삭제"
        visible={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        <p>게시물을 삭제하시겠습니까?</p>
      </Modal>
    </>
  );
};

export default ComputerProgramming;







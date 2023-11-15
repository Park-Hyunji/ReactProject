import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form, Input, Button } from 'antd';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import img from '../img/writerboogie.jpg';
import './writer.css'; // 스타일 파일을 import합니다
import moment from 'moment';

const WritingForm = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  const handleContentChange = (value) => {
    setContent(value);
  };

  const onFinish = async (values) => {
    const createdAt = moment().format('YYYY.MM.DD HH:mm:ss');
    const newPost = { ...values, content, createdAt};

    try {
      await addDoc(collection(db, 'posts'), newPost);
      

      navigate('/ComputerProgramming');

      console.log('New post added successfully');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="writing-form-container">
      <img src={img} alt={img} className="header-image" />
      
      <Form onFinish={onFinish} className="writing-form">
        <Form.Item style={{ textAlign: 'right', marginTop: 16 }}>
          <Button type="primary" htmlType="submit">
            글쓰기
          </Button>
        </Form.Item>
        <Form.Item
          name="title"
          rules={[{ required: true, message: '제목을 입력하세요!' }]}
        >
          <Input placeholder="제목을 입력하세요" />
        </Form.Item>
        <Form.Item
          name="content"
          rules={[{ required: true, message: '내용을 입력하세요' }]}
        >
          <ReactQuill
            style={{ height: '600px' }}
            value={content}
            onChange={handleContentChange}
            placeholder="내용을 입력하세요"
            modules={{
              toolbar: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['bold', 'italic', 'underline'],
                ['link'],
                ['image'],
              ],
            }}
          />
        </Form.Item>
        
      </Form>
    </div>
  );
};

export default WritingForm;





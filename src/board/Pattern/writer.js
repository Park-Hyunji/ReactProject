import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form, Input, Button } from 'antd';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import img from '../img/sangsangbugi-coding.png';
import './writer.css'; // 스타일 파일을 import합니다
import moment from 'moment';

const WritingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState('');
  const [form] = Form.useForm(); // Use Form hook to access the form instance
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    // If there's state in location, set the title, content, and postId
    if (location.state) {
      const { title, content, postId } = location.state;
      setPostId(postId || null);

      // Set initial values for the entire form
      form.setFieldsValue({
        title: title || '',
        content: content || '',
      });
    }
  }, [location.state, form]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const onFinish = async (values) => {
    const createdAt = moment().format('YYYY.MM.DD HH:mm:ss');
    const newPost = { ...values, content, createdAt };

    try {
      if (postId) {
        // If postId exists, it means we are editing an existing post
        const postRef = doc(db, 'posts7', postId);
        await updateDoc(postRef, newPost);
      } else {
        // If postId doesn't exist, it means we are creating a new post
        await addDoc(collection(db, 'posts7'), newPost);
      }

      navigate('/Pattern');

      console.log('Post saved successfully');
    } catch (error) {
      console.error('Error adding/updating document: ', error);
    }
  };

  return (
    <div className="writing-form-container">
      <img src={img} alt={img} className="header-image" />

      <Form form={form} onFinish={onFinish} className="writing-form">
        <Form.Item style={{ textAlign: 'right', marginTop: 16 }}>
          <Button type="primary" htmlType="submit">
            {postId ? '수정하기' : '글쓰기'}
          </Button>
        </Form.Item>
        <Form.Item
          name="title"
          // No need to use initialValue here
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




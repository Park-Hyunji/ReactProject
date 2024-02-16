import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login/LoginModal.css';
import users from './Login/users.json';
import { useAuth } from './Login/Auth';

const LoginModal = ({ showLoginModal, handleLoginModalClose, handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  
  const handleLoginClick = () => {
    const user = users.find((user) => user.id === username && user.password === password);

    if (user) {
      login();
      handleLogin(user); // Pass the logged-in user to the parent component
      handleLoginModalClose();
    } else {
      setError('아이디 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <Modal show={showLoginModal} onHide={handleLoginModalClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label></Form.Label>
            <Form.Control type="text" placeholder="ID 또는 학번" value={username} onChange={handleUsernameChange}/>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label></Form.Label>
            <Form.Control type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange}/>
          </Form.Group>

          {error && <p className="error-message">{error}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleLoginClick}>
          로그인
        </Button>
        <Button variant="secondary" onClick={handleLoginModalClose}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
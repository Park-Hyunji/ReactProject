// Modal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ToDoTemplate from './todoList/ToDoTemplate'

const CustomModal = ({ showModal, handleModalClose }) => {
  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>TODOLIST</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* 모달 내용 추가 */}
        {/* 예: 할 일 목록을 여기에 표시 */}
        <ToDoTemplate />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;

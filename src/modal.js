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

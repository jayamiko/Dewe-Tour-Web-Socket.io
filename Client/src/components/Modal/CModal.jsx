import React from "react";
import { Modal } from "react-bootstrap";
import "./CModal.css";

function CModal(props) {
  return (
    <Modal show={props.show}>
      <Modal.Body className="modal-content">{props.children}</Modal.Body>
    </Modal>
  );
}

export default CModal;

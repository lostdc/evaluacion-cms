import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ErrorModalProps {
  showError: boolean;
  errorMessage: string;
  handleClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ showError, errorMessage, handleClose }) => (
  <Modal show={showError} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Error</Modal.Title>
    </Modal.Header>
    <Modal.Body>{errorMessage}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ErrorModal;


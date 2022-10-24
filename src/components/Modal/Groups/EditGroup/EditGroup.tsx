import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export interface EditGroupProps {
  editTitle(text: string): void;
  closeModal(): void;
  removeGroup(): void;
  showModalGroup: boolean;
}

export const EditGroup = (props: EditGroupProps) => {
  let { editTitle, removeGroup, showModalGroup, closeModal } = props;
  const [title, setTitle] = useState("");


  return (
    <>
      <Modal show={showModalGroup} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Grupo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="descricao">
              <Form.Label>Título do grupo</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Altere o título do grupo"
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => editTitle(title)}>
            Salvar alterações
          </Button>
        </Modal.Footer>
        <Modal.Body>Deseja remover esse grupo?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => removeGroup()}>
            Sim
          </Button>
          <Button variant="danger" onClick={closeModal}>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
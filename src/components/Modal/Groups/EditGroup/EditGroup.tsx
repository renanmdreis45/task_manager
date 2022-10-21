import React, {useState} from 'react';
import { Modal, Form, Button} from 'react-bootstrap';

export interface EditGroupProps {
    editTitle(text: string): void;
    closeModal(): void;
    showModalGroup: boolean;
}

export const EditGroup = (props: EditGroupProps) => {
    let {editTitle, showModalGroup, closeModal} = props;
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
                  value = {title}
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
            <Button variant="primary" onClick={closeModal}>
              Fechar 
            </Button>
          </Modal.Footer>
        </Modal>
    </>
    )
}
import React, {useState} from 'react';
import { Modal, Form, Button} from 'react-bootstrap';

export interface EditGroupProps {
    newCard(desc: string, prazo: string, status: string): void;
    closeModal(): void;
    showModalCard: boolean;
}

export const AddCard = (props: EditGroupProps) => {
    let {newCard, closeModal, showModalCard} = props;
    const [desc, setDesc] = useState("");
    const [prazo, setPrazo] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmitCard = () => {
        newCard(desc,prazo,status)
        closeModal();

        setDesc('');
        setPrazo('')
        setStatus('');
    }


    return (
      <>
        <Modal show={showModalCard} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Novo cartão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="descricao">
              <Form.Label>Descrição do card</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira a descrição do cartão"
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="prazo"
            >
              <Form.Label> Prazo do card</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setPrazo(e.target.value)}
                placeholder="Insira o prazo do cartão (dia/mes)"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="status"
            >
              <Form.Label> Status do card</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Insira o status do cartão"
              />
             </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant = "primary" autoFocus onClick={handleSubmitCard}>
            Adicionar Card
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}
import React, { useState } from 'react';
import { IGroup } from '../../../../reducer/types';
import { Modal, Form, Button } from 'react-bootstrap';

export interface EditGroupProps {
    newCard(desc: string, prazo: string, status: string): void;
    closeModal(): void;
    showModalCard: boolean;
}

export const EditCard = (props: EditGroupProps) => {
    let { newCard, closeModal, showModalCard } = props;
    const [desc, setDesc] = useState("");
    const [prazo, setPrazo] = useState("");
    const [status, setStatus] = useState("");

    const handleEditCard = (e: any) => {
        e.preventDefault();
        newCard(desc, prazo, status)

        setDesc('');
        setPrazo('')
        setStatus('');

        closeModal();
    }


    return (
        <>
            <Modal show={showModalCard} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar cartão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="descricao">
                            <Form.Label>Descrição do card</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue=""
                                placeholder="Insira a descrição do cartão"
                                onChange={(event) => setDesc(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="prazo"
                        >
                            <Form.Label> Prazo do card</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue=""
                                onChange={(event) => setPrazo(event.target.value)}
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
                                defaultValue=""
                                onChange={(event) => setStatus(event.target.value)}
                                placeholder="Insira o status do cartão"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" autoFocus onClick={handleEditCard}>
                        Salvar alterações
                    </Button>
                    <Button variant="primary" autoFocus onClick={closeModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}



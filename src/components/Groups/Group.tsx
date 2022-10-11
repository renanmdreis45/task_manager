import React, { useState } from 'react';
import { MoreHorizontal } from "react-feather";
import "./Group.css";
import { ExitStatus } from 'typescript';
import { ICard, IGroup } from '../../interfaces/interface';
import { createTask, getCards, updateTask, deleteTask, updateGroup } from '../../services/requests';
import Card from "../Cards/Card";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


export interface GroupProps {
  group: IGroup;
  addCard: (groupId: string, card: ICard) => void;
  removeGroup: (groupId: string) => void;
  updateGroup: (groupId: string, title: string) => void;
  removeCard: (groupId: string, cardId: string) => void;
  updateCards: (groupId: string, cardId: string, card: ICard) => void;
}

function Group(props: GroupProps) {

  const { group, addCard, removeCard, updateCards, removeGroup } = props;
  const [showModalCard, setShowModalCard] = useState(false);
  const [showModalGroup, setShowModalGroup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [prazo, setPrazo] = useState("")
  const [status, setStatus] = useState("");

  const card: ICard = {
    id: String(Date.now() + Math.random()),
    desc: "",
    prazo: "",
    state: "",
  }

  const handleTitle = (e: any) => {
    const newTitle = e.target.value;

    setTitle(newTitle);
    group.title = newTitle;
  }


  const handleDescricao = (e: any) => {
    const newDescricao = e.target.value;

    setDesc(newDescricao);
    card.desc = desc;
  }

  const handlePrazo = (e: any) => {
    const newPrazo = e.target.value;

    setPrazo(newPrazo);
    card.prazo = prazo;
  }

  const handleStatus = (e: any) => {
    const newStatus = e.target.value;

    setStatus(newStatus);
    card.state = status;
  }

  const openModalGroup = () => {
    setShowModalGroup(true);
  }

  const closeModalGroup = () => {
    setShowModalGroup(false)
  }


  const openModalCard = () => {
    setShowModalCard(true);
  }

  const closeModalCard = () => {
    setShowModalCard(false)
  }

  const handleSubmitGroup = (e: any) => {
    e.preventDefault();

    setTitle("");

    clearFields(e);
  }

  const handleSubmitCard = (e: any) => {
    e.preventDefault();
    clearFields(e);
    console.log(card);
  }

  function clearFields(event: any) {
    Array.from(event.target).forEach((e: any) => (e.value = ''))
  }

  return (
    <div className="group">
      <div className="group-header">
        <p className='group-header-title'>
          {group.title}
          <span>({group.cards.length || 0})</span>
        </p>

        <div
          className="group-header-title-more"
          onClick={() => setShowDropdown(true)}
        >
          <MoreHorizontal onClick={openModalGroup}> </MoreHorizontal>

              <Modal show={showModalGroup} onHide={closeModalGroup}>
                <Modal.Header closeButton>
                  <Modal.Title>Editar Grupo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSubmitGroup}>
                    <Form.Group className="mb-3" controlId="descricao">
                      <Form.Label>Título do grupo</Form.Label>
                      <Form.Control
                        type="desc"
                        placeholder="Altere o título do card"
                        onChange={handleTitle}
                        autoFocus
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>      
                  <Button variant="primary" onClick={closeModalGroup} onSubmit={() => updateGroup(group?.id, group?.title)}>
                    Salvar alterações
                  </Button>
                  <Button variant="primary" type="submit" onClick={() => removeGroup(group?.id)}>
                    Remover grupo
                  </Button>
                </Modal.Footer>
              </Modal>
        </div>
      </div>
      <div className="group-cards">
        {group.cards.map((item) => (
          <Card
            key={item.id}
            card={item}
            groupId={group.id}
            removeCard={removeCard}
            updateCard={updateCards}
          />
        ))}
        <button className="board-add-card"
          onClick={openModalCard}
        >
          Adicionar Card
        </button>
      </div>
      <Modal show={showModalCard} onHide={closeModalCard}>
        <Modal.Header closeButton>
          <Modal.Title>Novo cartão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitCard}>
            <Form.Group className="mb-3" controlId="descricao">
              <Form.Label>Descrição do card</Form.Label>
              <Form.Control
                type="desc"
                placeholder="Insira a descrição do cartão"
                onChange={handleDescricao}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="prazo"
            >
              <Form.Label> Prazo do card</Form.Label>
              <Form.Control
                type="prazo"
                onChange={handlePrazo}
                placeholder="Insira o prazo do cartão (dia/mes)"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="status"
            >
              <Form.Label> Status do card</Form.Label>
              <Form.Control
                type="status"
                onChange={handleStatus}
                placeholder="Insira o status do cartão"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModalCard} onSubmit={() => addCard(group?.id, card)}>
            Adicionar Card
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Group;

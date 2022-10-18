import React, { useState, useCallback, useEffect} from 'react';
import { MoreHorizontal } from "react-feather";
import "./Group.css";
import { ExitStatus } from 'typescript';
import { ICard, IGroup } from '../../interfaces/interface';
import { createTask, getCards, updateTask, deleteTask, updateGroup} from '../../services/requests';
import CustomInput from '../UI/CustomInput/CustomInput';
import Card from "../Cards/Card";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import uuid from 'react-uuid';


export interface GroupProps {
  group: IGroup;
  addCard: (desc: string, prazo: string, status: string, group_id: string) => void;
  removeGroup: (groupId: string) => void;
  removeCard: (groupId: string, cardId: string) => void;
  updateCards: (groupId: string, cardId: string, card: ICard) => void;
  updateGroupTitle: (groupId: string, title: string) => void;
}

function Group(props: GroupProps) {

  const { group, addCard, updateCards, removeGroup, removeCard, updateGroupTitle} = props;
  const [showModalCard, setShowModalCard] = useState(false);
  const [showModalGroup, setShowModalGroup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [title, setTitle] = useState(group.title)
  const [desc, setDesc] = useState("")
  const [prazo, setPrazo] = useState("")
  const [status, setStatus] = useState("");

  const [cards, setCards] = useState<ICard[]>([]);
  
  useEffect(() => {
    fetchCards();
  })

  const fetchCards = useCallback(async () => {
    const cards: ICard[] = await getCards();
    setCards(cards);
    
   },[cards])


  const addCardHandler = () => {
    const newCard = {
      id: uuid(),
      desc: desc,
      prazo: prazo,
      state: status,
      group_id: group.id,
    }

    const tempCardsList = [...cards];
    tempCardsList.push(newCard);

    createTask(newCard);
    setCards(tempCardsList);

    
  }

  const handleSubmitCard = (e: any) => {
    e.preventDefault();
    if (desc === '' || prazo === '' || status === ""){
        return;
    }
    else {
       addCardHandler();
       setDesc('');
       setPrazo('')
       setStatus('');
    }
    setShowModalCard(false)
  }




  const handleTitle = (e:any) => {
      setTitle(e.target.value);
  }

  const handleDescricao = (e: any) => {
    setDesc(e.target.value);
  }


  const handlePrazo = (e: any) => {
    setPrazo(e.target.value);
  }

  const handleStatus = (e: any) => {
    setStatus(e.target.value);
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
    if (title === ''){
        return;
    }
    else {
       group.title = title;
       updateGroupTitle(group.id, group.title);
       setTitle('');
    }
    setShowModalGroup(false)
  }


  function clearFields(event: any) {
    Array.from(event.target).forEach((e: any) => (e.value = ''))
  }

  return (
    <div className="group">
      <div className="group-header">
        <p className='group-header-title'>
          {group.title}
          
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
                        placeholder="Altere o título do grupo"
                        onChange={handleTitle}
                        autoFocus
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>      
                  <Button variant="primary" onClick={handleSubmitGroup}>
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
        {group?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            groupId={group.id}
            updateCard={updateCards}
            removeCard={removeCard}
          />
        ))}

        <button className="board-add-card"
          onClick={openModalCard}
        >
          Adicionar Card
        </button>

        <Modal show={showModalCard} onHide={closeModalCard}>
        <Modal.Header closeButton>
          <Modal.Title>Novo cartão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="descricao">
              <Form.Label>Descrição do card</Form.Label>
              <Form.Control
                type="desc"
                placeholder="Insira a descrição do cartão"
                onChange={handleDescricao}
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
          <Button variant="primary" autoFocus onClick={handleSubmitCard}>
            Adicionar Card
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  )
}

export default Group;

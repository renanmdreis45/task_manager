import React, {useState} from 'react';
import { MoreHorizontal } from "react-feather";
import "./Group.css";
import  Dropdown  from "../UI/Dropdown/Dropdown";
import { ExitStatus } from 'typescript';
import { ICard , IGroup} from '../../interfaces/interface';
import {createTask, getCards, updateTask, deleteTask} from '../../services/requests';
import Card from "../Cards/Card";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


export interface GroupProps {
  group: IGroup;
  addCard: (groupId: string, card: ICard) => void;
  removeGroup: (groupId: string) => void;
  removeCard : (groupId: string, cardId: string) => void;
  updateCards: (groupId: string, cardId: string, card: ICard) => void;
}

function Group(props: GroupProps) {

    const {group, addCard, removeCard, updateCards, removeGroup} = props;
    const [showModal, setShowModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [desc, setDesc] = useState("")
    const [prazo, setPrazo] = useState("")
    const [status, setStatus] = useState("");

    const card: ICard = {
      id: String(Date.now() + Math.random()),
      desc: "",
      prazo: "",
      state: "",
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

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleSubmit = (e: any) => {
      e.preventDefault();

      card.id = "";
      card.desc = "";
      card.prazo = "";
      card.state = "";

      clearFields(e);
    }

    function clearFields(event: any){
      Array.from(event.target).forEach( (e: any) => (e.value = ''))
   } 
  
    return(
        <div className="group">
            <div className="group-header">
                <p className='group-header-title'>
                    {group.title}
                    <span>{group.cards.length || 0}</span>
                </p>
                <div
                  className="group-header-title-more"
                  onClick={() => setShowDropdown(true)}
                > 
                  <MoreHorizontal />
                  {showDropdown && (
                    <Dropdown
                      className="group-dropdown"
                      onClose={() => setShowDropdown(false)}
                    >
                      <p onClick={() => removeGroup(group?.id)}>Deletar Grupo</p>

                    </Dropdown>
                  )}
                </div>
            </div>
            <div className="group-cards">
                {group.cards.map((item) => (
                    <Card 
                      key={item.id}
                      card={item}
                      groupId = {group.id}
                      removeCard = {removeCard}
                      updateCard = {updateCards}
                    />
                ))}
                <button className="btn btn-primary"
                        onClick={openModal}
                >
                    Adicionar Card
                </button>
            </div>
                    <Modal show = {showModal} onHide={closeModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Novo cartão</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                          <Form.Group className="mb-3" controlId="descricao">
                            <Form.Label>Descrição do card</Form.Label>
                            <Form.Control
                              type="desc"
                              placeholder="Insira a descrição do cartão"
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
                              placeholder="Insira o prazo do cartão (dia/mes/ano)"
                              autoFocus
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="status"
                          >
                            <Form.Label> Status do card</Form.Label>
                            <Form.Control
                              type="status"
                              placeholder="Insira o prazo do cartão (dia/mes/ano)"
                              autoFocus
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={closeModal} onSubmit={() => addCard(group?.id, card)}>
                          Salvar alterações
                        </Button>
                      </Modal.Footer>
                    </Modal>
        </div>
    )
}

export default Group;
 
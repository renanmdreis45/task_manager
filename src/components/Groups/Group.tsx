import React, {useState, useContext, useEffect} from 'react'
import { ExitStatus } from 'typescript';
import { ICard , IGroup} from '../../interfaces/interface';
import {createTask, getCards, updateTask, deleteTask} from '../../services/requests'
import {data} from '../../States/data'
import Card from "../Cards/Card";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


export interface GroupProps {
  group: IGroup;
  addCard: (groupId: string, desc: string) => void;
  removeCard : (groupId: string, cardId: string) => void;
  updateCards: (groupId: string, cardId: string, card: ICard) => void;
}

function Group(props: GroupProps) {

    const {group, addCard, removeCard, updateCards} = props;
    const [cards, setCards] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [dropDown, setDropDown] = useState(false);

    async function getCards() {
        const cards: ICard[] = await getCards();
        
        const groupData = data.groups.find((item: any) => item.id === "1");

        groupData!.cards = cards.data;

        setCards(groupData!.cards);
        
    }

    useEffect(() => {
        getCards();
    }, [setCards])

    async function createCard(Card: any) {
        await createTask(Card);
            getCards();
    }

    async function deleteCard(cardId: string) {
        await deleteTask(cardId);
            getCards();
    }

    async function updateCard(cardId: string, card: any) {
        await updateTask(cardId, {
            desc: card.desc,
            prazo: card.prazo,
            state: card.state,
        })

        getCards();

    }

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const card = {
            id: cards.id,
            groupId: group.id,
            desc: cards.desc,
            prazo: cards.status,
    }
    }

    return(
        <div className="group">
            <div className="group-header">
                <p className='group-header-title'>
                    {group.title}
                    <span>{group.cards.length || 0}</span>
                </p>
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
            {showModal && (
                      <Modal onHide={closeModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Novo cartão</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Descrição do cartão</Form.Label>
                            <Form.Control
                              type="desc"
                              placeholder="Insira a descrição do cartão"
                              autoFocus
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={closeModal} onSubmit={handleSubmit}>
                          Salvar alterações
                        </Button>
                      </Modal.Footer>
                    </Modal>
            )}
        </div>
    )
}

export default Group;
 
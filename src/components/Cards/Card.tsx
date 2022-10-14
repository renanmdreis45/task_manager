import React, { useState, useEffect } from "react";
import "./Card.css";
import {Clock, MoreHorizontal, AlignLeft, Edit} from "react-feather";
import {formatDate} from "../../util/date"
import { Modal, Form, Button } from "react-bootstrap";
import {ICard} from "../../interfaces/interface";
import Dropdown from "../UI/Dropdown/Dropdown";


interface CardProps {
  card: ICard;
  groupId: string;
  updateCard: (groupID: string, cardId: string, card: ICard) => void;
  removeCard: (groupID: string, cardId: string) => void;
}

function Card(props: CardProps) {
    const {card, groupId, updateCard, removeCard} = props;
    const [showModal, setShowModal] = useState(false);
    const [cardValues, setCardValues] = useState<ICard>({
      ...card
    })
    const [desc, setDesc] = useState("")
    const [prazo, setPrazo] = useState("")
    const [state, setState] = useState("");

    function handleUpdateCard(groupId: string) {
      setCardValues({
        ...card,
        desc,
        prazo,
        state,
      })

      updateCard(groupId, cardValues.id, cardValues);
    }

    useEffect(() => {
      updateCard(groupId, cardValues.id, cardValues);
    }, [cardValues])


    return (
        <>        
            <div
                key={card.id}
                className="card"
            >             
              <div className="card-top">
                <div className="card-title"> <AlignLeft /> Tarefa: {cardValues.desc} </div>
                <div
                  className="card-top-more"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >   
                    <Edit />
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                          <Modal.Title>Editar cartão</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group className="mb-3" controlId="descricao">
                              <Form.Label>Descrição do card</Form.Label>
                              <Form.Control
                                type="desc"
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
                                type="prazo"
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
                                type="status"
                                defaultValue=""
                                onChange={(event) => setState(event.target.value)}
                                placeholder="Insira o status do cartão"
                              />
                            </Form.Group>
                          </Form>
                          <Button variant="primary" autoFocus onClick={() => handleUpdateCard(groupId)}>
                            Salvar alterações
                          </Button>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="primary" autoFocus onClick={() => removeCard(groupId, cardValues.id)}>
                            Remover card
                          </Button>
                        </Modal.Footer>
                        </Modal>
                </div>
              </div>
              <div className="card-title">Status: {cardValues.state}</div>            
              <div className="card-footer">
                    {cardValues.prazo && (
                        <p className="card-footer-item">
                          Prazo:
                            <Clock className="card-footer-icon" />
                                 {formatDate(cardValues.prazo)}
                        </p>
                    )}
              </div>
            </div>
      </>
    )

}

export default Card;
import React, { useState, useEffect } from "react";
import "./Card.css";
import {Clock, AlignLeft, Edit} from "react-feather";
import {formatDate} from "../../util/date"
import { Modal, Form, Button } from "react-bootstrap";
import {ICard} from "../../interfaces/interface";
import {EditCard} from "../Modal/Cards/EditCard/EditCard"


interface CardProps {
  card: ICard;
  updateCard: (cardId: string, desc: string, prazo: string, status: string) => void;
  removeCard: (cardId: string) => void;
}

function Card(props: CardProps) {
    const {card, updateCard, removeCard} = props;
    const [showModal, setShowModal] = useState(false);
    const [cardValues, setCardValues] = useState<ICard>({
      ...card
    })
    const [desc, setDesc] = useState("")
    const [prazo, setPrazo] = useState("")
    const [state, setState] = useState("");


    function handleUpdateCard() {
      setCardValues({
        ...card,
        desc,
        prazo,
        state,
      })

      updateCard(cardValues.id, cardValues.desc, cardValues.prazo, cardValues.state);
      setDesc("");
      setPrazo("");
      setState(""); 
      setShowModal(false);
    }


    useEffect(() => {
      updateCard(cardValues.id, cardValues.desc, cardValues.prazo, cardValues.state);
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
                    <EditCard 

                    />
                  
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
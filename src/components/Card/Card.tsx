import React, { useState, useEffect, useContext } from "react";
import "./Card.css";
import {Clock, AlignLeft, Edit} from "react-feather";
import {formatDate} from "../../util/date"
import { Modal, Form, Button } from "react-bootstrap";
import {ICard} from "../../interfaces/interface";
import {EditCard} from "../Modal/Cards/EditCard/EditCard"
import { GlobalContext } from "../../context/GlobalContext";


interface CardProps {
  card: ICard;
  removeCard: (cardId: string) => void;
}

function Card(props: CardProps) {
    const {card, removeCard} = props;
    const [showModal, setShowModal] = useState(false);
    const {updateCard, getGroups} = useContext(GlobalContext);

    return (
        <>        
            <div
                key={card.id}
                className="card"
            >             
              <div className="card-top">
                <div className="card-title"> <AlignLeft /> Tarefa: {card.desc} </div>
                <div
                  className="card-top-more"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >   
                    <Edit />
                    <EditCard 
                      newCard={(desc, prazo, status) => { 
                        updateCard(card.id, desc, prazo, status)
                      }}
                      closeModal={() => setShowModal(false)}
                      showModalCard = {showModal}
                    />
                  
                </div>
              </div>
              <div className="card-title">Status: {card.state}</div>            
              <div className="card-footer">
                    {card.prazo && (
                        <p className="card-footer-item">
                          Prazo:
                            <Clock className="card-footer-icon" />
                                 {formatDate(card.prazo)}
                        </p>
                    )}
              </div>
            </div>
      </>
    )

}

export default Card;
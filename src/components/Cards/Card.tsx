import React, { useState } from "react";
import "./Card.css";
import CardInfo from "../Cards/CardInfo/CardInfo";
import {Clock, MoreHorizontal, AlignLeft, Edit} from "react-feather";
import {formatDate} from "../../util/date"
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
    const {desc, prazo, state} = card;
    const [showModal, setShowModal] = useState(false);

    return (
        <>        
            <div
                key={card.id}
                className="card"
            >             
              <div className="card-top">
                <div className="card-title"> <AlignLeft /> Tarefa: {desc} </div>
                <div
                  className="card-top-more"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >   
                    <Edit />
                    {showModal && (
                        <CardInfo
                            onClose = {() => setShowModal(false)}
                            card = {card}
                            groupId = {groupId}
                            updateCard={updateCard}
                            removeCard={removeCard}
                        />
                    )} 
                </div>
              </div>
              <div className="card-title">Status: {state}</div>            
              <div className="card-footer">
                    {prazo && (
                        <p className="card-footer-item">
                          Prazo:
                            <Clock className="card-footer-icon" />
                                 {formatDate(prazo)}
                        </p>
                    )}
              </div>
            </div>
        </>
    )

}

export default Card;
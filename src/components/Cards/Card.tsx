import React, { useState } from "react";
import "./Card.css";
import CardInfo from "../Cards/CardInfo/CardInfo";
import {Clock, MoreHorizontal, AlignLeft} from "react-feather";
import {formatDate} from "../../util/date"
import {ICard} from "../../interfaces/interface";
import Dropdown from "../UI/Dropdown/Dropdown";


interface CardProps {
  card: ICard;
  groupId: string;
  removeCard: (groupID: string, cardId: string) => void;
  updateCard: (groupID: string, cardId: string, card: ICard) => void;

}

function Card(props: CardProps) {
    const {card, groupId, removeCard, updateCard} = props;
    const {id, desc, prazo, state} = card;
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && (
                <CardInfo
                    onClose = {() => setShowModal(false)}
                    card = {card}
                    groupId = {groupId}
                    updateCard={updateCard}
                />
            )}         
            <div
                key={card.id}
                className="card"
                onClick = {() => setShowModal(true)} 
            >             
              <div className="card-top">
                <div className="card-title"> <AlignLeft /> Tarefa: {desc} </div>
                <div
                  className="card-top-more"
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowDropdown(true);
                  }}
                >
                    <MoreHorizontal />
                    {showDropdown && (
                        <Dropdown
                          class="group-dropdown"
                          onClose={() => setShowDropdown(false)}
                        >
                          <p onClick={() => removeCard(groupId, id)}> Remover Card </p>
                        </Dropdown>
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
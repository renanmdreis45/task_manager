import React, { useState } from "react";
import "Card.css";
import CardInfo from "../Cards/CardInfo/CardInfo";
import {Clock} from "react-feather";
import {formatDate} from "../../util/date"
import {ICard} from "../../interfaces/interface";
import Dropdown from '../UI/Dropdown/Dropdown';

interface CardProps {
  card: ICard;
  groupId: number;
  removeCard: (groupID: number, cardId: number) => void;
  updateCard: (groupID: number, cardId: number) => void;

}

function Card(props: CardProps) {
    const {card, groupId, removeCard, updateCard} = props;
    const {id, desc, prazo, status} = card;
    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && 
                <CardInfo />
            }

            <div
                key={card.id}
                className="card"
                onClick = {() => setShowModal(true)} 
            >
                <div className="card-header-desc">
                    <p>{desc}</p>
                </div>
                <div
                  className="card-header-dropdown"
                  onClick={(event) => {
                    setShowDropdown(true);
                  }}
                >
                    {showDropdown && (
                        <Dropdown
                          class="group-dropdown"
                          onClose={() => setShowDropdown(false)}
                        >
                            <p onClick={() => updateCard(groupId, id)}> Editar Card </p>
                            <p onClick={() => removeCard(groupId, id)}> Remover Card </p>
                        </Dropdown>
                    )}
                </div>
                <div className="card-status">{status}</div>
                <div className="card-footer">
                    {prazo && (
                        <p className="card-footer item">
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
import React, {useEffect, useState} from "react";
import { 
    updateTask,
    deleteTask,
} from "../../../services/requests";
import "./CardInfo.css";
import CustomInput from "../../UI/CustomInput/CustomInput";

import {ICard} from "../../../interfaces/interface";
import Card from "../Card";

interface CardioInfoProps {
    onClose: () => void;
    card: ICard;
    updateCard: (groupId: number, cardId: string, card: ICard) => void;
    deleteCard: (cardId: string) => void;
}

function CardInfo(props: CardioInfoProps) {
    const {onClose, card, updateCard, deleteCard} = props;
    const [cardValues, setCardValues] = useState<ICard>({
      ...card,
    });

    const handleSubmit = (event: any) => {
        event.preventDefault();
        
        const card = {
            id: 
        }
    }


    return (
        <div className="card-info">
            <div className="card-info-box">
                <div className="card-info-box-title">
                  <p> Description</p>
                </div> 
            </div>
        </div>
    );
};

export default CardInfo;
import React, {useEffect, useState} from "react";
import "./CardInfo.css";
import CustomInput from "../../UI/CustomInput/CustomInput";

import {ICard} from "../../../interfaces/interface";
import Card from "../Card";

interface CardioInfoProps {
    onClose: () => void;
    card: ICard;
    groupId: number;
    updateCard: (groupId: number, cardId: number, card: ICard) => void;
}

function CardInfo(props: CardioInfoProps) {
    const {onClose, card, groupId, updateCard} = props;
    const [cardValues, setCardValues] = useState<ICard>({
      ...card,
    });

    const updateDesc = (value: string) => {
        setCardValues({...card, desc: value})
    }

    const updateStatus = (status: string) => {
        setCardValues({...card, state: status})
    }

    const updatePrazo = (prazo: string) => {
        if(!prazo) return;

        setCardValues({
            ...cardValues,
            prazo,
        });
    };

    useEffect(() => {
        if(updateCard) updateCard(groupId, cardValues.id, cardValues);
    }, [cardValues])

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
import React,  { useEffect, useState } from "react";
import { List, Calendar, Clock} from "react-feather";
import Modal from "../../UI/Modal/editCard/Modal";
import { updateTask } from "../../../services/requests";
import "./CardInfo.css";
import CustomInput from "../../UI/CustomInput/CustomInput";

import { ICard } from "../../../interfaces/interface";
import Card from "../Card";

interface CardioInfoProps {
    onClose: () => void;
    card: ICard;
    groupId: string;
    updateCard: (groupId: string, cardId: string, card: ICard) => void;
}

function CardInfo(props: CardioInfoProps) {
    const { onClose, card, updateCard, groupId} = props;
    const [cardValues, setCardValues] = useState<ICard>({
        ...card,
    });

    const updateDesc = (value: string) => {
        setCardValues({ ...cardValues, desc: value })
    }

    const updatePrazo = (prazo: string) => {
        setCardValues({ ...cardValues, prazo: prazo })
    }

    const updateStatus = (status: string) => {
        setCardValues({ ...cardValues, state: status })
    }

    
    useEffect(() => {
        if(updateCard) {
            updateCard(groupId, cardValues.id, cardValues)
            updateTask(groupId, cardValues)
        }
    }, [cardValues])

    return (
      <Modal onClose={onClose}>
        <div className="card-info">
            <div className="card-info-box">
                <div className="card-info-box-title">
                    <List />
                    <p> Descrição</p>
                </div>
                <CustomInput
                    defaultValue={cardValues.desc}
                    text={cardValues.desc || "Adicione uma descrição"}
                    placeholder="Insira a descrição do card"
                    onSubmit={updateDesc}
                />
            </div>
            <div className="cardinfo-box">
                <div className="cardinfo-box-title">
                    <Calendar />
                    <p>Prazo</p>
                </div>
[                <CustomInput
                    defaultValue={cardValues.prazo}
                    text={cardValues.prazo || "Adicione um prazo"}
                    placeholder="Insira o prazo do card"
                    onSubmit={updatePrazo}
                />
            </div>

            <div className="cardinfo-box">
                <div className="cardinfo-box-title">
                    <Clock />
                    <p>Status</p>
                </div>
[                <CustomInput
                    defaultValue={cardValues.state}
                    text={cardValues.state || "Adicione o status do card"}
                    placeholder="Insira o status do card"
                    onSubmit={updateStatus}
                />
            </div>

        </div>
      </Modal>
    );
};

export default CardInfo;
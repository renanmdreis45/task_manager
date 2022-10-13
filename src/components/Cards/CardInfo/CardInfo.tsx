import React,  { useEffect, useState } from "react";
import { List, Calendar, Clock} from "react-feather";
import { Modal, Form, Button } from "react-bootstrap";
import { updateTask } from "../../../services/requests";
import "./CardInfo.css";
import CustomInput from "../../UI/CustomInput/CustomInput";

import { ICard } from "../../../interfaces/interface";
import Card from "../Card";

interface CardioInfoProps {
    onClose: () => void;
    removeCard: (groupID: string, cardId: string) => void;
    card: ICard;
    groupId: string;
    updateCard: (groupId: string, cardId: string, card: ICard) => void;
}

function CardInfo(props: CardioInfoProps) {
    const { onClose, card, updateCard, groupId, removeCard} = props;
    const [cardValues, setCardValues] = useState<ICard>({
        ...card,
    });

    const updateDesc = (e: any) => {
        setCardValues({ ...cardValues, desc: e.target.value})
    }

    const updatePrazo = (e: any) => {
        setCardValues({ ...cardValues, prazo: e.target.value })
    }

    const updateStatus = (e: any) => {
        setCardValues({ ...cardValues, state: e.target.value })
    }


    return (
      <>
        <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar cartão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="descricao">
              <Form.Label>Descrição do card</Form.Label>
              <Form.Control
                type="desc"
                placeholder="Insira a descrição do cartão"
                onChange={updateDesc}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="prazo"
            >
              <Form.Label> Prazo do card</Form.Label>
              <Form.Control
                type="prazo"
                onChange={updatePrazo}
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
                onChange={updateStatus}
                placeholder="Insira o status do cartão"
              />
            </Form.Group>
          </Form>
          <Button variant="primary" autoFocus onClick={() => updateCard(groupId, cardValues.id, cardValues)}>
            Salvar alterações
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" autoFocus onClick={() => removeCard(groupId, cardValues.id)}>
            Remover card
          </Button>
        </Modal.Footer>
        </Modal>
      </>
    );
};

export default CardInfo;
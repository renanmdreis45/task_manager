import React, { useState, useCallback, useEffect, useReducer} from 'react';
import { EditGroup } from '../Modal/Groups/EditGroup/EditGroup';
import { AddCard } from '../Modal/Cards/AddCard/AddCard';
import { MoreHorizontal } from "react-feather";
import "./Group.css";
import { ICard, IGroup } from '../../interfaces/interface';
import { createTask, getCards, updateTask, deleteTask, updateGroup} from '../../services/requests';
import Card from "../Card/Card";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import uuid from 'react-uuid';
import { appData, appReducer } from '../../reducer/reducer';


export interface GroupProps {
  title: string;
  index: number;
  removeGroup: (groupId: string) => void;
  updateGroupTitle: (groupId: string, title: string) => void;
  addCard: (desc: string, prazo: string, status: string, groupId: string) => void;
}

function Group(props: GroupProps) {

  const { title, removeGroup, updateGroupTitle, addCard, index} = props;
  const [state, dispatch] = useReducer(appReducer, appData);
  const [showModalCard, setShowModalCard] = useState(false);
  const [showModalGroup, setShowModalGroup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [desc, setDesc] = useState("")
  const [prazo, setPrazo] = useState("")
  const [status, setStatus] = useState("");

  const [cards, setCards] = useState<ICard[]>([]);


  return (
    <div className="group">
      <div className="group-header">
        <p className='group-header-title'>
          {title}
          
        </p>

        <div
          className="group-header-title-more"
          onClick={() => setShowDropdown(true)}
        > 
        <MoreHorizontal onClick={() => setShowModalGroup(true)}> </MoreHorizontal>
        <EditGroup
          editTitle={(title) => {
            dispatch({type: 'UPDATE_GROUP', payload: {
              groupId: group.id,
              title: title,

            }})
          }}
          closeModal={() => setShowModalGroup(false)}
          showModalGroup = {showModalGroup}
        />

        </div>
      </div>
      <div className="group-cards">
         {state.groups[index].cards?.map((item) => {
            return (
              item.group_id === group.id && 
              <Card
                key={item.id}
                card={item}
                updateCard={updateCardHandler}
                removeCard={removeCardHandler}
              />
            )
          })}

        <button className="board-add-card"
          onClick={() => setShowModalCard(true)}
        >
          Adicionar Card
        </button>
        <AddCard 
          newCard={(desc, prazo, status) => {
            dispatch({type: 'ADD_CARD', payload: {
              groupId: group.id,
              desc: desc,
              prazo: prazo,
              state: status,
            }})
          }}
          closeModal = {() => setShowModalCard(false)}
          showModalCard = {showModalCard}
        />
      </div>
    </div>
  )
}

export default Group;

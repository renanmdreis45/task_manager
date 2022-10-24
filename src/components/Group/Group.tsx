import React, { useState, useCallback, useEffect, useReducer, useContext} from 'react';
import { EditGroup } from '../Modal/Groups/EditGroup/EditGroup';
import { AddCard } from '../Modal/Cards/AddCard/AddCard';
import { MoreHorizontal } from "react-feather";
import "./Group.css";
import { ICard, IGroup } from '../../interfaces/interface';
import Card from "../Card/Card";
import { appReducer } from '../../reducer/reducer';
import { GlobalContext } from '../../context/GlobalContext';
import { findItemIndexById } from '../../util/findItemIndexById';
import axios from 'axios'


export interface GroupProps {
  group: IGroup;
  index: number;
  addGroup(title: string): void;
  removeGroup(id: string): void;
}

function Group(props: GroupProps) {

  const { group, index, addGroup, removeGroup} = props;
  const [showModalCard, setShowModalCard] = useState(false);
  const [showModalGroup, setShowModalGroup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const {state, addCard, updateGroup, getGroups, removeCard} = useContext(GlobalContext);

  useEffect(() => {
    getGroups();
  }, [group])

  return (
    <div className="group">
      <div className="group-header">
        <p className='group-header-title'>
          {group.title}
          
        </p>

        <div
          className="group-header-title-more"
          onClick={() => setShowDropdown(true)}
        > 
        <MoreHorizontal onClick={() => setShowModalGroup(true)}> </MoreHorizontal>
        <EditGroup
          editTitle={(title) => {
            updateGroup(group.id, title)
            setShowModalGroup(false);
          }}
          removeGroup = {() => {
            removeGroup(group.id);
            setShowModalGroup(false);
          }}
          closeModal={() => setShowModalGroup(false)}
          showModalGroup = {showModalGroup}
        />

        </div>
      </div>
      <div className="group-cards">
         {state.groups[index]?.cards?.map((item) => {
            return (
              <Card
                key={item.id}
                card={item}
                removeCard={() => removeCard(item.id, group.id)}
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
            addCard(desc, prazo, status, group.id)
          }}
          closeModal = {() => setShowModalCard(false)}
          showModalCard = {showModalCard}
        />
      </div>
    </div>
  )
}

export default Group;

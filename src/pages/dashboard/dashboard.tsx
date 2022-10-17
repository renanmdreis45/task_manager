import React, { useEffect, useState, useContext} from "react";
import Group from "../../components/Groups/Group"
import uuid from 'react-uuid';
import "./dashboard.css";
import CustomInput from "../../components/UI/CustomInput/CustomInput";
import { ICard, IGroup } from '../../interfaces/interface'
import { createGroup, deleteGroup, getGroups, updateGroup, createTask, updateTask, deleteTask, getCards} from "../../services/requests";


function Dashboard() {
  
   const [groups, setGroups] = useState<IGroup[]>([]);
  
   useEffect(() => {
     fetchData()
   }, []);
  
   async function fetchData() {
    const groups: IGroup[] = await getGroups()
    setGroups(groups);
   }

   async function createGroupHandler(group: IGroup) {
      await createGroup(group);
   }

   const addGroupHandler = (title: string) => {
      const tempGroupsList = [...groups];
      const newGroup = {
        id: uuid(),
        title,
        cards: [],
      }
      createGroupHandler(newGroup);
      tempGroupsList.push(newGroup)
      setGroups(tempGroupsList);
   }

   async function updateGroupHandler(groupId: string, title: string) {
    await updateGroup(groupId, title);
   }

   async function updateGroupTitle(groupId: string, newTitle: string) {
    
    let new_title = "";

    const group_list = [...groups];

    group_list.forEach(currentGroup => {
      if(currentGroup.id === groupId) {
        currentGroup.title = newTitle;
        updateGroupHandler(currentGroup.id , currentGroup.title)
      }
    })

    const new_groups = [...group_list]

    setGroups(new_groups)
    
  }
    async function deleteGroupHandler(groupId: string) {
      await deleteGroup(groupId);
    }
   async function removeGroup(groupId: string) {
       let group_id = "";
       
       groups.filter(group => {
        if(group.id === groupId)  group_id = group.id;
      });

      const groupIndex = groups.findIndex((item: IGroup) => item.id === groupId);
      if(groupIndex < 0) return;
      
      deleteGroupHandler(group_id);
      groups.splice(groupIndex, 1);
      fetchData();
   }


  
  async function addCardHandler(card: ICard) {
    await createTask(card);
    getCards();
  }

  const addCard = (groupId: string, descricao: string, prazo: string, status: string) => {
      const groupIndex = groups.findIndex((item: IGroup) => item.id === groupId);

      if(groupIndex < 0) return;

      const tempGroupsList = [...groups];
      
      const tempCardsList = tempGroupsList[groupIndex].cards;

      const newCard = {
        id: uuid(),
        desc: descricao,
        prazo: prazo,
        state: status,
        group_id: String(groupIndex),
      }

      tempCardsList.push(newCard)
      addCardHandler(newCard);
      setGroups(tempGroupsList);
  }

  async function removeCardHandler(cardId: string) {
    await deleteTask(cardId);
    getCards();
  }

  const removeCard = (groupId: string, cardId: string) => {
      const groupIndex = groups.findIndex((item: IGroup) => item.id === groupId);
      if(groupIndex < 0) return;
      
      const tempGroupsList = [...groups]
      const cards = tempGroupsList[groupIndex].cards;

      const cardIndex = cards.findIndex((item: ICard) => item.id === cardId);
      removeCardHandler(String(cardIndex));
      cards.splice(cardIndex, 1);
      setGroups(tempGroupsList);
  }

  async function updateCardHandler(groupId: string, card: ICard) {
    await updateTask(groupId, card); 
    getCards();
  }

  const updateCard = (groupId: string, cardId: string, card: ICard) => {
    const groupIndex = groups.findIndex((item: any) => item.id === groupId);
    if(groupIndex < 0) return;

    const tempGroupsList = [...groups];
    const cards = tempGroupsList[groupIndex].cards;

    const cardIndex = cards.findIndex((item: any) => item.id === cardId);
    if(cardIndex < 0) return;

    tempGroupsList[groupIndex].cards[cardIndex] = card; 
    updateCardHandler(String(groupIndex), tempGroupsList[groupIndex].cards[cardIndex])
  }


  return (
    <div className="app">
      <div className="app-nav">
        <h1>Task Manager</h1>
      </div>
      <div className="app-boards-container">
        <div className="app-boards">
          {groups.map((item: IGroup) => {  
            return (
              <Group
                key={item.id}
                group={item}
                addCard={addCard}
                removeGroup={() => removeGroup(item.id)}
                updateGroup={() => updateGroupTitle(item.id, item.title)}
                removeCard={removeCard}
                updateCards={updateCard}
              />
            )
          })}
          <div className="app-boards-last">
            <CustomInput
              displayClass="app-boards-add-board"
              editClass="app-boards-add-board-edit"
              placeholder="Enter Board Name"
              text="Adicionar grupo"
              buttonText="Adicionar grupo"
              onSubmit={addGroupHandler}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
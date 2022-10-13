import React, { useEffect, useState, useContext} from "react";
import Group from "../../components/Groups/Group"
import "./dashboard.css";
import CustomInput from "../../components/UI/CustomInput/CustomInput";
import { ICard, IGroup } from '../../interfaces/interface'
import { createGroup, deleteGroup, getGroup, getGroups, updateGroup, createTask, updateTask, deleteTask, getCards} from "../../services/requests";


function Dashboard() {
  
   const [groups, setGroups] = useState<IGroup[]>([]);
  
   useEffect(() => {
     fetchData()
   }, []);
  
   async function fetchData() {
    const groups: IGroup[] = await getGroups();
    setGroups(groups);
   }

   async function createGroupHandler(group: IGroup) {
      await createGroup(group);
   }

   const addGroupHandler = (title: string) => {
      const tempGroupsList = [...groups];
      const newGroup = {
        id: String(Date.now() + Math.random()*2),
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

   async function updateGroup(groupId: string, newTitle: string) {

    const groupIndex = groups.findIndex((item: IGroup) => item.id === groupId);
    if(groupIndex < 0) return;

    const tempGroupsList = [...groups];
    const group = tempGroupsList[groupIndex];
    group.title = newTitle;
    
    updateGroupHandler(String(groupIndex), group.title)
    setGroups(tempGroupsList);
 }
   async function removeGroup(groupId: string) {

      const groupIndex = groups.findIndex((item: IGroup) => item.id === groupId);
      if(groupIndex < 0) return;

      groups.splice(groupIndex, 1);
      const tempGroupsList = [...groups];
      setGroups(tempGroupsList)
      deleteGroup(String(groupIndex));
   }


  
  async function addCardHandler(card: ICard) {
    await createTask(card);
  }

  const addCard = (groupId: string, descricao: string, prazo: string, status: string) => {
      const groupIndex = groups.findIndex((item: IGroup) => item.id === groupId);

      if(groupIndex < 0) return;

      const tempGroupsList = [...groups];

      const newCard = {
        id: String(Date.now() + Math.random() * 2),
        desc: descricao,
        prazo: prazo,
        state: status,
      }

      tempGroupsList[groupIndex].cards.push(newCard)
      addCardHandler(newCard);
      setGroups(tempGroupsList);
  }

  async function removeCardHandler(cardId: string) {
    await deleteTask(cardId);
  }

  const removeCard = (groupId: string, cardId: string) => {
      const groupIndex = groups.findIndex((item: IGroup) => item.id === groupId);
      if(groupIndex < 0) return;
      
      const tempGroupsList = [...groups]
      const cards = tempGroupsList[groupIndex].cards;

      const cardIndex = cards.findIndex((item: ICard) => item.id === cardId);
      cards.splice(cardIndex, 1);
      removeCardHandler(String(cardIndex));
      setGroups(tempGroupsList);
  }

  async function updateCardHandler(groupId: string, card: ICard) {
    await updateTask(groupId, card); 
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
          {groups.map((item: any) => (
            <Group
              key={item.id}
              group={item}
              addCard={addCard}
              removeGroup={() => removeGroup(item.id)}
              updateGroup={() => updateGroup(item.id, item.title)}
              removeCard={removeCard}
              updateCards={updateCard}
            />
          ))}
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
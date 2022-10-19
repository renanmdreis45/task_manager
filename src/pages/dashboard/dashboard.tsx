import React, { useEffect, useState, useContext, useCallback} from "react";
import Group from "../../components/Groups/Group"
import uuid from 'react-uuid';
import "./dashboard.css";
import CustomInput from "../../components/UI/CustomInput/CustomInput";
import { ICard, IGroup } from '../../interfaces/interface'
import { createGroup, deleteGroup, getGroups, updateGroup, createTask, updateTask, deleteTask, getCards} from "../../services/requests";



function Dashboard() {
  
   const [groups, setGroups] = useState<IGroup[]>([]);
  
   useEffect(() => {
     fetchGrupos()
   }, []);

  
   const fetchGrupos = useCallback(async () => {
    const groups: IGroup[] = await getGroups()
    setGroups(groups);
   },[groups])


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

  function updateGroupTitle(groupId: string, newTitle: string) {

    let edit = groups.slice()
    edit.forEach(currentGroup => {
      if(currentGroup.id === groupId) {
        currentGroup.title = newTitle;
      }
    })

    setGroups(edit);

    updateGroup(groupId, newTitle);
  }

    async function deleteGroupHandler(groupId: string) {
      await deleteGroup(groupId);
    }

   function removeGroup(groupId: string) {
  
      const groupIndex = groups.findIndex((item: IGroup) => item.id === groupId);
      if(groupIndex < 0) return;
      
      deleteGroupHandler(groupId);
      groups.splice(groupIndex, 1);
      const newGroups = [...groups];
      setGroups(newGroups);
   }

   async function createCardHandler(card: ICard) {
    await createTask(card);
 }

  function addCardHandler(desc: string, prazo: string, state: string, group_id: string) {

    const newCard: ICard = {
      id: uuid(),
      desc,
      prazo,
      state,
      group_id,
    }

    createCardHandler(newCard);
    console.log(newCard.group_id);
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
                removeGroup={() => removeGroup(item.id)}
                updateGroupTitle={updateGroupTitle}
                addCard = {addCardHandler}
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
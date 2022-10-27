import React, { useEffect, useState, useContext, useCallback, useReducer} from "react";
import Group from "../../components/Group/Group"
import uuid from 'react-uuid';
import "./dashboard.css";
import CustomInput from "../../components/UI/CustomInput/CustomInput";
import { ICard, IGroup } from '../../interfaces/interface'
import { data } from "../../actions/data";
import { GlobalContext } from "../../context/GlobalContext";



function Dashboard() {

   const {state, getGroups, addGroup, removeGroup} = useContext(GlobalContext);

   const addGroupHandler = (title: string) => {

      addGroup(title);
      console.log(state)
   }

   useEffect(() => {
      getGroups();
   }, [])


  return (
    <div className="app">
      <div className="app-nav">
        <h1>Task Manager</h1>
      </div>
      <div className="app-boards-container">
        <div className="app-boards">
          {state.groups.map((item: IGroup, i: number) => {  
            return (
              <Group
                index = {i}
                key = {item.id}
                group={item}
                removeGroup={() => removeGroup(item.id)}
                addGroup = {addGroupHandler}
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
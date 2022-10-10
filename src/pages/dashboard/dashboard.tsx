import React, { useEffect, useState, useContext} from "react";
import Group from "../../components/Groups/Group"
import "./Dashboard.css";
import CustomInput from "../../components/UI/CustomInput/CustomInput";
import { ICard, IGroup, IGroupState } from '../../interfaces/interface'
import { getGroups } from "../../services/requests";


function Dashboard() {
  
   const [group, setGroup] = useState([]);
  
   useEffect(() => {
     getGroups();
   }, []);

 
  return (
    <div className="app">
      <div className="app-nav">
        <h1>Task Manager</h1>
      </div>
      <div className="app-boards-container">
        <div className="app-boards">
          {group.map((item) => (
            <Group
              key={item.id}
              group={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              updateCard={updateCard}
            />
          ))}
          <div className="app-boards-last">
            <CustomInput
              displayClass="app-boards-add-board"
              editClass="app-boards-add-board-edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addboardHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
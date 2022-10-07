import React, { useEffect, useState } from "react";
import Group from "../components/Groups/Group";
import "./Dashboard.css";
import CustomInput from "../components/UI/CustomInput/CustomInput";
import { ICard ,IGroup } from '../interfaces/interface'
import { getGroups, createGroup, updateGroup } from '../services/requests'
import { setgroups } from "process";
import { group } from "console";

function Dashboard() {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const id = groups.title;
 
  useEffect(() => {
    getGroups().then(response => {
      setGroups(response.data)
    })
  }, []);
  


  const addGroup = (name: string) => {
    const groupList = [...groups];

    createGroup()

    
    groupList.push({
      id: "",
      title: name,
      cards: [],
    });
    setGroups(groupList);
  };

  const handleUpdateGroup = () => {
    updateGroup(groups.id, groups)
  }

  const removeGroup = (groupId: number) => {
    
  };

  const addCardHandler = (boardId: number, title: string) => {
    const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    tempBoardsList[boardIndex].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
      desc: "",
    });
    setBoards(tempBoardsList);
  };

  const removeCard = (boardId: number, cardId: number) => {
    const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoardsList);
  };

  const updateCard = (boardId: number, cardId: number, card: ICard) => {
    const boardIndex = groups.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    tempBoardsList[boardIndex].cards[cardIndex] = card;

    setBoards(tempBoardsList);
  };

  return (
    <div className="app">
      <div className="app-nav">
        <h1>Trello Kanban Board</h1>
      </div>
      <div className="app-boards-container">
        <div className="app-boards">
          {groups.map((item) => (
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
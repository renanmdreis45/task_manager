import React, {useState} from 'react'
import { ExitStatus } from 'typescript';
import { ICard , IGroup} from '../../interfaces/interface';
import Card from "../Cards/Card";


export interface GroupProps {
  group: IGroup;
  addCard: (groupId: number, desc: string) => void;
  removeCard : (groupId: number, cardId: number) => void;
  updateCard: (groupId: number, cardId: number, card: ICard) => void;
}

function Group(props: GroupProps) {

    const {group, addCard, removeCard, updateCard} = props;
    const [dropDown, setDropDown] = useState(false);

    return(
        <div className="group">
            <div className="group-header">
                <p className='group-header-title'>
                    {group.title}
                    <span>{group.cards.length || 0}</span>
                </p>
            </div>
        </div>
        <div className="group-cards">
            {group.cards.map((item) => (
                <Card 
                  key={item.id}
                  card={item}
                  groupId = {group.id}
                  removeCard = {removeCard}
                  updateCard = {updateCard}
                />
            ))}
            <CustomInput />
        </div>        
    )
}

export default Group;

import React, {useState, useContext, useEffect} from 'react'
import { ExitStatus } from 'typescript';
import { ICard , IGroup} from '../../interfaces/interface';
import {getCards} from '../../services/requests'
import {data} from '../../Actions/data'
import Card from "../Cards/Card";
import CustomInput from '../UI/CustomInput/CustomInput';


export interface GroupProps {
  group: IGroup;
  addCard: (groupId: string, desc: string) => void;
  removeCard : (groupId: string, cardId: string) => void;
  updateCard: (groupId: string, cardId: string, card: ICard) => void;
}

function Group(props: GroupProps) {

    const {group, addCard, removeCard, updateCard} = props;
    const [cards, setCards] = useState({})
    const [dropDown, setDropDown] = useState(false);

    async function getCards() {
        const cards = await getCards();
        
        const groupData = data.groups.find((item: any) => item.id === "1");

        groupData.cards = cards.data;

        setCards(groupData.cards);
        
    }

    useEffect(() => {
        getCards();
    }, [setCards])

    return(
        <div className="group">
            <div className="group-header">
                <p className='group-header-title'>
                    {group.title}
                    <span>{group.cards.length || 0}</span>
                </p>
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
                <CustomInput
                    text = "+ Adicionar cartão"
                    placeholder = 'Coloque a descrição do cartão'
                    displayClass='group-add-class'
                    editClass='groupa-add-class-edit'
                    onSubmit={(value: string) => addCard(group.id, value)}
                />
            </div>
        </div>
    )
}

export default Group;
 
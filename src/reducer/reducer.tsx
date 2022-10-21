import uuid from "react-uuid";
import { findItemIndexById } from "../util/findItemIndexById";
import { Action } from "./actions";
import { AppState, IGroup } from "./types";

const appData: AppState = {
    groups: []
}

const appReducer = (state: AppState, action: Action): AppState => {
    switch(action.type) {
        case 'ADD_GROUP': {
            return {
                ...state,
                groups: [
                    ...state.groups,
                    {
                        id: uuid(),
                        title: action.payload,
                        cards: [],
                    },
                ],
            };
        }

        case 'FETCH_GROUPS': 
            return {...state, groups: action.payload}
        

        case 'UPDATE_GROUP':
            return {...state, groups: state.groups.map((group) => (group.id === action.payload.id) ? {...group, title: action.payload.title} : group)};
        

        case 'REMOVE_GROUP':
            return {...state, groups: state.groups.filter((group) => group.id !== action.payload)};
        

        case 'ADD_CARD': 
            const targetIndexAdd = findItemIndexById(
                state.groups,
                action.payload.groupId
            );
            state.groups[targetIndexAdd].cards.push({
                id: uuid(),
                desc: action.payload.desc,
                prazo: action.payload.prazo,
                state: action.payload.state,
                group_id: action.payload.groupId,
            });
            
            return {
                ...state
            };
        

        case 'UPDATE_CARD':
            const targetIndexUpdate= findItemIndexById(
                state.groups,
                action.payload.groupId
            );
            
            state.groups[targetIndexUpdate].cards.map((card) => {
                card.id === action.payload.cardId ? (
                    {...card, 
                     desc: action.payload.desc,
                     prazo: action.payload.prazo,
                     state: action.payload.state,
                    }
                ) :  (card)
            });

            return {
                ...state,
            };
        

        case 'REMOVE_CARD':
            const targetIndexGroup = findItemIndexById(
                state.groups,
                action.payload.groupId,
            );

            const targetIndexCard = findItemIndexById(
                state.groups[targetIndexGroup].cards,
                action.payload.cardId,
            );

            let grupo = state.groups[targetIndexGroup];

            let cardList = grupo.cards.splice(targetIndexCard, 1);

            let newGroups = state.groups;

            newGroups = newGroups.map(group => group.id === action.payload.groupId ? {...group, cards: cardList} : group);
            newGroups = newGroups.map((group) => {
                return {
                    ...group,
                    cards: group.cards.filter((card) => card.id !== action.payload.cardId),
                }
            });

            return {
                ...state, 
                groups: newGroups,
            };
            
        
        default: {
            return state;
        }

        
    }
}
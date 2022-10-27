import uuid from "react-uuid";
import { findItemIndexById } from "../util/findItemIndexById";
import { Action } from "./actions";
import { AppState, IGroup } from "./types";


export const appReducer = (state: AppState, action: Action): AppState => {
    switch(action.type) {
        case 'addGroup': {
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

        case 'getGroups': 
            return {
                ...state,
                loading: false,
                groups: action.payload
            }
        

        case 'updateGroup':
            return {...state, groups: state.groups.map((group) => (group.id === action.payload.groupId) ? {...group, title: action.payload.title} : group)};
        

        case 'removeGroup':
            return {...state, groups: state.groups.filter((group) => group.id !== action.payload)};
        

        case 'addCard': 
            const newGroupsCards = state.groups.map((group) => (group.id === action.payload.group_id) ? ({
                ...group,
                cards: [
                    ...group.cards,
                    {
                        id: uuid(),
                        desc: action.payload.desc,
                        prazo: action.payload.prazo,
                        state: action.payload.state,
                        group_id: action.payload.group_id,
                    },
                ],
            }) : (group))

            return {
                ...state,
                groups: newGroupsCards,
            };
        

        case 'updateCard':
            
            const groupsUpdated = state.groups.map((group) => group.id === action.payload.groupId ? ({
                ...group,
                cards:group.cards.map(card => card.id === action.payload.cardId ? ({
                    ...card,
                    desc: action.payload.desc,
                    prazo: action.payload.prazo,
                    state: action.payload.state,                       
                }) : 
                (card) )

            }) : 
            (group) );
            
            return {
                ...state, 
                groups: groupsUpdated,
            };



        case 'removeCard':
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
        
        
        case 'GROUP_ERROR':
            return {
                ...state,
                error: action.payload,
            }
        
        default: {
            return state;
        }

        
    }
}
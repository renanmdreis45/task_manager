import uuid from "react-uuid";
import React, { createContext, useReducer } from "react";
import { AppState, IGroup, ICard } from "../reducer/types";
import { appReducer } from "../reducer/reducer";
import axios from "axios";
import { GlobalContext } from "./globalContext";

export const appData: AppState = {
    groups: [],
    error: null,
    loading: true,
}

interface Props {
    children: JSX.Element | JSX.Element[] 
}

export const GlobalProvider = ({children}: Props) => {

    const [state, dispatch] = useReducer(appReducer, appData);

    async function addGroup(group: IGroup) {
        const head = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/groups', group, head);

            dispatch({
                type:'addGroup',
                payload: res.data,
            });

        } catch(err: any) {
            
            dispatch({
                type: 'GROUP_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function getGroups(groups: IGroup[]) {
    
    }

    async function updateGroup(group: IGroup) {
        
    }

    async function removeGroup(id: string) {
        
    }

    async function addCard(card: ICard) {
        
    }

    async function updateCard(card: ICard) {

    }

    async function removeCard(id: string) {
        
    }


    return (
        <GlobalContext.Provider value={{
            state, 
            addGroup,
            getGroups,
            updateGroup,
            removeGroup,
            addCard,
            updateCard,
            removeCard
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
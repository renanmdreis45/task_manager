import uuid from "react-uuid";
import React, { createContext, useReducer } from "react";
import { AppState, IGroup, ICard } from "../../reducer/types";
import { appReducer } from "../../reducer/reducer";
import axios from "axios";

export const appData: AppState = {
    groups: [],
    error: null,
    loading: true
}

export const GlobalContext = createContext<AppState | null>(appData);

interface Props {
    children: JSX.Element;
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
                type:'ADD_GROUP',
                payload: res.data,
            })
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
        <GlobalContext.Provider value={appData}>
            {children}
        </GlobalContext.Provider>
    );
}
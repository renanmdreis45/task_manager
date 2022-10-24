import uuid from "react-uuid";
import React, { createContext, useEffect, useReducer } from "react";
import { AppState, IGroup, ICard } from "../reducer/types";
import { appReducer } from "../reducer/reducer";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import { displayPartsToString } from "typescript";

const api = axios.create({
    baseURL: "http://localhost:8000",
  });

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

    const head = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    async function addGroup(title: string) {

        try {
             await api.post('/groups', {
                title,
            }, head);

            dispatch({
                type:'addGroup',
                payload: title,
            });

        } catch(err: any) {
            
            dispatch({
                type: 'GROUP_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function getGroups() {
        try {
            const groups = await api.get('/groups', head)

            dispatch({
                type:'getGroups',
                payload: groups.data,
            })
        } catch (err: any) {
            dispatch({
                type:'GROUP_ERROR',
                payload: err.response.data.error

            })
        }
    }

    async function updateGroup(groupId: string, newTitle: string) {
        try {
            const res = await api.put(`/groups/${groupId}`, {
                title: newTitle,
            });

            dispatch({
                type: 'updateGroup',
                payload: res.data
            })
        } catch (err: any) {
            dispatch({
                type: 'GROUP_ERROR',
                payload: err.response.data.error
            })
        }
        
    }

    async function removeGroup(id: string) {

        try {
            await api.delete(`groups/${id}`)

            dispatch({
                type: 'removeGroup',
                payload: id,
            })
        } catch(err: any) {
            dispatch({
                type: 'GROUP_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function addCard(desc: string, prazo: string, state: string, group_id: string) {
        try {
            await api.post('/tasks', {
                desc,
                prazo,
                state,
                group_id,
            });

            dispatch({
                type: 'addCard',
                payload: {
                    desc,
                    prazo,
                    state,
                    group_id
                }
            })
        } catch (err: any) {
            dispatch({
                type: 'GROUP_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function updateCard(cardId: string, desc: string, prazo: string, status: string) {
        try {
            const res = await api.put('/tasks', {
                cardId,
                desc,
                prazo,
                status,
            })

            dispatch({
                type: 'updateCard',
                payload: res.data
            })
        } catch(err: any) {
            dispatch({
                type: 'GROUP_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function removeCard(cardId: string, groupId: string) {
        try {
            await api.delete(`/tasks/${cardId}`)

            dispatch({
                type: 'removeCard',
                payload: {
                    cardId,
                    groupId
                }
            })
        } catch(err: any) {
            dispatch({
                type: 'GROUP_ERROR',
                payload: err.response.data.error
            })
        }
    }

    useEffect(() => {
        getGroups()
    }, [state])

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
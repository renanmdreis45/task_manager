import {createContext} from "react";
import { AppState, IGroup, ICard} from "../reducer/types";


export type GlobalContextProps = {
    state: AppState;
    addGroup: (title: string) => void;
    getGroups: () => void;
    updateGroup: (groupId: string, newTitle: string) => void;
    removeGroup: (id: string) => void;
    addCard: (desc: string, prazo: string, status: string, groupId: string) => void;
    updateCard: (cardId: string, desc: string, prazo: string, status: string) => void;
    removeCard: (cardId: string, groupId: string) => void;   
}

export const appData: AppState = {
    groups: [],
    error: null,
    loading: true,
}

export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);
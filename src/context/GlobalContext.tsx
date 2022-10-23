import {createContext} from "react";
import { AppState, IGroup, ICard} from "../reducer/types";


export type GlobalContextProps = {
    state: AppState;
    addGroup: (group: IGroup) => void;
    getGroups: (groups: IGroup[]) => void;
    updateGroup: (group: IGroup) => void;
    removeGroup: (id: string) => void;
    addCard: (card: ICard) => void;
    updateCard: (card: ICard) => void;
    removeCard: (id: string) => void;   
}

export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);
import React, {createContext} from "react";
import { Action } from "./actions";

export type ICard = {
    id: string;
    desc: string;
    prazo: string;
    state: string;
    group_id: string;
}

export type IGroup = {
    id: string;
    title: string;
    cards:  ICard[]
}

export interface AppStateContextProps {
    state: AppState;
    dispatch: React.Dispatch<Action>;
}

export interface AppState {
    groups: IGroup[];
}

export const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps  
);
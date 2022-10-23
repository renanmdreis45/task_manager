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
export interface AppState {
    groups: IGroup[];
    error: any;
    loading: boolean;
}

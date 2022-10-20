import { type } from "os";
import React from "react";
import { ICard, IGroup } from "./types";

export type Action =
    | {type: 'ADD_GROUP', payload: IGroup}
    | {type: 'GET_GROUPS', payload: IGroup[]}
    | {type: 'UPDATE_GROUP', payload: IGroup}
    | {type: 'REMOVE_GROUP', payload: string}
    | {type: 'ADD_CARD', payload: ICard}
    | {type: 'GET_CARDS', payload: ICard[]}
    | {type: 'UPDATE_CARD', payload: ICard}
    | {type: 'REMOVE_CARD', payload: string}
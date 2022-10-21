import { type } from "os";
import React from "react";
import { ICard, IGroup } from "./types";

export type Action =
    | {type: 'ADD_GROUP', payload: string}
    | {type: 'FETCH_GROUPS', payload: IGroup[]}
    | {type: 'UPDATE_GROUP', payload: IGroup}
    | {type: 'REMOVE_GROUP', payload: string}
    | {type: 'ADD_CARD', payload: {
        desc: string;
        prazo: string;
        state: string;
        groupId: string;
      }}
    | {type: 'UPDATE_CARD', payload: {
        cardId: string;
        desc: string;
        prazo: string;
        state: string;
        groupId: string;
    }}
    | {type: 'REMOVE_CARD', payload: {
        groupId: string;
        cardId: string;
    }}
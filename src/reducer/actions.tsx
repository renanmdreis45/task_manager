import { type } from "os";
import React from "react";
import { ICard, IGroup } from "./types";

export type Action =
    | {type: 'addGroup', payload: string}
    | {type: 'getGroups', payload: IGroup[]}
    | {type: 'updateGroup', payload: {
        groupId: string;
        title: string;
    }}
    | {type: 'removeGroup', payload: string}
    | {type: 'addCard', payload: {
        desc: string;
        prazo: string;
        state: string;
        group_id: string;
      }}
    | {type: 'updateCard', payload: {
        cardId: string;
        desc: string;
        prazo: string;
        state: string;
        groupId: string;
    }}
    | {type: 'removeCard', payload: {
        groupId: string;
        cardId: string;
    }}
    | {type: 'GROUP_ERROR', payload: any}
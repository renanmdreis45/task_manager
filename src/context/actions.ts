import { GroupState } from "./states";

export enum ActionType {
    GetGroups,
    CreateGroup,
    UpdateGroup,
    RemoveGroup,
}

export interface GetGroups {
    type: ActionType.GetGroups;
    payload: GroupState;
}

export interface CreateGroup {
    type: ActionType.CreateGroup;
    payload: GroupState;
}

export interface UpdateGroup {
    type: ActionType.UpdateGroup;
    payload: { 
        id: string; 
        title: string;
    };
}

export interface RemoveGroup {
    type: ActionType.RemoveGroup;
    payload: { id: string; }
}

export type GroupActions = GetGroups | CreateGroup | UpdateGroup | RemoveGroup ;
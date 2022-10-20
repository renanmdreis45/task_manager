import { IGroup } from "../interfaces/interface";

export type GroupContextType = {
    groups: IGroup[]
    addGroup: (group: IGroup) => void;
    getGroups: ()
    updateGroup: (group: IGroup) => void;

}
import { createContext } from "react";
import {IGroupState} from "../../interfaces/interface";


export type GroupContextProps = {
    groupState: IGroupState
}

export const GroupContext = createContext<GroupContextProps>({} as GroupContextProps);
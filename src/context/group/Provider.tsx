import { GroupContext } from "./Context";
import {IGroupState } from "../../interfaces/interface"
import { useReducer } from "react";
import { groupReducer } from "./Reducer";
import axios from "axios";
import {initialState} from "./Reducer"

const URL = "http://localhost:8080";


interface props {
    children: JSX.Element | JSX.Element[]
}

export const GroupProvider = ({ children } : props) => {

    const [groupState, dispatch] = useReducer(groupReducer, initialState);

    return (
        <GroupContext.Provider value = {{ groupState}}>
            { children }
        </GroupContext.Provider>
    )
}
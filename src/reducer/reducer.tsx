import uuid from "react-uuid";
import { Action } from "./actions";
import { AppState, IGroup } from "./types";

const appData: AppState = {
    groups: []
}

const appReducer = (state: AppState, action: Action): AppState => {
    switch(action.type) {
        case 'ADD_GROUP': {
            return {
                ...state,
                groups: [
                    ...state.groups,
                    {
                        id: uuid(),
                        title: action.payload,
                        cards: [],
                    },
                ],
            };
        }   
    }
}
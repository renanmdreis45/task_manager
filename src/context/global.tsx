import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';
import { groupReducer, GroupActions, InitialState  } from './reducer';
import { ICard } from '../interfaces/interface'
import { GroupType, InitialStateType} from './states';

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<GroupActions>;
}>({
  state: InitialState,
  dispatch: () => null
});

const mainReducer = (
  { groups }: InitialStateType,
  action: GroupActions
) => ({
  groups: groupReducer(groups, action),
});



const AppProvider: React.FC = ({ children }: ReactNode) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext };
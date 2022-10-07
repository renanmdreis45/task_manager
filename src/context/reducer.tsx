import { type } from "@testing-library/user-event/dist/type";
import { updateGroup } from "../services/requests";
import { ActionType, GroupActions } from "./actions";
import { GroupState} from "./states";

export function groupReducer(state: GroupState, action: GroupActions): GroupState {
  switch (action.type) {
      case ActionType.GetGroups:
      return { ...state, cards: action.payload}

      case ActionType.CreateGroup:
      return { ...state, cards: [action.payload, ...state.cards] }


      case ActionType.RemoveGroup:
      return


      case ActionType.UpdateGroup:
      let newState = {
          ...state,
          groups: state.groups.map((group: GroupType) =>
          group.id === action.payload.id
              ? {
                  ...group,
                  title: action.payload.title,
              }
              : group
          ),
      };

      return {
          ...newState,
          winner: updateGroup(newState.players),
          gameStatus: getGameStatus(newState),
      };

      default:
      return state;
  }
}

import { ICard , IGroup} from "../interfaces/interface";

export type GroupState = {
    id: string;
    title: string;
    cards: ICard[];
};

export const InitialState: GroupState[] = [{
  id: "", title: "", cards: [],
}]

  
  
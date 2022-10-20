import uuid from "react-uuid";
import { ICard, IGroup } from "../interfaces/interface";

interface IData {
    groups: IGroup[]
}

export const data: IData = {
    groups: [
      {
        id: uuid(),
        title: "Grupo 1",
        cards: [],
      },
    ],
  };
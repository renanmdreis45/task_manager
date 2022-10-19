import axios from "axios";
import { ICard, IGroup } from "../interfaces/interface";

const api = axios.create({
   baseURL: "http://localhost:8000",
 });

//POST
export function createGroup(group: IGroup) {
   return api.post("/groups", group)
}

export function createTask(card: ICard) {
   return api.post("/tasks", card)
} 

//GET

export function getGroups(): Promise<IGroup[]> {
   return api.get("/groups")
             .then(response => response.data)
}

export const getCards = (): Promise<ICard[]> => {
   return api.get('/tasks')
             .then(response => response.data)
}


//PUT

export function updateGroup(groupId: string, newTitle: string) {
   return api.put(`/groups/${groupId}`, {
      title: newTitle,
   })
   .then()
}

export function updateTask(cardId: string, newDesc: string, newPrazo: string, newStatus: string) {
   return api.put(`/tasks/${cardId}`, {
      desc: newDesc, 
      prazo: newPrazo,
      state: newStatus,
   })
   .then()
}

//DELETE

export function deleteGroup(id: string) {
   return api.delete(`/groups/${id}`)
}

export function deleteTask(id: string) {
   return api.delete(`/tasks/${id}`)
}
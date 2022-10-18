import axios from "axios";
import { RandomUUIDOptions } from "crypto";
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

export function getGroup(id: string) {
   return api.get(`/groups/${id}`)
}

export const getCards = () => {
   return api.get('/tasks')
             .then(response => response.data)
}

export function getCard(id: string) {
   return api.get(`/tasks/${id}`)
}

//PUT

export function updateGroup(groupId: string, newTitle: string) {
   return api.put(`/groups/${groupId}`, {
      title: newTitle,
   })
   .then()
}

export function updateTask(id: string, card: ICard) {
   return api.put(`/tasks/${id}`, card);
}

//DELETE

export function deleteGroup(id: string) {
   return api.delete(`/groups/${id}`)
}

export function deleteTask(id: string) {
   return api.delete(`/tasks/${id}`)
}
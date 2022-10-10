import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost:8000",
 });

//POST
export function createGroup(group: any) {
   return api.post("/groups", group)
}

export function createTask(card: any) {
   return api.post("/tasks", card)
} 

//GET

export function getGroups() {
   return api.get("/groups")
}

export function getGroup(id: string) {
   return api.get(`/groups/${id}`)
}

export const getCards = () => {
   return api.get('/tasks')
}

export function getCard(id: string) {
   return api.get(`/tasks/${id}`)
}

//PUT

export function updateGroup(id: string, group: any) {
   return api.put(`/groups/${id}`, group);
}

export function updateTask(id: string, card: any) {
   return api.put(`/tasks/${id}`, card);
}

//DELETE

export function deleteGroup(id: string) {
   return api.delete(`/groups/${id}`)
}

export function deleteTask(id: string) {
   return api.delete(`/tasks/${id}`)
}
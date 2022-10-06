import axios from "axios";

const URL = "http://localhost:8080";

//POST
export function createGroup(group: any) {
   return axios.post("/groups", group)
}

export function createCard(card: any) {
   return axios.post("/tasks", card)
} 

//GET

export function getGroups() {
   return axios.get("/groups")
}

export function getGroup(id: string) {
   return axios.get(`/groups/${id}`)
}

export function getCards() {
   return axios.get('/tasks')
}

export function getCard(id: string) {
   return axios.get(`/tasks/${id}`)
}

//PUT

export function updateGroup(id: string, group: any) {
   return axios.put(`/groups/${id}`, group);
}

export function updateTask(id: string, card: any) {
   return axios.put(`/tasks/${id}`, card);
}

//DELETE

export function deleteGroup(id: string) {
   return axios.delete(`/groups/${id}`)
}

export function deleteTask(id: string) {
   return axios.delete(`/tasks/${id}`)
}
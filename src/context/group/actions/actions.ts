import { ADD_NEW_GROUP, ADD_NEW_TASK, CHANGE_TITLE, DELETE_GROUP, DELETE_TASK, EDIT_TASK } from "./types"

export const addNewList = (data: {title: string, taskList: string[], id: number}) => {
    return {
        type: ADD_NEW_GROUP,
        payload: data
    }
}

export const addNewTask = (id: string, desc: string, prazo: string, status: string) => {
    return {
        type: ADD_NEW_TASK,
        payload: {id, desc, prazo, status}
    }
}

export const editTask = (prevTask: {desc: string, prazo: string, status: string}, newTask: {desc: string, prazo: string, status: string}, id: string) => {
    return {
        type: EDIT_TASK,
        payload: {prevTask, newTask, id}
    }
}

export const deleteTask = (taskItem: string, id: string) => {
    return {
        type: DELETE_TASK,
        payload: {taskItem, id}
    }
}

export const deleteGroup = (id: string) => {
    return {
        type: DELETE_GROUP,
        payload: id
    }
}

export const changeTitle = (id: string, newTitle: string) => {
    return {
        type: CHANGE_TITLE,
        payload: {id, newTitle}
    }
}

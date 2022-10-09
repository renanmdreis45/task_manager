import { ADD_NEW_GROUP, ADD_NEW_TASK, CHANGE_TITLE, DELETE_GROUP, DELETE_TASK, EDIT_TASK} from "./actions/types"

interface GroupProps {
    title: string
    taskList: string[],
    id: number
}
interface IInitialStateProps {
    group: GroupProps[]
}

export const initialState: IInitialStateProps = {
    group: [
        {
            title: 'Default Name',
            taskList: ['Task 1', 'Task 2', 'Task 3'],
            id: Date.now()
        }
    ]
}

export const groupReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case ADD_NEW_GROUP: {
            return {
                list: [...state.group, action.payload]
            }
        }


        case ADD_NEW_TASK: {
            let list = [...state.group]
            list.forEach((item: any) => {
                if (item.id === action.payload.id) {
                    let newTaskList = [...item.taskList]
                    newTaskList.push(action.payload.task)
                    item['taskList'] = newTaskList
                }
            })
            return {
                list
            }
        }


        case EDIT_TASK: {
            let list = [...state.group]
            list.forEach((item: any) => {
                if (item.id === action.payload.id) {
                    let newTaskList = [...item.taskList]
                    const index = newTaskList.indexOf(action.payload.prevTask)
                    if (index !== -1) {
                        newTaskList[index] = action.payload.newTask
                        item['taskList'] = newTaskList
                    }
                }
            })
            return {
                list
            } 
        }


        case DELETE_TASK: {
            let list = [...state.group]
            list.forEach((item: any) => {
                if (item.id === action.payload.id) {
                    let newTaskList = [...item.taskList]
                    const index = newTaskList.indexOf(action.payload.taskItem)
                    if (index !== -1) {
                        newTaskList.splice(index, 1)
                        item['taskList'] = newTaskList
                    }
                }
            })
            return {
                list
            }
        }


        case DELETE_GROUP: {
            let list = [...state.group]
            let key = 0
            list.forEach((item: any, index: number) => {
                if (item.id === action.payload) {
                    key = index
                }
            })
            list.splice(key, 1)
            return {
                list
            }
        }


        case CHANGE_TITLE: {
            let list = [...state.group]
            list.forEach((item: any) => {
                if (item.id === action.payload.id) {
                    item.title = action.payload.newTitle
                }
            })
            return {
                list
            }
        }

        default: return state
    }
}
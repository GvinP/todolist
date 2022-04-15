import {TasksType} from "../App";
import {v1} from "uuid";
import {ADD_TODOLIST, addTodolistActionType, REMOVE_TODOLIST, removeTodolistActionType} from "./todolistReducer";

const ADD_TASK = 'ADD-TASK'
const REMOVE_TASK = 'REMOVE-TASK'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'

type allActionsType = addTaskActionType | removeTaskActionType
    | changeTaskTitleActionType | changeTaskStatusActionType
    | removeTodolistActionType | addTodolistActionType

// type addTodolistActionType = ReturnType<typeof addTodolistAC>
// type changeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
// type changeFilterActionType = ReturnType<typeof changeFilterAC>

type addTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
type removeTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}
type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}
export const addTaskAC = (todolistId: string, title: string): addTaskActionType => {
    return {
        type: ADD_TASK,
        todolistId: todolistId,
        title: title
    }
}
export const removeTaskAC = (todolistId: string, taskId: string): removeTaskActionType => {
    return {
        type: REMOVE_TASK,
        todolistId: todolistId,
        taskId: taskId
    }
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): changeTaskTitleActionType => {
    return {
        type: CHANGE_TASK_TITLE,
        todolistId: todolistId,
        taskId: taskId,
        title: title
    }
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): changeTaskStatusActionType => {
    return {
        type: CHANGE_TASK_STATUS,
        todolistId: todolistId,
        taskId: taskId,
        isDone: isDone
    }
}

export const taskReducer = (state: TasksType, action: allActionsType): TasksType => {
    switch (action.type) {
        case ADD_TASK:
            const newTask = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case REMOVE_TASK:
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        case CHANGE_TASK_TITLE:
            return {...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.title
                } : el)
            }
        case CHANGE_TASK_STATUS:
            return {...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        case REMOVE_TODOLIST:
            let stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        case ADD_TODOLIST:
            return {...state, [action.newTodolistId]: []}
        default:
            return state
    }
}
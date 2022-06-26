import {
    ADD_TODOLIST,
    addTodolistActionType,
    REMOVE_TODOLIST,
    removeTodolistActionType,
    SET_TODOLISTS,
    setTodolistActionType
} from "./todolistReducer";
import {Dispatch} from "redux";
import {TaskType, todolistsAPI, TodolistType, UpdateTaskModelType} from "../api/todolist-api";


const ADD_TASK = 'ADD-TASK'
const SET_TASKS = 'SET-TASKS'
const REMOVE_TASK = 'REMOVE-TASK'
const CHANGE_TASK = 'CHANGE-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'

export type TasksType = {
    [key: string]: Array<TaskType>
}

type allActionsType = addTaskActionType | removeTaskActionType
    | changeTaskActionType | changeTaskStatusActionType
    | removeTodolistActionType | addTodolistActionType | setTasksActionType | setTodolistActionType

type addTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    task: TaskType
}
type setTasksActionType = {
    type: 'SET-TASKS'
    todolistId: string
    tasks: Array<TaskType>
}
type removeTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type changeTaskActionType = {
    type: 'CHANGE-TASK'
    todolistId: string
    taskId: string
    model: UpdateTaskModelType
}
type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    task: TaskType
    status: number
}
export const addTaskAC = (todolistId: string, task: TaskType): addTaskActionType => {
    return {
        type: ADD_TASK,
        todolistId,
        task
    }
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>): setTasksActionType => {
    return {
        type: SET_TASKS,
        todolistId,
        tasks
    }
}
export const removeTaskAC = (todolistId: string, taskId: string): removeTaskActionType => {
    return {
        type: REMOVE_TASK,
        todolistId: todolistId,
        taskId: taskId
    }
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, model: UpdateTaskModelType): changeTaskActionType => {
    return {
        type: CHANGE_TASK,
        todolistId,
        taskId,
        model
    }
}
export const changeTaskStatusAC = (todolistId: string, task: TaskType, status: number): changeTaskStatusActionType => {
    return {
        type: CHANGE_TASK_STATUS,
        todolistId,
        task,
        status
    }
}

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then(response => {
            dispatch(setTasksAC(todolistId, response.data.items))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then(response => {
            dispatch(addTaskAC(todolistId, response.data.data.item))
        })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(response => {
            if (response.data.resultCode === 0)
                dispatch(removeTaskAC(todolistId, taskId))
        })
}

export const changeTaskTC = (todolistId: string, taskId: string, model: UpdateTaskModelType) => (dispatch: Dispatch) => {
    todolistsAPI.updateTask(todolistId, taskId, model)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeTaskTitleAC(todolistId, taskId, model))
            }
        })
}

const tasksInitialState: TasksType = {}

export const taskReducer = (state = tasksInitialState, action: allActionsType): TasksType => {

    switch (action.type) {
        case ADD_TASK:
            return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]}
        case SET_TASKS:
            return {...state, [action.todolistId]: action.tasks}
        case SET_TODOLISTS:
            return action.todolists.reduce((acc: TasksType, el: TodolistType) => ({...acc, [el.id]: []}), {})
        case REMOVE_TASK:
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        case CHANGE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    ...action.model
                } : el)
            }
        case REMOVE_TODOLIST:
            let stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        case ADD_TODOLIST:
            return {...state, [action.todolistId]: []}
        default:
            return state
    }
}
import {
    ADD_TODOLIST,
    addTodolistActionType,
    REMOVE_TODOLIST,
    removeTodolistActionType,
    SET_TODOLISTS,
    setTodolistActionType, TodolistType
} from "./todolistReducer";
import {Dispatch} from "redux";
import axios from "axios";


const ADD_TASK = 'ADD-TASK'
const SET_TASKS = 'SET-TASKS'
const REMOVE_TASK = 'REMOVE-TASK'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'

export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: number
    startDate: string
    status: number
    title: string
    todolist: string
    todoListId: string
}

export type TasksType = {
    [key: string]: Array<TaskType>
}

type allActionsType = addTaskActionType | removeTaskActionType
    | changeTaskTitleActionType | changeTaskStatusActionType
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
type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    task: TaskType
    title: string
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
export const changeTaskTitleAC = (todolistId: string, task: TaskType, title: string): changeTaskTitleActionType => {
    return {
        type: CHANGE_TASK_TITLE,
        todolistId,
        task,
        title
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

    axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {
        withCredentials: true,
        headers: {
            'API-KEY': 'e2b2d8ed-9e2a-4c10-8057-a81181e19d3c'
        }
    }).then(response => {
        dispatch(setTasksAC(todolistId, response.data.items))
    })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title}, {
        withCredentials: true,
        headers: {
            'API-KEY': 'e2b2d8ed-9e2a-4c10-8057-a81181e19d3c'
        }
    }).then(response => {
        dispatch(addTaskAC(todolistId, response.data.data.item))
    })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
        withCredentials: true,
        headers: {
            'API-KEY': 'e2b2d8ed-9e2a-4c10-8057-a81181e19d3c'
        }
    }).then(response => {
        if (response.data.resultCode === 0)
            dispatch(removeTaskAC(todolistId, taskId))
    })
}

export const changeTaskTitleTC = (todolistId: string, task: TaskType, title: string) => (dispatch: Dispatch) => {
    axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`, {
        ...task, title
    }, {
        withCredentials: true,
        headers: {
            'API-KEY': 'e2b2d8ed-9e2a-4c10-8057-a81181e19d3c'
        }
    }).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(changeTaskTitleAC(todolistId, task, title))
        }
    })
}

export const changeTaskStatusTC = (todolistId: string, task: TaskType, status: number) => (dispatch: Dispatch) => {
    axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`, {
        ...task, status
    }, {
        withCredentials: true,
        headers: {
            'API-KEY': 'e2b2d8ed-9e2a-4c10-8057-a81181e19d3c'
        }
    }).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(changeTaskStatusAC(todolistId, task, status))
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
            return action.todolists.reduce((acc: TasksType, el: TodolistType) => ({...acc, [el.id]:[]}), {})
        case REMOVE_TASK:
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.task.id ? {
                    ...el,
                    title: action.title
                } : el)
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.task.id ? {
                    ...el,
                    status: action.status
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
import {FilterValuesType} from "../App";
import {v1} from "uuid";
import {Dispatch} from "redux";
import axios from 'axios'

export const ADD_TODOLIST = 'ADD-TODOLIST'
export const SET_TODOLISTS = 'SET-TODOLISTS'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_FILTER = 'CHANGE-FILTER'

type allActionsType = addTodolistActionType | changeTodolistTitleActionType
    | changeFilterActionType | removeTodolistActionType | setTodolistActionType

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
    filter: FilterValuesType
}


export type addTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolistId: string
    title: string
}
export type setTodolistActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}
export type removeTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
type changeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    title: string
}
type changeFilterActionType = {
    type: 'CHANGE-FILTER'
    todolistId: string
    value: FilterValuesType
}

export const addTodolistAC = (todolistId: string, title: string): addTodolistActionType => {
    return {
        type: ADD_TODOLIST,
        todolistId,
        title
    }
}
export const removeTodolistAC = (todolistId: string): removeTodolistActionType => {
    return {
        type: REMOVE_TODOLIST,
        todolistId
    }
}
export const changeTodolistTitleAC = (todolistId: string, title: string): changeTodolistTitleActionType => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        todolistId: todolistId,
        title: title
    }
}
export const changeFilterAC = (todolistId: string, value: FilterValuesType): changeFilterActionType => {
    return {
        type: CHANGE_FILTER,
        todolistId: todolistId,
        value: value
    }
}

export const setTodolistsAC = (todolists: Array<TodolistType>): setTodolistActionType => {
    return {
        type: SET_TODOLISTS,
        todolists
    }
}
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {
        withCredentials: true,
        headers: {
            'API-KEY': 'e2b2d8ed-9e2a-4c10-8057-a81181e19d3c'
        }
    }).then(response => {
        dispatch(setTodolistsAC(response.data))
    })
}
export const addTodolistsTC = (title: string) => (dispatch: Dispatch) => {
    axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, {
        withCredentials: true,
        headers: {
            'API-KEY': 'e2b2d8ed-9e2a-4c10-8057-a81181e19d3c'
        }
    }).then(response => {
        dispatch(addTodolistAC(response.data.data.item.id, response.data.data.item.title))
    })
}
export const removeTodolistsTC = (id: string) => (dispatch: Dispatch) => {
    axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
        withCredentials: true,
        headers: {
            'API-KEY': 'e2b2d8ed-9e2a-4c10-8057-a81181e19d3c'
        }
    })
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(removeTodolistAC(id))
            }
        })
}

const todolistsInitialState: Array<TodolistType> = []

export const todolistReducer = (state = todolistsInitialState, action: allActionsType): any => {
    switch (action.type) {
        case SET_TODOLISTS:
            const todolists = action.todolists.map(el => ({...el, filter: 'all'}))
            return [...state, ...todolists]
        case ADD_TODOLIST:
            const newTodolist = {id: action.todolistId, title: action.title, filter: 'all' as FilterValuesType};
            return [newTodolist, ...state]
        case CHANGE_TODOLIST_TITLE:
            return state.map(el => el.id === action.todolistId ? {...el, title: action.title} : el)
        case CHANGE_FILTER:
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.value} : el)
        case REMOVE_TODOLIST:
            return state.filter(el => el.id !== action.todolistId)
        default:
            return state
    }
}
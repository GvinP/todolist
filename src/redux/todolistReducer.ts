import {FilterValuesType} from "../App";
import {Dispatch} from "redux";
import {todolistsAPI, TodolistType} from "../api/todolist-api";

export const ADD_TODOLIST = 'ADD-TODOLIST'
export const SET_TODOLISTS = 'SET-TODOLISTS'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_FILTER = 'CHANGE-FILTER'

type allActionsType = addTodolistActionType | changeTodolistTitleActionType
    | changeFilterActionType | removeTodolistActionType | setTodolistActionType

export type TodolistDomainType = TodolistType & {
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
    todolistsAPI.getTodolists()
        .then(response => {
            dispatch(setTodolistsAC(response.data))
        })
}
export const addTodolistsTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(response => {
            dispatch(addTodolistAC(response.data.data.item.id, response.data.data.item.title))
        })
}
export const removeTodolistsTC = (id: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(id)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(removeTodolistAC(id))
            }
        })
}

const todolistsInitialState: Array<TodolistDomainType> = []

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
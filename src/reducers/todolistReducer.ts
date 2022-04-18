import {FilterValuesType, TodolistType} from "../App";
import {todolistId1, todolistId2} from "./taskReducer";

export const ADD_TODOLIST = 'ADD-TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_FILTER = 'CHANGE-FILTER'

type allActionsType = addTodolistActionType | changeTodolistTitleActionType
    | changeFilterActionType | removeTodolistActionType

// type addTodolistActionType = ReturnType<typeof addTodolistAC>
// type changeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
// type changeFilterActionType = ReturnType<typeof changeFilterAC>

export type addTodolistActionType = {
    type: 'ADD-TODOLIST'
    newTodolistId: string
    title: string
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
export const addTodolistAC = (newTodolistId: string, title: string):addTodolistActionType => {
    return {
        type: ADD_TODOLIST,
        newTodolistId: newTodolistId,
        title: title
    }
}
export const removeTodolistAC = (todolistId: string):removeTodolistActionType => {
    return {
        type: REMOVE_TODOLIST,
        todolistId
    }
}
export const changeTodolistTitleAC = (todolistId: string, title: string):changeTodolistTitleActionType => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        todolistId: todolistId,
        title: title
    }
}
export const changeFilterAC = (todolistId: string, value: FilterValuesType):changeFilterActionType => {
    return {
        type: CHANGE_FILTER,
        todolistId: todolistId,
        value: value
    }
}
const todolistsInitialState: Array<TodolistType> = [
    {id: todolistId1, title: "What to learn", filter: 'all'},
    {id: todolistId2, title: "What to buy", filter: 'all'}
]

export const todolistReducer = (state= todolistsInitialState, action: allActionsType): Array<TodolistType> => {
    switch (action.type) {
        case ADD_TODOLIST:
            const newTodolist= {id: action.newTodolistId, title: action.title, filter: 'all' as FilterValuesType};
            return [newTodolist, ...state]
        case CHANGE_TODOLIST_TITLE:
            return state.map(el => el.id === action.todolistId ? {...el, title: action.title} : el)
        case CHANGE_FILTER:
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.value} : el)
        case REMOVE_TODOLIST:
            return state.filter(el=> el.id !== action.todolistId)
        default:
            return state
    }
}
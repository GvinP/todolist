import {FilterValuesType, TodolistType} from "../App";

const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_FILTER = 'CHANGE-FILTER'

type allActionsType = addTodolistActionType | changeTodolistTitleActionType | changeFilterActionType

// type addTodolistActionType = ReturnType<typeof addTodolistAC>
// type changeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
// type changeFilterActionType = ReturnType<typeof changeFilterAC>

type addTodolistActionType = {
    type: 'ADD-TODOLIST'
    newTodolistID: string
    title: string
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
export const addTodolistAC = (newTodolistID: string, title: string):addTodolistActionType => {
    return {
        type: ADD_TODOLIST,
        newTodolistID: newTodolistID,
        title: title
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

export const todolistReducer = (state: Array<TodolistType>, action: allActionsType): Array<TodolistType> => {
    switch (action.type) {
        case ADD_TODOLIST:
            const newTodolist= {id: action.newTodolistID, title: action.title, filter: 'all' as FilterValuesType};
            return [newTodolist, ...state]
        case CHANGE_TODOLIST_TITLE:
            return state.map(el => el.id === action.todolistId ? {...el, title: action.title} : el)
        case CHANGE_FILTER:
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.value} : el)


        default:
            throw new Error('I don\'t understand this action type')
    }
}
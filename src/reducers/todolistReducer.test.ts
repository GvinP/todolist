import {v1} from "uuid";
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, todolistReducer} from "./todolistReducer";
import {TodolistType} from "../App";


test('todolist reducer should add new todolist', ()=>{
    const todolistId1 = v1()
    const todolistId2 = v1()
    const todolistId3 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ]
    const endState = todolistReducer(startState, addTodolistAC(todolistId3,'What to write'))
    expect(endState[0].title).toBe('What to write')
})

test('todolist reducer should change todolist title', ()=>{
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ]
    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, 'What to write'))
    expect(endState[1].title).toBe('What to write')
})

test('todolist reducer should change todolist filter', ()=>{
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ]
    const endState = todolistReducer(startState, changeFilterAC(todolistId1, 'active'))
    expect(endState[0].filter).toBe('active')
})
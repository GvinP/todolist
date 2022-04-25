import {v1} from "uuid";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolistReducer";
import {TodolistType} from "../App";
import {taskReducer} from "./taskReducer";


test('todolist reducer should add new todolist', ()=>{
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startTodolistState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ]
    const startTaskState = {
        [todolistId1]: [
            {id: "taskId1", title: "HTML&CSS", isDone: true},
            {id: "taskId2", title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true}
        ]
    }
    const endTodolistState = todolistReducer(startTodolistState, addTodolistAC('What to write'))
    const endTaskState = taskReducer(startTaskState, addTodolistAC('What to write'))
    let key = Object.keys(endTaskState)

    expect(endTodolistState[0].title).toBe('What to write')
    expect(endTodolistState.length).toBe(3)
    expect(key.length).toBe(3)
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
test('todolist reducer should delete todolist', ()=>{
    const startTodolistState: Array<TodolistType> = [
        {id: "todolistId1", title: "What to learn", filter: 'all'},
        {id: "todolistId2", title: "What to buy", filter: 'all'}
    ]
    const startTaskState = {
        "todolistId1": [
            {id: "taskId1", title: "HTML&CSS", isDone: true},
            {id: "taskId2", title: "JS", isDone: true}
        ],
        "todolistId2": [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true}
        ]
    }

    const endTodolistState = todolistReducer(startTodolistState, removeTodolistAC("todolistId1"))
    const endTaskState = taskReducer(startTaskState, removeTodolistAC("todolistId1"))
    let key = Object.keys(endTaskState)

    expect(endTodolistState[0].id).not.toBe("todolistId1")
    expect(endTodolistState.length).toBe(1)
    expect(key.length).toBe(1)
    expect(endTaskState["todolistId1"]).toBeUndefined()
})
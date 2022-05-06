import {v1} from "uuid";

const todolistId1 = v1()
    const todolistId2 = v1()

// import {v1} from "uuid";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./taskReducer";
//
//
// test('task reducer should add new task', ()=>{
//     const todolistId1 = v1()
//     const todolistId2 = v1()
//
//     const startState = {
//         [todolistId1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true}
//         ],
//         [todolistId2]: [
//             {id: v1(), title: "HTML&CSS2", isDone: true},
//             {id: v1(), title: "JS2", isDone: true}
//         ]
//     }
//     const endState = taskReducer(startState, addTaskAC(todolistId1,'React'))
//     expect(endState[todolistId1][0].title).toBe('React')
// })
// test('task reducer should remove task', ()=>{
//     const todolistId1 = v1()
//     const todolistId2 = v1()
//     const taskId1 = v1()
//     const taskId2 = v1()
//
//     const startState = {
//         [todolistId1]: [
//             {id: taskId1, title: "HTML&CSS", isDone: true},
//             {id: taskId2, title: "JS", isDone: true}
//         ],
//         [todolistId2]: [
//             {id: v1(), title: "HTML&CSS2", isDone: true},
//             {id: v1(), title: "JS2", isDone: true}
//         ]
//     }
//     const endState = taskReducer(startState, removeTaskAC(todolistId1,taskId2))
//     expect(endState[todolistId1].length).toBe(1)
//     expect(endState[todolistId1][0].id).toBe(taskId1)
// })
// test('task reducer should change task title', ()=>{
//     const todolistId1 = v1()
//     const todolistId2 = v1()
//     const taskId1 = v1()
//     const taskId2 = v1()
//
//     const startState = {
//         [todolistId1]: [
//             {id: taskId1, title: "HTML&CSS", isDone: true},
//             {id: taskId2, title: "JS", isDone: true}
//         ],
//         [todolistId2]: [
//             {id: v1(), title: "HTML&CSS2", isDone: true},
//             {id: v1(), title: "JS2", isDone: true}
//         ]
//     }
//     const endState = taskReducer(startState, changeTaskTitleAC(todolistId1,taskId1,'React'))
//     expect(endState[todolistId1][0].title).toBe('React')
// })
// test('task reducer should change task status', ()=>{
//     const todolistId1 = v1()
//     const todolistId2 = v1()
//     const taskId1 = v1()
//     const taskId2 = v1()
//
//     const startState = {
//         [todolistId1]: [
//             {id: taskId1, title: "HTML&CSS", isDone: true},
//             {id: taskId2, title: "JS", isDone: true}
//         ],
//         [todolistId2]: [
//             {id: v1(), title: "HTML&CSS2", isDone: true},
//             {id: v1(), title: "JS2", isDone: true}
//         ]
//     }
//     const endState = taskReducer(startState, changeTaskStatusAC(todolistId1,taskId2,false))
//     expect(endState[todolistId1][1].isDone).toBe(false)
// })
import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

 type TasksType = {
     [key: string]: Array<TaskType>
 }

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })

    function removeTask(todolistId: string, id: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})
    }
    function addTask(todolistId: string, title: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    function addTodolist(title: string) {
        const newTodolist: TodolistType = {id: v1(), title: title, filter: 'all'};
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }
    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)
        });
    }
    function changeTaskTitle(todolistId: string, taskId: string, title: string) {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: title} : el)
        });
    }
    function changeTodolistTitle(todolistId: string, title: string) {
        setTodolists(todolists.map(el=> el.id === todolistId? {...el, title: title}: el))
    }
    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }
    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        const copyTasks = {...tasks}
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }
                return <Todolist
                    key={el.id}
                    todolistId={el.id}
                    title={el.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                    filter={el.filter}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}

export default App;

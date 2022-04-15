import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, IconButton, Paper, Toolbar, Typography, Button, Grid, GridList} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./reducers/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./reducers/taskReducer";

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

export type TasksType = {
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
        setTasks(taskReducer(tasks, removeTaskAC(todolistId, id)))
    }

    function addTask(todolistId: string, title: string) {
        setTasks(taskReducer(tasks, addTaskAC(todolistId, title)))
    }

    function addTodolist(title: string) {
        const newTodolistID = v1()
        setTodolists(todolistReducer(todolists, addTodolistAC(newTodolistID, title)))
        setTasks(taskReducer(tasks, addTodolistAC(newTodolistID, title)))
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks(taskReducer(tasks, changeTaskStatusAC(todolistId, taskId, isDone)));
    }

    function changeTaskTitle(todolistId: string, taskId: string, title: string) {
        setTasks(taskReducer(tasks, changeTaskTitleAC(todolistId, taskId, title)));
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        setTodolists(todolistReducer(todolists, changeTodolistTitleAC(todolistId, title)))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolistReducer(todolists, changeFilterAC(todolistId, value)))
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolistReducer(todolists, removeTodolistAC(todolistId)))
        setTasks(taskReducer(tasks, removeTodolistAC(todolistId)))
    }

    let mappedTodolists = todolists.map(el => {
        let tasksForTodolist = tasks[el.id];

        if (el.filter === "active") {
            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
        }
        if (el.filter === "completed") {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
        }
        return <Grid item xs={2} justifyContent={"space-between"}>
            <Paper elevation={8} style={{textAlign: "center"}}>
                <Todolist
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
            </Paper>
        </Grid>
    })
    return (
        <>
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        <AddItemForm addItem={addTodolist}/>
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Grid container spacing={3}>
                {mappedTodolists}
            </Grid>

        </>
    );
}

export default App;

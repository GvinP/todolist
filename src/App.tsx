import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./reducers/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/taskReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store";

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

    const dispatch = useDispatch()
    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)
    const todolists = useSelector<AppStateType, Array<TodolistType>>(state => state.todolists)


    function removeTask(todolistId: string, id: string) {
        dispatch(removeTaskAC(todolistId, id))
    }

    function addTask(todolistId: string, title: string) {
        dispatch(addTaskAC(todolistId, title))
    }

    function addTodolist(title: string) {
        const newTodolistID = v1()
        const action = addTodolistAC(newTodolistID, title)
        dispatch(action)
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    function changeTaskTitle(todolistId: string, taskId: string, title: string) {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatch(changeFilterAC(todolistId, value))
    }

    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    let mappedTodolists = todolists.map(el => {
        let tasksForTodolist = tasks[el.id];

        if (el.filter === "active") {
            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
        }
        if (el.filter === "completed") {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
        }
        return <Grid item xs={2}>
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
            <Grid container spacing={3} style={{marginTop: "20px"}}>
                {mappedTodolists}
            </Grid>

        </>
    );
}

export default App;

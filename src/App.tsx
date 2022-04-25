import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
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
    console.log('App')
    const dispatch = useDispatch()
    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)
    const todolists = useSelector<AppStateType, Array<TodolistType>>(state => state.todolists)


    const removeTask = useCallback((todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const changeStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    let mappedTodolists = todolists.map(el => {
        return <Grid item xs={3}>
            <Paper elevation={8} style={{minWidth: "230px", textAlign: "center"}}>
                <Todolist
                    key={el.id}
                    todolistId={el.id}
                    title={el.title}
                    tasks={tasks[el.id]}
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
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit" variant={"outlined"} style={{marginLeft: '15px'}}>Login</Button>
                </Toolbar>
            </AppBar>
            <AddItemForm addItem={addTodolist}/>
            <Grid container spacing={3} style={{marginTop: "20px"}}>
                {mappedTodolists}
            </Grid>

        </>
    );
}

export default App;

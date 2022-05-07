import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistsTC,
    changeFilterAC,
    changeTodolistTitleAC,
    getTodolistsTC,
    removeTodolistsTC,
    TodolistType
} from "./redux/todolistReducer";
import {addTaskTC, changeTaskStatusTC, changeTaskTitleTC, removeTaskTC, TasksType, TaskType} from "./redux/taskReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType, TypedDispatch} from "./redux/store";

export type FilterValuesType = "all" | "active" | "completed";


function App() {
    // console.log('App')
    const dispatch = useDispatch<TypedDispatch>()
    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)
    const todolists = useSelector<AppStateType, Array<TodolistType>>(state => state.todolists)

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, id: string) => {
        dispatch(removeTaskTC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistsTC(title))
    }, [dispatch])

    const changeStatus = useCallback((todolistId: string, task: TaskType, status: number) => {
        dispatch(changeTaskStatusTC(todolistId, task, status))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, task: TaskType, title: string) => {
        dispatch(changeTaskTitleTC(todolistId, task, title))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistsTC(todolistId))
    }, [dispatch])

    let mappedTodolists = todolists.map(el => {
        return <Grid item key={el.id}>
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
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button color="inherit" variant={"outlined"} style={{marginLeft: '15px'}}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>   {/* fixed - фиксированная ширина*/}
                <Grid container style={{padding: "20px 0"}}>   {/* это 1 ряд*/}
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>   {/* это 2 ряд*/}
                    {mappedTodolists}
                </Grid>
            </Container>
        </>
    );
}

export default App;

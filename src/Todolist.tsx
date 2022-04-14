import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    filter: FilterValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(props.todolistId, title.trim());
    }
    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed")
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={() => props.removeTodolist(props.todolistId)} size={"small"}>
                <DeleteOutline/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }
                    const onChangeTaskTitleHandler = (title: string) => {
                        props.changeTaskTitle(props.todolistId, t.id, title);
                    }

                    return <ListItem key={t.id} style={{padding: '0', justifyContent: 'space-between'}}>
                        <Checkbox size={"small"}
                                  color={"primary"}
                                  onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTaskTitleHandler}
                                      className={t.isDone ? "is-done" : ""}/>
                        <IconButton onClick={onClickHandler} size={"small"}>
                            <DeleteOutline/>
                        </IconButton>
                    </ListItem>
                })
            }
        </List>
        <ButtonGroup size={"small"} variant={"contained"}>
            <Button
                color={props.filter === 'all' ? "secondary" : "primary"}
                className={props.filter === 'all' ? "active-filter" : ""}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                color={props.filter === 'active' ? "secondary" : "primary"}
                className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                color={props.filter === 'completed' ? "secondary" : "primary"}
                className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </ButtonGroup>
    </div>
}


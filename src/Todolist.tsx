import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, IconButton, List} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {Task} from "./Task";


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

export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist')

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistId, title.trim());
    }, [props.addTask, props.todolistId])
    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolistId, "all"), [props.changeFilter, props.todolistId])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolistId, "active"), [props.changeFilter, props.todolistId])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistId, "completed"), [props.changeFilter, props.todolistId])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }, [props.changeTodolistTitle, props.todolistId])

    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    return <div style={{minHeight: "350px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={() => props.removeTodolist(props.todolistId)} size={"small"}>
                    <DeleteOutline/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {
                    tasksForTodolist.map(t => {
                        return <Task task={t}
                                     removeTask={props.removeTask}
                                     changeTaskTitle={props.changeTaskTitle}
                                     todolistId={props.todolistId}
                                     changeTaskStatus={props.changeTaskStatus}
                                     key={t.id}/>
                    })
                }
            </List>
        </div>
        <ButtonGroup size={"small"} variant={"contained"} style={{margin: "0 auto 15px"}}>
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
})


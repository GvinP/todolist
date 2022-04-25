import {TaskType} from "./App";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {DeleteOutline} from "@material-ui/icons";

type TaskPropsType = {
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    todolistId: string
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task')
    const onClickHandler = useCallback( () => props.removeTask(props.todolistId, props.task.id),[props.removeTask, props.todolistId, props.task.id])
    const onChangeHandler = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked);
    },[props.changeTaskStatus, props.todolistId, props.task.id])
    const onChangeTaskTitleHandler = useCallback( (title: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, title);
    },[props.changeTaskTitle, props.todolistId])

    return <ListItem key={props.task.id} style={{padding: '0', justifyContent: 'space-between'}}>
        <Checkbox size={"small"}
                  color={"primary"}
                  onChange={onChangeHandler} checked={props.task.isDone}/>
        <EditableSpan title={props.task.title} onChange={onChangeTaskTitleHandler}
                      className={props.task.isDone ? "is-done" : ""}/>
        <IconButton onClick={onClickHandler} size={"small"}>
            <DeleteOutline/>
        </IconButton>
    </ListItem>
})
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {DeleteOutline} from "@material-ui/icons";
import {TaskType, UpdateTaskModelType} from "./api/todolist-api";

type TaskPropsType = {
    changeTaskStatus: (todolistId: string, task: TaskType, status: number) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    todolistId: string
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {
    // console.log('Task')
    const onClickHandler = useCallback(() =>
            props.removeTask(props.todolistId, props.task.id)
        , [props])
    // props.removeTask, props.todolistId, props.task.id
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            props.changeTaskStatus(props.todolistId, props.task, 1)
        } else {
            props.changeTaskStatus(props.todolistId, props.task, 0)
        }

    }, [props])
    // props.changeTaskStatus, props.todolistId, props.task.id
    const onChangeTaskTitleHandler = useCallback((title: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, title);
    }, [props])
    // props.changeTaskTitle, props.todolistId

    return <ListItem key={props.task.id} style={{padding: '0', justifyContent: 'space-between'}}>
        <Checkbox size={"small"}
                  color={"primary"}
                  onChange={onChangeHandler} checked={props.task.status === 1}/>
        <EditableSpan title={props.task.title} onChange={onChangeTaskTitleHandler}
                      className={props.task.status === 1 ? "is-done" : ""}/>
        <IconButton onClick={onClickHandler} size={"small"}>
            <DeleteOutline/>
        </IconButton>
    </ListItem>
})
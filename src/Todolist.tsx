import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {FullInput} from "./FullInput";
import {Input} from "./Input";
import {Button} from "./Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const addTaskHandler = (title: string) => {
        props.addTask(title);
        setTitle("");
    }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    //
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') {
    //         addTask(title);
    //     }
    // };
    // const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    //         addTask(title);
    // };

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return <div>
        <h3>{props.title}</h3>
        {/*<FullInput callBack={props.addTask}/>*/}

        <div>
            {/*<input value={title}*/}
            {/*       onChange={ onChangeHandler }*/}
            {/*       onKeyPress={ onKeyPressHandler }*/}
            {/*/>*/}
            <Input title={title} setTitle={setTitle}/>
            <Button name={'+'} callBack={addTaskHandler} title={title}/>
            {/*<button onClick={onClickHandler}>+</button>*/}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}

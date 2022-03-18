import React, {KeyboardEvent} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    newTitle: string
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
    onKeyPressHandler: (event: KeyboardEvent<HTMLInputElement>)=> void
    addTaskHandler: ()=> void
    setNewTitle: (newTitle: string)=> void
}

export function Todolist(props: PropsType) {
    // let [newTitle, setNewTitle] = useState('')
    //
    // const addTaskHandler = () => {
    //     props.addTask(newTitle)
    //     setNewTitle('')
    // }
    //
    // const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key==='Enter') {
    //         addTaskHandler()
    //     }
    // }
    const removeTaskHandler = (el: string) => {
        props.removeTask(el)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={props.newTitle}
                   onKeyPress={props.onKeyPressHandler}
                   onChange={(event) => props.setNewTitle(event.currentTarget.value)}/>
            <button onClick={() => props.addTaskHandler()}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        removeTaskHandler(t.id)
                    }}>x
                    </button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => {
                props.changeFilter("all")
            }}>
                All
            </button>
            <button onClick={() => {
                props.changeFilter("active")
            }}>
                Active
            </button>
            <button onClick={() => {
                props.changeFilter("completed")
            }}>
                Completed
            </button>
        </div>
    </div>
}

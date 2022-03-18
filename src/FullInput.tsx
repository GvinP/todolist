import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';

type PropsType = {
    callBack: (title: string) => void
}

export const FullInput = (props: PropsType) => {
    let [title, setTitle] = useState("")
    // const addTask = (title: string) => {
    //     props.addTask(title);
    //     setTitle("");
    // }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callBack(title);
        }
    }
    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        props.callBack(title)
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>+</button>
        </div>
    )
}
import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string)=> void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState('')
    const onClickEditModeHandler = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const onClickViewModeHandler = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return editMode ?
        <input value={title} onBlur={onClickViewModeHandler}
               onChange={onChangeHandler} autoFocus/>
        : <span onDoubleClick={onClickEditModeHandler}>{props.title}</span>
}
import React, {ChangeEvent, KeyboardEvent} from 'react';

type PropsType = {
    setTitle: (title: string) => void
    title: string
}

export const Input = (props: PropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // addTask(title);
        }
    };
    return (
        <>
            <input value={props.title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
        </>
    );
};

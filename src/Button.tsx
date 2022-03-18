import React, {MouseEvent} from 'react';

type PropsType = {
    name: string
    callBack: (title: string)=>void
    title: string
}

export const Button = (props: PropsType) => {
    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        props.callBack(props.title);
    };
    return (
        <>
            <button onClick={onClickHandler}>+</button>
        </>
    );
};

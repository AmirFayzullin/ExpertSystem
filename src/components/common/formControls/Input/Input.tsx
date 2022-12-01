import React, {useState} from 'react';
import s from './Input.module.css';

const genID = () => (Math.random() * Math.pow(10, 10)).toFixed(0);

type InputProps = {
    name: string,
    value: string,
    props: any
}

const Input = ({name, value, props}: InputProps) => {
    const [focused, setFocus] = useState(false);
    const inputRef = React.createRef<HTMLInputElement>();
    const inputId = genID();

    return (
        <label className={`${s.wrapper} 
                           ${value.length ? s.filled : ""} 
                           ${focused ? s.focused : ''}`}
               htmlFor={inputId}
        >
            <input className={s.inputEl}
                   id={inputId}
                   ref={inputRef}
                   onFocus={() => setFocus(true)}
                   onBlur={() => {
                       setFocus(false);
                       // @ts-ignore
                       document.querySelector('*').scrollTop = 0;
                   }}
                   {...props}
            />
            <p className={s.placeholder}>{name}</p>
        </label>
    )
};

export default Input;
import React from 'react';
import cn from 'classnames';
import s from './Form.module.css';

// @ts-ignore
export const Form = ({handleSubmit, children, buttonText, isValid}) => {
    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <div>
                {children}
            </div>
            <button type={"submit"}
                    disabled={!isValid}
                    className={cn(s.submit, {
                        [s.disabled]: !isValid
                    })}
            >
                {buttonText}
            </button>
        </form>
    )
};
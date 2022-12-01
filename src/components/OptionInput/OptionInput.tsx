import React, {ChangeEvent} from 'react';
import s from './OptionInput.module.css';
import Input from "../common/formControls/Input/Input";

type OptionInputProps = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleRemove: () => void,
    value: string,
    deletable: boolean
}

export const OptionInput = ({handleChange, handleRemove, value, deletable}: OptionInputProps) => {
    return (
        <div className={s.wrapper}>
            <Input name={"Option"}
                   value={value}
                   props={{
                       onChange: handleChange
                   }}
            />
            {
                deletable &&
                <div onClick={handleRemove}
                     className={s.removeButton}
                >
                </div>
            }
        </div>
    )
};
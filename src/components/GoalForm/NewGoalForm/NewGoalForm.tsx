import React, {ChangeEvent, useState} from 'react';
import {Form} from "../../common/formControls/Form/Form";
import Input from "../../common/formControls/Input/Input";
import s from "./NewGoalForm.module.css";

// @ts-ignore
export const NewGoalForm = ({submitCb}) => {
    const [goalTitle, setGoalTitle] = useState<string>("");

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        submitCb(goalTitle);
        reset();
    };

    const reset = () => {
        setGoalTitle("");
    };


    return (
        <Form handleSubmit={handleSubmit} buttonText={"Add"} isValid={true}>
            <div className={s.inputWrapper}>
                <Input name={"Goal"}
                       value={goalTitle}
                       props={{
                           onChange: (e: ChangeEvent<HTMLInputElement>) => setGoalTitle(e.target.value)
                       }}
                />
            </div>
        </Form>
    )
};
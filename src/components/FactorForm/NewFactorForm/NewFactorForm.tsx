import React, {ChangeEvent, useState} from 'react';
import {Form} from "../../common/formControls/Form/Form";
import {OptionInput} from "../../OptionInput/OptionInput";
import s from './NewFactorForm.module.css';
import Input from "../../common/formControls/Input/Input";
import {genId} from "../../../ExpertSystemCore/utils";

type OptionTitle = {
    title: string,
    id: number
}
// @ts-ignore
export const NewFactorForm = ({submitCb}) => {
    const [factorTitle, setFactorTitle] = useState<string>("");
    const [optionsTitles, setOptionsTitles] = useState<OptionTitle[]>([{title: "", id: genId()}]);

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        const titles = optionsTitles.map(t => t.title);
        submitCb(factorTitle, titles);
        setOptionsTitles([{title: "", id: genId()}]);
        setFactorTitle("");
    };

    const handleAddOption = () => {
        setOptionsTitles(titles => [...titles, {title: "", id: genId()}]);
    };

    const handleRemoveOption = (id: number) => {
        // removes option by particular index
        setOptionsTitles(titles => titles.filter(v => id !== v.id))
    };

    const handleChangeOption = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        // updates particular title
        setOptionsTitles(titles => titles.map(title => {
            return id === title.id ?
                {
                    ...title,
                    title: e.target.value,
                }
                :
                title
        }));
    };

    const optionInputs = optionsTitles.map((title) => {
        return (
            <OptionInput value={title.title}
                         key={title.id}
                         handleChange={(e) => handleChangeOption(e, title.id)}
                         handleRemove={() => handleRemoveOption(title.id)}
                         deletable={optionsTitles.length > 1}
            />
        )
    });

    return (
        <Form handleSubmit={handleSubmit} buttonText={"Add"} isValid={true}>
            <div className={s.inputWrapper}>
                <Input name={"Factor"}
                       value={factorTitle}
                       props={{
                           onChange: (e: ChangeEvent<HTMLInputElement>) => setFactorTitle(e.target.value)
                       }}
                />
            </div>
            <div className={s.options}>
                {optionInputs}
                <div onClick={handleAddOption}
                     className={s.add}
                >

                </div>
            </div>
        </Form>
    )
};
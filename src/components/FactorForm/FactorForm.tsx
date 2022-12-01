import React from 'react';
import {CFactorNode} from "../../ExpertSystemCore/Node";
import {NewFactorForm} from "./NewFactorForm/NewFactorForm";
import s from './FactorForm.module.css';

type FactorFormProps = {
    existingFactors: CFactorNode[],
    handleNewFactorSubmit: (title: string, options: string[]) => void
    handleCloneFactorSubmit: (id: number) => void,
    isOpened: boolean
}

const FactorForm = ({existingFactors, handleNewFactorSubmit, handleCloneFactorSubmit, isOpened}: FactorFormProps) => {

    const ef = existingFactors.map((fact:CFactorNode) => {
        return (
            <div onClick={() => handleCloneFactorSubmit(fact.id)}
                 key={fact.id}
                 className={s.factor}
            >
                <p>{fact.title.title}</p>
            </div>
        )
    });

    if (!isOpened) return <></>;
    return (
        <div className={s.wrapper}>
            <NewFactorForm submitCb={handleNewFactorSubmit}/>
            <div className={s.existingFactors}>
                {ef}
            </div>
        </div>
    )
};

export default FactorForm
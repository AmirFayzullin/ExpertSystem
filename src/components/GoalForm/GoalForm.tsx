import React from 'react';
import {CGoalNode} from "../../ExpertSystemCore/Node";
import {NewGoalForm} from "./NewGoalForm/NewGoalForm";
import s from './GoalForm.module.css';

type GoalFormProps = {
    existingGoals: CGoalNode[],
    handleNewGoalSubmit: (title: string, options: string[]) => void
    handleCloneGoalSubmit: (id: number) => void,
    isOpened: boolean
}

const GoalForm = ({existingGoals, handleNewGoalSubmit, handleCloneGoalSubmit, isOpened}: GoalFormProps) => {

    const eg = existingGoals.map((goal:CGoalNode) => {
        return (
            <div onClick={() => handleCloneGoalSubmit(goal.id)}
                 key={goal.id}
                 className={s.goal}
            >
                <p>{goal.title.title}</p>
            </div>
        )
    });

    if (!isOpened) return <></>;
    return (
        <div className={s.wrapper}>
            <NewGoalForm submitCb={handleNewGoalSubmit}/>
            <div className={s.existingGoals}>
                {eg}
            </div>
        </div>
    )
};

export default GoalForm
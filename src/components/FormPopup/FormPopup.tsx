import React, {useContext, useState} from 'react';
import FactorForm from "../FactorForm/FactorForm";
import GoalForm from "../GoalForm/GoalForm";
import {ESCoreContext} from "../../contexts/ESCoreContext";
import s from './FormPopup.module.css';
import cn from 'classnames';
import {Popup} from "../Popup/Popup";
import {CFactorNode, INode} from "../../ExpertSystemCore/Node";

enum POPUP_PAGES {
    FACTOR = "Factor",
    GOAL = "Goal"
}

type FormPopupProps = {
    isOpened: boolean,
    optionId: number | null,
    close: () => void
}

export const FormPopup = ({isOpened, optionId, close}: FormPopupProps) => {
    const core = useContext(ESCoreContext);
    const [openedPage, setOpenedPage] = useState<POPUP_PAGES>(POPUP_PAGES.FACTOR);

    const handleCloneNode = (id: number) => {
        if (!core) return;
        const node = core.cloneNode(id);

        insert(node);
    };

    const handleAddFactor = (title: string, options: string[]) => {
        if (!core) return;

        const fact = core.addFactor(title, options);

        if (!fact) return;

        insert(fact);
    };

    const handleAddGoal = (title: string) => {
        if (!core) return;

        const goal = core.addGoal(title);

        insert(goal)
    };

    const insert = (node: INode | null) => {
        if (!core || !node) return;

        if (optionId) core.insertNode(node, optionId);

        close();
    };

    return (

        <Popup isOpened={isOpened} close={close}>
            <div className={cn(s.wrapper, {[s.opened]: isOpened})}>
                <div className={s.buttons}>
                    <div className={cn(s.button, {[s.active]: openedPage == POPUP_PAGES.FACTOR})}
                         onClick={() => setOpenedPage(POPUP_PAGES.FACTOR)}
                    >
                        {POPUP_PAGES.FACTOR}
                    </div>
                    {
                        core?.isInitialized &&
                        <div className={cn(s.button, {[s.active]: openedPage == POPUP_PAGES.GOAL})}
                             onClick={() => setOpenedPage(POPUP_PAGES.GOAL)}
                        >
                            {POPUP_PAGES.GOAL}
                        </div>
                    }

                </div>
                <div className={s.form}>
                    <FactorForm handleCloneFactorSubmit={handleCloneNode}
                                handleNewFactorSubmit={handleAddFactor}
                                existingFactors={core?.factors || []}
                                isOpened={openedPage == POPUP_PAGES.FACTOR}
                    />

                    {
                        core?.isInitialized &&
                        <GoalForm existingGoals={core?.goals || []}
                                  handleNewGoalSubmit={handleAddGoal}
                                  handleCloneGoalSubmit={handleCloneNode}
                                  isOpened={openedPage == POPUP_PAGES.GOAL}
                        />
                    }
                </div>
            </div>
        </Popup>
    )
};
import React, {useContext} from 'react';
import s from './Header.module.css';
import {ESCoreContext} from "../../contexts/ESCoreContext";
import cn from 'classnames';
import {ConfirmationPopupServiceContext} from "../../contexts/ConfirmationPopupServiceContext";

type HeaderProps = {
    execute: () => void,
    reset: () => void,
    save: () => void
}

export const Header = ({execute, reset, save}: HeaderProps) => {

    const confirmationService = useContext(ConfirmationPopupServiceContext);

    const core = useContext(ESCoreContext);
    const isCoreInitialized = core?.isInitialized;

    const handleReset = () => {
        if (!confirmationService) return;
        confirmationService.open({
            text: "Do you really want to reset the tree?",
            handleSubmit: () => {
                reset()
            }
        })
    };

    return (
        <header className={s.wrapper}>
            <button className={cn(s.button, s.reset,  {
                [s.active]: isCoreInitialized
            })}
                    onClick={handleReset}
                    disabled={!isCoreInitialized}
            >

            </button>

            <button className={cn(s.button, s.run, {
                [s.active]: isCoreInitialized
            })}
                    onClick={() => execute()}
                    disabled={!isCoreInitialized}
            >

            </button>

            <button className={cn(s.button, s.save, {
                [s.active]: isCoreInitialized
            })}
                    onClick={() => save()}
                    disabled={!isCoreInitialized}
            >

            </button>
        </header>
    )
};

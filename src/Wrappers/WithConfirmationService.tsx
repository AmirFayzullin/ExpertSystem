import React, {ReactElement, ReactFragment, ReactPortal, useState} from 'react';
import {ConfirmationPopupServiceContext} from '../contexts/ConfirmationPopupServiceContext';

export type ConfirmationPopupState = {
    text: string,
    handleSubmit: () => void,
}

type WithConfirmationPopupProps = {
    children: ReactElement | ReactFragment | ReactPortal | boolean | null | undefined,
}

export const WithConfirmationService = ({children}: WithConfirmationPopupProps) => {

    const [confirmationPopupState, setConfirmationPopupState] = useState<ConfirmationPopupState>({
        text: "",
        handleSubmit: () => {},
    });

    const [isOpened, setIsOpened] = useState(false);

    const handleOpen = (state:ConfirmationPopupState) => {
        setConfirmationPopupState(state);
        setIsOpened(true);
    };

    const handleClose = () => {
        setIsOpened(false);
    }

    return (
        <ConfirmationPopupServiceContext.Provider value={{
            open: handleOpen,
            state: confirmationPopupState,
            isOpened,
            close: handleClose
        }}>
            {children}
        </ConfirmationPopupServiceContext.Provider>
    )
};
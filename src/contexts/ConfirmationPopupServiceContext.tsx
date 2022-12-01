import * as React from "react";
import {ConfirmationPopupState} from "../Wrappers/WithConfirmationService";

export type ConfirmationPopupServiceT = {
    open: ({text, handleSubmit}:ConfirmationPopupState) => void,
    state: ConfirmationPopupState,
    isOpened: boolean,
    close: () => void
}

export const ConfirmationPopupServiceContext = React.createContext<ConfirmationPopupServiceT|null>(null);
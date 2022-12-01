import React, {ReactElement, ReactFragment, ReactPortal, useEffect} from 'react';
import cn from 'classnames';
import s from './Popup.module.css';

type PopupProps = {
    isOpened: boolean,
    close: () => void,
    children: ReactElement | ReactFragment | ReactPortal | boolean | null | undefined
}

export const Popup = ({isOpened, close, children}:PopupProps) => {

    const handleOverlayClick = (e: any) => {
        if (e.target === e.currentTarget) close();
    };

    useEffect(() => {
        if (isOpened) {
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === "Escape") close();
            };

            document.addEventListener("keyup", handleEsc);

            return () => document.removeEventListener("keyup", handleEsc);
        }
    }, [isOpened]);

    return (
        <div className={cn(s.overlay, {[s.opened]: isOpened})}
             onClick={handleOverlayClick}
        >
            {children}
        </div>
    )
};
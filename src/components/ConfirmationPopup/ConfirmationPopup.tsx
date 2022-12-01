import React, {useContext} from 'react';
import {Popup} from "../Popup/Popup";
import {Form} from "../common/formControls/Form/Form";
import cn from 'classnames';
import s from './ConfirmationPopup.module.css';
import {ConfirmationPopupServiceContext} from "../../contexts/ConfirmationPopupServiceContext";



export const ConfirmationPopup = () => {

    const service = useContext(ConfirmationPopupServiceContext);

    if (!service) return null;

    const handle = (e: SubmitEvent) => {
        e.preventDefault();
        service.state.handleSubmit();
        service.close();
    };

    return (
        <Popup isOpened={service.isOpened} close={service.close}>
            <div className={cn(s.wrapper, {[s.opened]: service.isOpened})}>
                <Form isValid={true}
                      buttonText={"Yes"}
                      handleSubmit={handle}
                >
                    <div className={s.message}>
                        {service.state.text}
                    </div>
                </Form>
            </div>
        </Popup>
    )
};
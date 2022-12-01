import React, {ChangeEvent, useContext, useState} from 'react';
import {ESCoreContext} from "../../contexts/ESCoreContext";
import {Popup} from "../Popup/Popup";
import {Form} from "../common/formControls/Form/Form";
import Input from "../common/formControls/Input/Input";
import s from './SavePopup.module.css';

type SavePopupProps = {
    isOpened: boolean,
    close: () => void
}

export const SavePopup = ({isOpened, close}: SavePopupProps) => {

    const core = useContext(ESCoreContext);
    const [filename, setFilename] = useState("");

    const save = () => {
        if (!core || !core.isInitialized) return;
        const file = new Blob([JSON.stringify(core.getRoot())], {type: "application/json"});

        const a = document.createElement("a"),
            url = URL.createObjectURL(file);

        a.href = url;
        a.download = `${filename}.json`;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    };

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        save();
        close();
    };

    return (
        <Popup isOpened={isOpened} close={close}>
            <Form isValid={filename.length > 0}
                  buttonText={"Save"}
                  handleSubmit={handleSubmit}
            >
                <div className={s.wrapper}>
                    <Input name="Filename"
                           value={filename}
                           props={{
                               onChange: (e: ChangeEvent<HTMLInputElement>) => setFilename(e.target.value)
                           }}
                    />
                </div>
            </Form>
        </Popup>
    )
};
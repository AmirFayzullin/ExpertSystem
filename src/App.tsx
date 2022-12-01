import React, {useEffect, useState} from 'react';
import './App.css';
import {Tree} from "./components/Tree/Tree";
import {ESCore} from "./ExpertSystemCore/ESCore";
import {ESCoreContext} from './contexts/ESCoreContext';
import {FormPopup} from "./components/FormPopup/FormPopup";
import {Header} from "./components/Header/Header";
import {ExecutionSlider} from "./components/ExecutionSlider/ExecutionSlider";
import {Executor} from "./ExpertSystemCore/Executor";
import {SavePopup} from "./components/SavePopup/SavePopup";
import {ConfirmationPopup} from "./components/ConfirmationPopup/ConfirmationPopup";

function App() {
    const [core, setCore] = useState<ESCore | null>(null);
    const [optionId, setOptionId] = useState<number | null>(null);
    const [isFormPopupOpened, setIsFormPopupOpened] = useState<boolean>(false);
    const [isSavePopupOpened, setIsSavePopupOpened] = useState<boolean>(false);
    const [executor, setExecutor] = useState<Executor | null>(null);
    const [isExecutionPopupOpened, setIsExecutionPopupOpened] = useState<boolean>(false);

    const handleOpenAdd = (optionId: number) => {
        setOptionId(optionId);
        setIsFormPopupOpened(true);
    };

    const handleDelete = (nodeId: number) => {
        core?.removeNode(nodeId);
    };

    const handleClosePopupForm = () => {
        setOptionId(null);
        setIsFormPopupOpened(false);
    };

    const execute = () => {
        if (!core) return null;
        setExecutor(core.getExecutor());
        setIsExecutionPopupOpened(true);
    };

    const closeExecutionPopup = () => {
        if (!core) return null;
        setIsExecutionPopupOpened(false);
    };

    const resetTree = () => {
        setCore(new ESCore());
    };

    useEffect(() => {
        if (!core) resetTree();
    }, []);

    // @ts-ignore
    const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
        if (!e.dataTransfer) return;
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();

        reader.readAsText(file, "UTF-8");
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (!e.target) return;
            const core = new ESCore();
            core.load(JSON.parse(e.target.result as string));
            setCore(core);
        }
    };

    // @ts-ignore
    const overrideDragPreventDefaults = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };



    return (
        <ESCoreContext.Provider value={core}>
            <div
                onDragEnter={overrideDragPreventDefaults}
                onDragOver={overrideDragPreventDefaults}
                onDragLeave={overrideDragPreventDefaults}
                onDrop={overrideDragPreventDefaults}
            >
                <div className="App"
                     onDrop={handleFileDrop}
                >
                    <div className="headerWrapper">
                        <Header execute={execute}
                                reset={resetTree}
                                save={() => setIsSavePopupOpened(true)}
                        />
                    </div>
                    <div className="formPopupWrapper">
                        <FormPopup isOpened={isFormPopupOpened}
                                   optionId={optionId}
                                   close={handleClosePopupForm}
                        />
                    </div>
                    <div className="treeWrapper">
                        {
                            core?.isInitialized &&
                            <Tree handleOptionClick={handleOpenAdd}
                                  handleLeafClick={handleDelete}
                            />
                        }

                        {
                            !core?.isInitialized && !isFormPopupOpened &&
                            <div className="startButton"
                                 onClick={() => setIsFormPopupOpened(true)}
                            >

                            </div>
                        }
                    </div>
                    <div className="executorWrapper">
                        <ExecutionSlider executor={executor}
                                         isOpened={isExecutionPopupOpened}
                                         close={closeExecutionPopup}
                        />
                    </div>
                    <SavePopup isOpened={isSavePopupOpened}
                               close={() => setIsSavePopupOpened(false)}
                    />
                    <ConfirmationPopup />
                </div>
            </div>
        </ESCoreContext.Provider>
    );
}

export default App;
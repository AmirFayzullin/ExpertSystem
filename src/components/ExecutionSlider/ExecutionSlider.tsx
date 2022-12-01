import React, {useEffect, useState} from 'react';
import {Executor} from "../../ExpertSystemCore/Executor";
import cn from 'classnames';
import s from './ExecutionSlider.module.css';
import {CFactorNode} from "../../ExpertSystemCore/Node";
import {useForceUpadte} from "../../hooks/useForceUpdate";
import {Popup} from "../Popup/Popup";
// @ts-ignore
import CanvasConfetti from "react-canvas-confetti";

type ExecutionSliderProps = {
    executor: Executor | null,
    isOpened: boolean,
    close: () => void,
}

export const ExecutionSlider = ({executor, isOpened, close}: ExecutionSliderProps) => {
    const update = useForceUpadte();
    const [fire, setFire] = useState(0);

    const step = executor?.getCurrent();

    const isFinished = executor?.isFinished();

    const goNext = (id: number) => {
        executor?.next(id);
        update();
    };

    const goBack = () => {
        try {
            executor?.back();
        } catch (e) {
            console.log(`You are on the first step: ${e}`);
        }
        update();
    };

    useEffect(() => {
        if(isFinished) {
            setFire(Math.random());
        }
    }, [isFinished]);

    const options = !isFinished && (step as CFactorNode)?.options.map(opt => {
        if (!opt.child) return null;
        return (
            <div key={opt?.id}
                 onClick={() => {
                     // @ts-ignore
                     goNext(opt?.id);
                 }}
                 className={s.option}
            >
                {opt.title.title}
            </div>
        )
    });

    const confettiProps = {
        width: window.innerWidth,
        height: window.innerHeight,
        particleCount: 100,
        fire: fire,
        ticks: 70,
        decay: 0.82,
        spread: 180,
        startVelocity: 110,
        gravity: 0.8,
        origin: {
            x: 0.5,
            y: 1
        },
        style: {
            zIndex: 3,
            position: 'fixed',
            top: 0,
            left: 0,
            transform: "translate(-25%, -25%)",
            pointerEvents: 'none',
            inset: '0px',
        }
    };

    return (
        <Popup isOpened={isOpened} close={close}>
            <div className={cn(s.wrapper, {[s.opened]: isOpened})}>
                <div className={cn(s.title, {[s.goal]: isFinished})}>
                    {step?.title.title}
                </div>
                {
                    !isFinished &&
                    <div className={s.options}>
                        {options}
                    </div>
                }

                {
                    !isFinished &&
                    <div onClick={goBack}
                         className={s.back}
                    >

                    </div>
                }

                {// @ts-ignore
                    <CanvasConfetti {...confettiProps}/>
                }
            </div>
        </Popup>
    )
};

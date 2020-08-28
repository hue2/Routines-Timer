import * as React from 'react';

export default function Clock( props: TimeProps)  {
    const { isBreak, showOptions, time, remainingRepeats, repeats } = props;

    return(
        <div>
            <div className={isBreak ? "hidden" : !showOptions ? "time" : "time padding-200px"} id="time-countdown">
                <b>{time}</b>
            </div>
            <div className={!isBreak ? "hidden" : ""} id ="break-countdown">
                <h3>Break time!</h3>
                <b>{time}</b>

            </div>
            <div className={repeats < 1 ? "hidden" : ""} id="repeat-txt">
                <p className="small-text">Laps remaining: {remainingRepeats}</p>
            </div>
        </div>
    );
}

interface TimeProps {
    time: string,
    repeats: number,
    isBreak?: boolean,
    showOptions: boolean,
    remainingRepeats?: number,
};

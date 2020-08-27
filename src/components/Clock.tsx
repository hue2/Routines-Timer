import * as React from 'react';
//@ts-ignore;
import sound from '../assets/sound/sony_beep_beep_alarm.mp3';

export default function Clock( props: TimeProps)  {
    const { isBreak, showOptions, time, remainingRepeats, repeats, notify } = props;

    return(
        <div>
            <div className={isBreak ? "hidden" : !showOptions ? "time" : "time padding-200px"} id="time-countdown">
                <b>{time}</b>
            </div>
            <div className={!isBreak ? "hidden" : ""} id ="break-countdown">
                {notify && <audio src={sound} autoPlay />}
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
    notify: boolean,
};

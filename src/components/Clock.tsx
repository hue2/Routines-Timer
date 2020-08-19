import * as React from 'react';
//@ts-ignore;
import sound from '../styles/sony_beep_beep_alarm.mp3';
import { TimeProps } from './TimeType';

export default function Clock( props: TimeProps)  {
    const { isBreak, showOptions, time, remainingRepeats } = props;

    return(
        <div>
            <div className={isBreak ? "hidden" : !showOptions ? "time" : "time padding-200px"} id="time-countdown">
                <b>{time}</b>
            </div>
            <div className={!isBreak ? "hidden" : ""} id ="break-countdown">
                {/* {notify && <audio src={sound} autoPlay />} */}
                <h3>Break time!</h3>
                <b>{time}</b>

                <p className="small-text"># of repeats left: {remainingRepeats}</p>
            </div>
        </div>
    );
}
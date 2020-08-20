import * as React from 'react';
import TimerButton from './display_components/Buttons';

export default function TimerOptions(props : TimerOptions) {
    const { onReset, onPause, isPaused, onRestart, isShow } = props;
    return (
        <div id="button-groups" className={isShow ? "" : "hidden"}>
            <TimerButton className="reset-btn"  onClick={onReset}>
                <i className="fa fa-times-circle-o"></i>&nbsp; Reset
            </TimerButton>
            {isPaused &&
                <TimerButton className="primary-btn" onClick={onPause}><i className="fa fa-play-circle-o"></i>&nbsp; Resume</TimerButton>
            }
            {!isPaused &&
                <TimerButton className="pause-btn" onClick={onPause} id="pause-btn"><i className="fa fa-pause-circle-o"></i>&nbsp; Pause</TimerButton>
            }
            <TimerButton className="restart-btn"  onClick={onRestart}><i className="fa fa-refresh"></i>&nbsp; Restart</TimerButton>            
        </div>
    )
}

interface TimerOptions {
    onReset: () => void,
    isPaused: boolean,
    onPause: () => void,
    onRestart: () => void,
    isShow: boolean,
}

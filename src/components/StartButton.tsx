import * as React from 'react';
import TimerButton from './display_components/Buttons';

export default function StartButton(props : Start) {
    const { onStart, isShow, isDisabled } = props;
    
    return (
        <div title="Click settings below to set time" className={isShow ? "" : "hidden"}>
            <TimerButton  
                className={isDisabled ? "disabled-btn " : "primary-btn "} 
                onClick={onStart} 
                disabled={isDisabled ? true : false}
                id="start-btn"
            >
                <i className="fa fa-play"></i>&nbsp; Start
            </TimerButton>
        </div>
    )
}

interface Start {
    onStart: () => void,
    isShow: boolean,
    isDisabled: boolean,
}
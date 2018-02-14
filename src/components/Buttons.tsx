import * as React from 'react'; 

export default function TimerButton({className="", ...rest}) {
    let btnClass = 'timer-btn';

    return (
        <button className={btnClass + ' ' + className} {...rest}>
        </button>
    );
}


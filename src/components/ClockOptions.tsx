import * as React from 'react';
import { ITimeInfo, ITimeBreak } from './TimeType';
import Input from './display_components/Input';

export default function ClockOptions(props: ClockOptionsProps)  {
    const { toggleNav, handleTimeChange, handleChange, 
        time, navOpen, breakTime, repeats } = props;

    return(
        <div id="myNav" className={navOpen ? "overlay open" : " overlay close"}>
        <a href="javascript:void(0)" className="closebtn" onClick={toggleNav}>&times;</a>
            <div className="overlay-content">
                <div className="option-div">
                    <div className="option-label">Time: </div>
                    <div className="input-time" >
                        <Input
                            className="hour"
                            id="hour"
                            onChange={handleTimeChange}
                            value={time.hour ? time.hour : ""}
                            placeholder="hh"
                            data-state="time"
                        />   
                        <label className="dot-separator">:</label>
                        <Input
                            className="minute"
                            onChange={handleTimeChange}
                            value={time.minute > 0 ? time.minute: ""}
                            placeholder="mm"
                            data-state="time"
                        />            
                        <label className="dot-separator">:</label>
                        <Input
                            className="second"
                            onChange={handleTimeChange}
                            value={time.second > 0 ? time.second : ""}
                            placeholder="ss"
                            data-state="time"
                        />                      
                    </div>
                </div>
                <div className="option-div">
                    <div className="option-label">Breaks: </div>
                    <div className="input-time">
                        <Input
                            className="minuteBreak"
                            onChange={handleChange}
                            value={breakTime.minuteBreak ? breakTime.minuteBreak : ""}
                            placeholder="mm"
                            data-state="timeBreak"
                        />     
                        <label className="dot-separator">:</label>
                        <Input
                            className="secondBreak"
                            onChange={handleChange}
                            value={breakTime.secondBreak ? breakTime.secondBreak : ""}
                            placeholder="ss"
                            data-state="timeBreak"
                        />                
                    </div>
                </div> 

                <div className="option-div">
                    <div className="option-label">Repeats: </div>
                    <div className="input-time">
                        <Input
                            className="repeat tempRepeat"
                            onChange={handleChange}
                            value={repeats ? repeats : ""}
                            data-state="repeats"
                        />                     
                    </div>
                </div>
            </div>
        </div>
    );  
}

interface ClockOptionsProps {
    navOpen: boolean,
    handleChange: (event: any) => void,
    handleTimeChange: (event: any) => void,
    toggleNav: () => void,
    time: ITimeInfo,
    breakTime: ITimeBreak,
    repeats: number
}

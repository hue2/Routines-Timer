import * as React from 'react';
import '../styles/App.css';
import '../styles/Options.css';
import { ClockOptionsProps } from './TimeType';
import Input from './Input';

export default function ClockOptions(props: ClockOptionsProps)  {
    const { toggleNav, handleTimeChange, handleChange, 
        time, navOpen, breakTime, repeats } = props;

    return(
        <div id="myNav" className={navOpen ? "overlay open" : " overlay close"}>
        <a href="javascript:void(0)" className="closebtn" onClick={toggleNav}>&times;</a>
            <div className="overlay-content">
                <div className="option-div">
                    <div className="option-label">Time: </div>
                    <div className="input-time">
                        <Input
                            className="hour"
                            onChange={handleTimeChange}
                            value={time.hour ? time.hour : ""}
                            placeholder="hh"
                            data-state="time"
                        />   
                        <input className="dot-separator" type="text" placeholder=":" disabled/>
                        <Input
                            className="minute"
                            onChange={handleTimeChange}
                            value={time.minute > 0 ? time.minute: ""}
                            placeholder="mm"
                            data-state="time"
                        />            
                        <input className="dot-separator" type="text" placeholder=":" disabled/>
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
                        <input className="dot-separator" type="text" placeholder=":" disabled/>
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
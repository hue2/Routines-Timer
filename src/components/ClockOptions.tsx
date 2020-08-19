import * as React from 'react';
import '../styles/App.css';
import '../styles/Options.css';
import { ClockOptionsState, ClockOptionsProps } from './TimeType';

// import TimerButton from './Buttons';


export default class ClockOptions extends React.Component<ClockOptionsProps, ClockOptionsState>  {
    constructor(props: ClockOptionsProps) {
        super(props);
        this.state = { show: false, maxLength: 3 }
    }

    handleOpenNav = () => {}
    setTimer = () => {}

    render() {
        return(
            <div id="myNav" className={this.props.navOpen ? "overlay open" : " overlay close"}>
            <a href="javascript:void(0)" className="closebtn" onClick={this.props.navClose}>&times;</a>
                <div className="overlay-content">
                    <div className="option-div">
                        <div className="option-label">Time: </div>
                        <div className="input-time">
                        <input type="number" placeholder="hh" min="1" maxLength={this.state.maxLength} data-state="time" className="hour" onChange={this.props.handleTimeChange}
                               value={this.props.hour ? this.props.hour : ""}/>
                        <input className="dot-separator" type="text" placeholder=":" disabled/>
                        <input type="number" placeholder="mm" min="1" maxLength={this.state.maxLength}  id="minute-input" data-state="time" className="minute" onChange={this.props.handleTimeChange}
                               value={this.props.minute > 0 ? this.props.minute: ""}/>
                        <input className="dot-separator" type="text" placeholder=":" disabled/>
                        <input type="number" placeholder="ss"  min="1" max="59" maxLength={this.state.maxLength} id="second-input" data-state="time" className="second" onChange={this.props.handleTimeChange}
                               value={this.props.seconds > 0 ? this.props.seconds : ""}/>
                        </div>
                    </div>
                    <div className="option-div">
                        <div className="option-label">Breaks: </div>
                        <div className="input-time">
                        <input type="number" placeholder="mm" maxLength={this.state.maxLength} data-state="timeBreak" className="minuteBreak" onChange={this.props.handleChange}
                                value={this.props.minuteBreak ? this.props.minuteBreak : ""}/>
                        <input className="dot-separator" type="text" placeholder=":" disabled/>
                        <input type="number" placeholder="ss" maxLength={this.state.maxLength} data-state="timeBreak" className="secondBreak" onChange={this.props.handleChange}
                                value={this.props.secondBreak ? this.props.secondBreak : ""}/>
                        </div>
                    </div> 

                    <div className="option-div">
                        <div className="option-label">Repeats: </div>
                        <div className="input-time">
                        <input type="number" maxLength={this.state.maxLength} data-state="repeats" className="repeat tempRepeat" onChange={this.props.handleChange}
                                value={this.props.repeats ? this.props.repeats : ""}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
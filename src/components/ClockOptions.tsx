import * as React from 'react';
import '../styles/App.css';
import '../styles/Options.css';

// import TimerButton from './Buttons';

type ClockOptionsState = {
    show: boolean,
    closeModal?: () => void;
    maxLength: number,
}

type ClockOptionsProps = {
    navOpen: boolean,
    navClose: () => void,
    handleSetHour: (event: any) => void,
    handleSetMinute: (event: any) => void,
    handleSetSeconds: (event: any) => void,
    handleSetMinuteBreak: (event: any) => void,
    handleSetSecondsBreak: (event: any) => void,
    handleSetRepeats: (event: any) => void,
    hour: number,
    minute: number,
    seconds: number,
    minuteBreak: number,
    secondBreak: number,
    repeats: number
}

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
                        <input type="text" placeholder="hh" maxLength={this.state.maxLength} onChange={this.props.handleSetHour }
                               value={this.props.hour ? this.props.hour : ""}/>
                        <input className="dot-separator" type="text" placeholder=":" disabled/>
                        <input type="text" placeholder="mm" maxLength={this.state.maxLength}  onChange={this.props.handleSetMinute}
                               value={this.props.minute > 0 ? this.props.minute: ""}/>
                        <input className="dot-separator" type="text" placeholder=":" disabled/>
                        <input type="text" placeholder="ss" maxLength={this.state.maxLength} onChange={this.props.handleSetSeconds}
                               value={this.props.seconds > 0 ? this.props.seconds : ""}/>
                        </div>
                    </div>
                    <div className="option-div">
                        <div className="option-label">Breaks: </div>
                        <div className="input-time">
                        <input type="text" placeholder="mm" maxLength={this.state.maxLength} onChange={this.props.handleSetMinuteBreak}
                                value={this.props.minuteBreak ? this.props.minuteBreak : ""}/>
                        <input className="dot-separator" type="text" placeholder=":" disabled/>
                        <input type="text" placeholder="ss" maxLength={this.state.maxLength} onChange={this.props.handleSetSecondsBreak}
                                value={this.props.secondBreak ? this.props.secondBreak : ""}/>
                        </div>
                    </div>

                    <div className="option-div">
                        <div className="option-label">Repeats: </div>
                        <div className="input-time">
                        <input type="text" maxLength={this.state.maxLength} onChange={this.props.handleSetRepeats}
                                value={this.props.repeats ? this.props.repeats : ""}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
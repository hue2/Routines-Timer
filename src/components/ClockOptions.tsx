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

const style = {
    open: {
        width: "20%"
    },
    close: {
        width: "0%"
    }
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
            <div id="myNav" className="overlay" style={this.props.navOpen ? style.open : style.close }>
            <a href="javascript:void(0)" className="closebtn" onClick={this.props.navClose}>&times;</a>
                <div className="overlay-content">
                    <div className="option-div">
                        <div className="option-label">Time: </div>
                        <div className="input-time">
                        <input type="text" placeholder="hh" maxLength={this.state.maxLength} onChange={this.props.handleSetHour }
                               value={this.props.hour > 0 ? this.props.hour : ""}/>
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
                        <input type="text" placeholder="mm" maxLength={this.state.maxLength} onChange={this.props.handleSetMinuteBreak}/>
                        <input className="dot-separator" type="text" placeholder=":" disabled/>
                        <input type="text" placeholder="ss" maxLength={this.state.maxLength} onChange={this.props.handleSetSecondsBreak}/>
                        </div>
                    </div>

                    <div className="option-div">
                        <div className="option-label">Repeats: </div>
                        <div className="input-time">
                        <input type="text" maxLength={this.state.maxLength} onChange={this.props.handleSetRepeats}/>
                        </div>
                    </div>
                    {/* <TimerButton className="gray-btn"  onClick={this.props.}><i className="fa fa-undo"></i> Restart</TimerButton>  */}
                </div>
            </div>
        );
    }
}
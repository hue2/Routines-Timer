import * as React from 'react';

type TimeProps = {
    value?: number,
    hour: number,
    minute: number,
    seconds: number,
    minuteBreak: number,
    secondBreak: number,
    repeats: number,
    startTimer: () => void,
    isBreak?: boolean
};

export default class Clock extends React.Component<TimeProps>  {
    formatNumber(hour: boolean, minute: boolean, second: boolean,) {
        let time;
        if (minute) {
            time = this.props.isBreak ? this.props.minuteBreak : this.props.minute;
        }
        else if (second) {
            time = this.props.isBreak ? this.props.secondBreak : this.props.seconds;
        }
        else if (hour) {
            time = this.props.hour;
        }
        else {
            time = "0";
        }
        return (time.toString().length < 2) ? "0" + time : time;
    }
    render() {
        return(
            <div>
                <div className={this.props.isBreak ? "hidden" : "time"} id="time-countdown"><b>
                {this.formatNumber(true, false, false)}:{this.formatNumber(false, true, false)}:{this.formatNumber(false, false, true)}</b>
                </div>
                <div className={!this.props.isBreak ? "hidden" : "time"} id ="break-countdown">
                <h3>Break time!</h3>
                <b>
                {this.formatNumber(false, true, false)}:{this.formatNumber(false, false, true)}</b>
                </div>
                <br />
                <button id="startTimer" onClick={this.props.startTimer}>Start</button>
            </div>
        );
    }
}
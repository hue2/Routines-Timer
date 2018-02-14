import * as React from 'react';
import TimerButton from './Buttons';

type TimeProps = {
    value?: number,
    hour: number,
    minute: number,
    seconds: number,
    minuteBreak: number,
    secondBreak: number,
    repeats: number,
    startTimer: () => void,
    isBreak?: boolean,
    handlePause: () => void,
    isPaused?: boolean,
    showOptions: boolean,
    onReset: () => void,
    onRestart: () => void
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

        if (time != undefined && time.toString().length < 1) {
            time = "0";
        }

        return (time != undefined && time.toString().length < 2) ? "0" + time : time;
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
                <TimerButton className="gray-btn"  onClick={this.props.onRestart}><i className="fa fa-undo"></i> Restart</TimerButton>
                </div>
                <br />
                {
                 !this.props.showOptions &&
                <TimerButton className="primary-btn" onClick={this.props.startTimer}><i className="fa fa-play"></i> Start</TimerButton>
                }
                {this.props.showOptions &&
                <div id="button-groups">
                    <TimerButton className="red-btn"  onClick={this.props.onReset}><i className="fa fa-stop"></i> Reset</TimerButton>
                    {this.props.isPaused &&
                        <TimerButton className="primary-btn" onClick={this.props.handlePause}><i className="fa fa-play"></i> Resume</TimerButton>
                    }
                    {!this.props.isPaused &&
                        <TimerButton className="orange-btn" onClick={this.props.handlePause}><i className="fa fa-pause"></i> Pause</TimerButton>
                    }
                    <TimerButton className="gray-btn"  onClick={this.props.onRestart}><i className="fa fa-undo"></i> Restart</TimerButton>            
                </div>
                }
            </div>
        );
    }
}
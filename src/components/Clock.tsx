import * as React from 'react';
import TimerButton from './Buttons';
//@ts-ignore;
import sound from '../styles/sony_beep_beep_alarm.mp3';

type TimeProps = {
    value?: number,
    hour: number,
    minute: number,
    seconds: number,
    minuteBreak: number,
    secondBreak: number,
    repeats: number,
    handleStartTimer: () => void,
    isBreak?: boolean,
    handlePause: () => void,
    isPaused?: boolean,
    showOptions: boolean,
    onReset: () => void,
    onRestart: () => void,
    remainingRepeats?: number
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
                <div className={this.props.isBreak ? "hidden" : !this.props.showOptions ? "time" : "time padding-200px"} id="time-countdown">
                <b>{this.formatNumber(true, false, false)}:{this.formatNumber(false, true, false)}:{this.formatNumber(false, false, true)}</b>
                </div>
                <div className={!this.props.isBreak ? "hidden" : ""} id ="break-countdown">
                {this.props.isBreak && <audio src={sound} autoPlay />}
                <h3>Break time!</h3>
                <b>
                {this.formatNumber(false, true, false)}:{this.formatNumber(false, false, true)}</b>
                <p className="small-text"># of repeats left: {this.props.remainingRepeats}</p>
                </div>
                {
                 !this.props.showOptions &&
                <TimerButton className={this.props.seconds < 1 
                    && this.props.minute < 1
                    && this.props.hour < 1 ? "disabled-btn " : "primary-btn "} onClick={this.props.handleStartTimer} 
                    disabled={this.props.seconds < 1 
                    && this.props.minute < 1
                    && this.props.hour < 1 ? true : false}
                    id="start-btn">
                    <i className="fa fa-play"></i>&nbsp; Start
                </TimerButton>
                }

                {/* only show options when the timer is started */}
                {this.props.showOptions &&
                <div id="button-groups">
                    <TimerButton className="red-btn"  onClick={this.props.onReset}><i className="fa fa-stop"></i>&nbsp; Reset</TimerButton>
                    {this.props.isPaused &&
                        <TimerButton className="primary-btn" onClick={this.props.handlePause}><i className="fa fa-play"></i>&nbsp; Resume</TimerButton>
                    }
                    {!this.props.isPaused &&
                        <TimerButton className="orange-btn" onClick={this.props.handlePause} id="pause-btn"><i className="fa fa-pause"></i>&nbsp; Pause</TimerButton>
                    }
                    <TimerButton className="gray-btn"  onClick={this.props.onRestart}><i className="fa fa-undo"></i>&nbsp; Restart</TimerButton>            
                </div>
                }
            </div>
        );
    }
}
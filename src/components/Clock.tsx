import * as React from 'react';

type TimeProps = {
    value?: number,
    hour: number,
    minute: number,
    seconds: number,
    minuteBreak: number,
    secondBreak: number,
    repeats: number,
    startTimer: () => void
};

export default class Clock extends React.Component<TimeProps>  {
    render() {
        return(
            <div>
                <div className="timeDiv"><b>{this.props.hour} : {this.props.minute} : {this.props.seconds}</b></div>
                <br />
                <button id="startTimer" onClick={this.props.startTimer}>Start</button>
            </div>
        );
    }
}
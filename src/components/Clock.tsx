import * as React from 'react';

type TimeState = {
    value: number,
};

type TimeProps = {
    value: number;
};

export default class Clock extends React.Component<TimeProps, TimeState>  {
    constructor(props: TimeProps) {
        super(props);
        this.state = { value: this.props.value };
    }

    tick = () => {
        if (this.state.value === 0) {
            this.clearTimer();
        } else {
            this.setState({ value: this.state.value - 1});       
        }    
    }
    clearTimer = () => {
        //@ts-ignore
        clearInterval(this.interval);
    }
    startTimer = () => {
        //@ts-ignore
        this.interval = setInterval(this.tick, 1000);
        
    }
    render() {
        return(
            <div>
                <div className="timeDiv">{this.state.value}</div>
                <br />
                <button id="startTimer" onClick={this.startTimer}>Start</button>
            </div>
        );
    }
}
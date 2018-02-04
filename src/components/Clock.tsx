import * as React from 'react';

type TimeState = {
    time: number,
};

type TimeProps = {
    time: number;
};

export default class Clock extends React.Component<TimeProps, TimeState>  {
    constructor(props: TimeProps) {
        super(props);
        this.state = { time: this.props.time };
    }

    tick = () => {
        if (this.state.time === 0) {
            this.clearTimer();
        }
        else {
            this.setState({ time: this.state.time - 1});       
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
                <button onClick={this.startTimer}>Start</button>
                {this.state.time}
            </div>
        );
    }
}
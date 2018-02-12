import * as React from 'react';
import '../styles/App.css';
import '../styles/Options.css';

type ClockOptionsState = {
    show: boolean,
    closeModal?: () => void;
    maxLength: number,
}

type ClockOptionsProps = {
    navOpen: boolean,
    navClose: () => void,
    setHour: (event: any) => void,
    setMinute: (event: any) => void,
    setSeconds: (event: any) => void,
    setMinuteBreak: (event: any) => void,
    setSecondsBreak: (event: any) => void,
    setRepeats: (event: any) => void,
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

    openNav = () => {}
    setTimer = () => {}

    render() {
        return(
            <div id="myNav" className="overlay" style={this.props.navOpen ? style.open : style.close }>
            <a href="javascript:void(0)" className="closebtn" onClick={this.props.navClose}>&times;</a>
                <div className="overlay-content">
                    <div className="option-div">
                        <div className="option-label">Time: </div>
                        <div className="input-time">
                        <input type="text" placeholder="hh" maxLength={this.state.maxLength} onChange={this.props.setHour}/>
                        <input className="dot-separator" type="text" placeholder=":" disabled/>
                        <input type="text" placeholder="mm" maxLength={this.state.maxLength} onChange={this.props.setMinute}/>
                        <input className="dot-separator" type="text" placeholder=":" disabled/>
                        <input type="text" placeholder="ss" maxLength={this.state.maxLength} onChange={this.props.setSeconds}/>
                        </div>
                    </div>
                    <div className="option-div">
                        <div className="option-label">Breaks: </div>
                        <div className="input-time">
                        <input type="text" placeholder="mm" maxLength={this.state.maxLength} onChange={this.props.setMinuteBreak}/>
                        <input className="dot-separator" type="text" placeholder=":" disabled/>
                        <input type="text" placeholder="ss" maxLength={this.state.maxLength} onChange={this.props.setSecondsBreak}/>
                        </div>
                    </div>

                    <div className="option-div">
                        <div className="option-label">Repeats: </div>
                        <div className="input-time">
                        <input type="text" maxLength={this.state.maxLength} onChange={this.props.setRepeats}/>
                        </div>
                    </div>
                 
                </div>
            </div>
        );
    }
}
import * as React from 'react';
import '../styles/App.css';
import '../styles/Options.css';
import Clock from './Clock';
import ClockOptions from './ClockOptions';


type AppState = {
  show: boolean,
  hour: number,
  minute: number,
  seconds: number,
  minuteBreak: number,
  secondBreak: number,
  repeats: number,
  value: number,
  isBreak?: boolean
}

type AppProps = {

}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { show: false, value: 0, hour: 0, minute: 0, seconds: 0, minuteBreak: 0, secondBreak: 0, repeats: 0, isBreak: false }
  }
 
  openNav = () => this.setState({ show: true });
  closeNav = () => this.setState({ show: false });
  setHour = (event: any) => this.setState({ hour: event.target.value });
  setMinute = (event: any) => this.setState({ minute: event.target.value });
  setSeconds = (event: any) => this.setState({ seconds: event.target.value });
  setMinuteBreak = (event: any) => this.setState({ minuteBreak: event.target.value });
  setSecondsBreak = (event: any) => this.setState({ secondBreak: event.target.value });
  setRepeats = (event: any) => this.setState({ repeats: event.target.value });
  
  tick = () => {
    if (this.state.value === 0) {
        this.clearTimer();
        this.startTimer();
    } else if (!this.state.isBreak) {
        this.setState({ value: this.state.value - 1, seconds: this.state.value - 1 });       
    }    
    else if (this.state.isBreak) {
        this.setState({ value: this.state.value - 1, secondBreak: this.state.value - 1 });     
    }
  }
  clearTimer = () => {
      //@ts-ignore
      clearInterval(this.interval);
  }

  handleTimeConvert = () => {
        if (this.state.seconds < 1 && this.state.minute < 1 && this.state.seconds < 1) {
            this.handleBreaks();
            this.setState({ isBreak: true })
        }
        if (this.state.seconds > 0) {
          this.setState({ value: this.state.seconds });
         }
        else if (this.state.minute > 0) {
          this.setState({ minute: this.state.minute - 1 });
          this.setState({ value: 60 });
        }
        else if (this.state.hour > 0) {
          this.setState({ hour: this.state.hour - 1});
          this.setState({ minute: 60 });
          this.setState({ value: 60 });           
      }
  }

  handleBreaks = () => {
        if (this.state.secondBreak > 0) {
            this.setState({ value: this.state.secondBreak });
        }
        else if (this.state.minuteBreak > 0) {
          this.setState({ minuteBreak: this.state.minuteBreak - 1 });
          this.setState({ value: 60 });
        }
  }

  startTimer = () => { 
      this.closeNav();
      if (this.state.value < 1) {
          this.handleTimeConvert();
      }
      //@ts-ignore
      this.interval = setInterval(this.tick, 1000);
      
  }
  render() {
    return (
      <div className="App">
        <Clock hour={this.state.hour} 
        minute={this.state.minute}
        seconds={this.state.seconds} 
        minuteBreak={this.state.minuteBreak} 
        secondBreak={this.state.secondBreak} 
        repeats={this.state.repeats} 
        startTimer={this.startTimer}
        isBreak={this.state.isBreak}
        />
        <ClockOptions 
        navOpen={this.state.show} 
        navClose={this.closeNav}
        setHour={this.setHour}
        setMinute={this.setMinute}
        setSeconds={this.setSeconds}
        setMinuteBreak={this.setMinuteBreak}
        setSecondsBreak={this.setSecondsBreak}
        setRepeats={this.setRepeats}
        />
        <span id="openNav" onClick={this.openNav} >&#9776; open</span>
      </div>
    );
  }
}

export default App;

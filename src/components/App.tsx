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
}

type AppProps = {

}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { show: false, value: 0, hour: 0, minute: 0, seconds: 0, minuteBreak: 0, secondBreak: 0, repeats: 0 }
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
    } else {
        this.setState({ value: this.state.value - 1, seconds: this.state.value - 1 });       
    }    
  }
  clearTimer = () => {
      //@ts-ignore
      clearInterval(this.interval);
  }

  handleTimeConvert = () => {
      if (this.state.seconds > 0) {
          this.setState({ value: this.state.seconds });
      }
      else if (this.state.minute > 0) {
          this.setState({ minute: this.state.minute - 1 });
          this.setState({ value: 59 });
      }
      else if (this.state.hour > 0) {
          this.setState({ hour: this.state.hour - 1});
          this.setState({ minute: 59 });
          this.setState({ value: 59 });           
      }
  }
  startTimer = () => { 
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
        <span onClick={this.openNav} >&#9776; open</span>
      </div>
    );
  }
}

export default App;

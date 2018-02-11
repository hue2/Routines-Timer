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
  isBreak?: boolean,
  //using temp variables to store the values so if there's a repeat, we can start over using the values we already saved
  tempMin: number,
  tempHour: number,
  tempSecond: number,
  tempMinuteBreak: number,
  tempSecondBreak: number
}

type AppProps = {

}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { show: false, value: 0, hour: 0, minute: 0, seconds: 0, minuteBreak: 0, secondBreak: 0, repeats: 0, isBreak: false,
                  tempMin: 0, tempHour: 0, tempSecond: 0, tempMinuteBreak: 0, tempSecondBreak: 0
                  }
  }
 
  openNav = () => this.setState({ show: true });
  closeNav = () => this.setState({ show: false });
  setHour = (event: any) => this.setState({ hour: event.target.value, tempHour: event.target.value });
  setMinute = (event: any) => this.setState({ minute: event.target.value, tempMin: event.target.value });
  setSeconds = (event: any) => this.setState({ seconds: event.target.value, tempSecond: event.target.value });
  setMinuteBreak = (event: any) => this.setState({ minuteBreak: event.target.value, tempMinuteBreak: event.target.value });
  setSecondsBreak = (event: any) => this.setState({ secondBreak: event.target.value, tempSecondBreak: event.target.value });
  setRepeats = (event: any) => this.setState({ repeats: event.target.value });
  
  tick = () => {
    if (this.state.value === 0) {
        this.clearTimer();
        this.startTimer();
    } else if (!this.state.isBreak) {
        this.setState({ value: this.state.value - 1, tempSecond: this.state.value - 1 });       
    }    
    else if (this.state.isBreak) {
        this.setState({ value: this.state.value - 1, tempSecondBreak: this.state.value - 1 });     
    }
    
  }
  clearTimer = () => {
      //@ts-ignore
      clearInterval(this.interval);
  }

  handleTimeConvert = () => {
        //all the time has been exhausted, start break if there's any
        if (this.state.tempSecond < 1 && this.state.tempMin < 1 && this.state.tempHour < 1) {
            this.handleBreaks();
            this.setState({ isBreak: true })
        }
        if (this.state.tempSecond > 0) {
          this.setState({ value: this.state.tempSecond });
         }
        else if (this.state.tempMin > 0) {
          this.setState({ tempMin: this.state.tempMin - 1,
                          value: 60 });
        }
        else if (this.state.tempHour > 0) {
          this.setState({ tempHour: this.state.tempHour - 1,
                          tempMin: 60, 
                          value: 60 });           
        }
      //no time, no break, check for repeats
        else if (this.state.repeats > 0 && this.state.tempSecondBreak < 1 && this.state.tempMinuteBreak < 1) {
          this.setState({ 
            repeats: this.state.repeats - 1,
            tempMin: this.state.minute,
            tempSecond: this.state.seconds,
            tempHour: this.state.hour,
            tempMinuteBreak: this.state.minuteBreak,
            tempSecondBreak: this.state.secondBreak,
            value: this.state.seconds,
            isBreak: false
          });
    }
  }

  handleBreaks = () => {
        if (this.state.tempSecondBreak > 0) {
            this.setState({ value: this.state.tempSecondBreak });
        }
        else if (this.state.tempMinuteBreak > 0) {
          this.setState({ tempMinuteBreak: this.state.tempMinuteBreak - 1,
                          value: 60  });
        }
  }

  startTimer = () => { 
      this.closeNav();

      //this check will allow minutes and hours to be converted to seconds for countdown
      if (this.state.value < 1) {
          this.handleTimeConvert();
      }
      //@ts-ignore
      this.interval = setInterval(this.tick, 1000);
      
  }
  render() {
    return (
      <div className="App">
        <Clock hour={this.state.tempHour} 
        minute={this.state.tempMin}
        seconds={this.state.tempSecond} 
        minuteBreak={this.state.tempMinuteBreak} 
        secondBreak={this.state.tempSecondBreak} 
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

// export default App;

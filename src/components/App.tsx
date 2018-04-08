import * as React from 'react';
import '../styles/App.css';
import '../styles/Options.css';
import Clock from './Clock';
import ClockOptions from './ClockOptions';
import Spinner from './Spinner';
import 'font-awesome/css/font-awesome.min.css';


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
  tempSecondBreak: number,
  isPaused: boolean,
  showOptions: boolean,
  tempRepeats: number,
  isStart: boolean;
}

type AppProps = {

}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { show: false, value: 0, hour: 0, minute: 0, seconds: 0, minuteBreak: 0, secondBreak: 0, repeats: 0, isBreak: false,
                  tempMin: 0, tempHour: 0, tempSecond: 0, tempMinuteBreak: 0, tempSecondBreak: 0,
                  isPaused: false, showOptions: false, tempRepeats: 0, isStart: false
                  }
  }
 
  handleNonIntInput = (input: any) => {
    if (!isNaN(input)) {
      return input;
    }
    return 0;
  }
  handleOpenNav = () => this.setState({ show: true });
  handleCloseNav = () => this.setState({ show: false });
  handleSetHour = (event: any) => {
    let hourInput = this.handleNonIntInput(event.target.value);
    this.setState({ hour: hourInput, tempHour: hourInput, value: 0 });
  }
  handleSetMinute = (event: any) => {
    let minuteInput = this.handleNonIntInput(event.target.value);
    this.setState({ minute: minuteInput, tempMin: minuteInput, value: 0 });
  }
  handleSetSeconds = (event: any) => { 
    let secondInput = this.handleNonIntInput(event.target.value);
    this.setState({ seconds: secondInput, tempSecond: secondInput, value: 0 });
  };
  handleSetMinuteBreak = (event: any) => { 
    let minuteBreakInput = this.handleNonIntInput(event.target.value);
    this.setState({ minuteBreak: minuteBreakInput, tempMinuteBreak: minuteBreakInput });
  }
  handleSetSecondsBreak = (event: any) => { 
    let secondBreakInput = this.handleNonIntInput(event.target.value);
    this.setState({ secondBreak: secondBreakInput, tempSecondBreak: secondBreakInput });
  }
  handleSetRepeats = (event: any) => { 
    let repeatsInput = this.handleNonIntInput(event.target.value);
    this.setState({ repeats: repeatsInput, tempRepeats: repeatsInput });
  };

  handleTick = () => {
    if (!this.state.isPaused) {
      if (this.state.value === 0) {
          this.handleClearTimer();
          this.handleStartTimer();
      } else if (!this.state.isBreak) {
          this.setState({ value: this.state.value - 1, tempSecond: this.state.value - 1, isStart: true });       
      }    
      else if (this.state.isBreak) {
          this.setState({ value: this.state.value - 1, tempSecondBreak: this.state.value - 1 });     
      }
    }
  }

  handleClearTimer = () => {
      //@ts-ignore
      clearInterval(this.interval);
  }

  handlePause = () => {
      //if it's paused, then start
      if (this.state.isPaused == true) {
        this.handleStartTimer();
      }

      //if it's start, then pause
      else {
        this.setState({ isPaused: true, isStart: false });
        this.handleClearTimer();
      }
  }

  handleReset = () => {
    this.setState({ 
      show: false, value: 0, hour: 0, minute: 0, seconds: 0, minuteBreak: 0, secondBreak: 0, repeats: 0, isBreak: false,
      tempMin: 0, tempHour: 0, tempSecond: 0, tempMinuteBreak: 0, tempSecondBreak: 0,
      isPaused: false, showOptions: false, tempRepeats: 0, isStart: false
    });
    this.handleClearTimer();
  }

  handleRestart = () => {
    this.handleClearTimer();
    this.setState({
      tempHour: this.state.hour,
      tempMin: this.state.minute,
      tempSecond: this.state.seconds,
      tempMinuteBreak: this.state.minuteBreak,
      tempSecondBreak: this.state.secondBreak,
      tempRepeats: this.state.repeats,
      isPaused: false,
      isBreak: false,
      showOptions: false,
      isStart: false
    });    
  }

  handleTimeConvert = () => {
        //all the time has been exhausted, start break if there's any
        if (this.state.tempSecond < 1 && this.state.tempMin < 1 && this.state.tempHour < 1) {
            this.handleBreaks();
            this.setState({ isBreak: true, isStart: false })
        }
        if (this.state.tempSecond > 0) {
          this.setState({ value: this.state.tempSecond });
         }
        else if (this.state.tempMin > 0) {
          this.setState({ 
                          value: 60,
                          tempSecond: 60,
                          tempMin: this.state.tempMin - 1
                           });
        }
        else if (this.state.tempHour > 0) {
          this.setState({                                 
                          value: 60,
                          tempHour: this.state.tempHour - 1,
                          tempMin: 59,
                          tempSecond: 60,
                          });           
        }
      //if there's no time or no break left, check for repeats
        else if (this.state.tempRepeats > 0 && this.state.tempSecondBreak < 1 && this.state.tempMinuteBreak < 1) {
          this.setState({ 
            tempRepeats: this.state.tempRepeats - 1,
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

  handleStartTimer = () => { 
      this.handleCloseNav();

      //this check will allow minutes and hours to be converted to seconds for countdown
      if (this.state.value < 1) {
          this.handleTimeConvert();
      }
      this.setState({ isPaused: false, showOptions: true })
      
      //@ts-ignore
      this.interval = setInterval(this.handleTick, 1000);         
  }
  render() {
    return (
        <div className={this.state.isStart ? "App-start" : "App"}>
          <Spinner isStart={this.state.isStart} />
          <Clock hour={this.state.tempHour} 
          minute={this.state.tempMin}
          seconds={this.state.tempSecond} 
          minuteBreak={this.state.tempMinuteBreak} 
          secondBreak={this.state.tempSecondBreak} 
          repeats={this.state.repeats} 
          handleStartTimer={this.handleStartTimer}
          isBreak={this.state.isBreak}
          handlePause={this.handlePause}
          isPaused={this.state.isPaused}
          showOptions={this.state.showOptions}
          onReset={this.handleReset}
          onRestart={this.handleRestart}
          remainingRepeats={this.state.tempRepeats}
          />
          <ClockOptions 
          hour={this.state.hour} 
          minute={this.state.minute}
          seconds={this.state.seconds} 
          minuteBreak={this.state.minuteBreak} 
          secondBreak={this.state.tempSecondBreak} 
          repeats={this.state.repeats} 
          navOpen={this.state.show} 
          navClose={this.handleCloseNav}
          handleSetHour={this.handleSetHour}
          handleSetMinute={this.handleSetMinute}
          handleSetSeconds={this.handleSetSeconds}
          handleSetMinuteBreak={this.handleSetMinuteBreak}
          handleSetSecondsBreak={this.handleSetSecondsBreak}
          handleSetRepeats={this.handleSetRepeats}
          />
          <div id="handleOpenNav" onClick={this.handleOpenNav} className={this.state.showOptions ? "hidden" : ""}><i className="fa fa-gear"></i> 
          Settings
          </div>
      </div>
    );
  }
}
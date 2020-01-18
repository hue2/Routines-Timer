import * as React from 'react';
import '../styles/App.css';
import '../styles/Options.css';
import Clock from './Clock';
import ClockOptions from './ClockOptions';
import Spinner from './Spinner';
import 'font-awesome/css/font-awesome.min.css';
import { ITimeInfo, ITimeBreak, ITimeRepeat } from './TimeType';

type AppState = {
  show: boolean,
  time: ITimeInfo,
  timeBreak:  ITimeBreak,
  repeats: ITimeRepeat,
  value: number,
  isBreak?: boolean,
  //using temp variables to store the values so if there's a repeat, we can start over using the values we already saved
  tempBreak: ITimeBreak,
  isPaused: boolean,
  showOptions: boolean,
  tempRepeats: number,
  isStart: boolean;
}

type AppProps = {

}

const defaultTime: ITimeInfo = {
  hour: 0,
  minute: 0,
  second: 0,
  tempHour: 0,
  tempMinute: 0,
  tempSecond: 0,
}

const defaultBreak: ITimeBreak = {
  minuteBreak: 0,
  secondBreak: 0,
  tempMinuteBreak: 0,
  tempSecondBreak: 0,
}

const defaultRepeat: ITimeRepeat = {
  repeat: 0,
  tempRepeat: 0,
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { show: false, value: 0, 
        time: {...defaultTime},
        timeBreak: {...defaultBreak},
        repeats: {...defaultRepeat}, 
        isBreak: false,           
        tempBreak: {...defaultBreak},
        isPaused: false, 
        showOptions: false, 
        tempRepeats: 0, 
        isStart: false
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
  
  handleInputChange = (event: any) => {
    let currentState = {...this.state[event.target.id]};
    event.target.classList.forEach((value, key, listObj) => {
      currentState[value] = this.handleNonIntInput(event.target.value);
    });
    this.setState({ [event.target.id]: currentState } as Pick<AppState, keyof AppState>);
  }

  handleTick = () => {
    if (!this.state.isPaused) {
      if (this.state.value === 0) {
          this.handleClearTimer();
          this.handleStartTimer();
      } else if (!this.state.isBreak) {
          this.setState({ value: this.state.value - 1, 
            time: {...this.state.time, tempSecond: this.state.value - 1 }, isStart: true });       
      }    
      else if (this.state.isBreak) {
          this.setState({ value: this.state.value - 1, timeBreak: {...this.state.timeBreak, tempSecondBreak: this.state.value - 1 } });     
      }
    }
  }

  handleClearTimer = () => {
      //@ts-ignore
      clearInterval(this.interval);
  }

  handlePause = () => {
      //if it's currently paused, then start
      if (this.state.isPaused == true) {
        this.handleStartTimer();
      }

      //if it's currently start, then pause
      else {
        this.setState({ isPaused: true, isStart: false });
        this.handleClearTimer();
      }
  }

  handleReset = () => {
    this.setState({ 
        time: {...defaultTime},
        timeBreak: {...defaultBreak},
        repeats: {...defaultRepeat}, 
        isBreak: false,           
        tempBreak: {...defaultBreak},
        isPaused: false, 
        showOptions: false, 
        tempRepeats: 0, 
        isStart: false,
        show: false, 
        value: 0,
    });
    this.handleClearTimer();
  }

  handleRestart = () => {
    this.handleClearTimer();

    this.setState({
      time: {...this.state.time, 
        tempHour: this.state.time.hour,
        tempMinute: this.state.time.minute,
        tempSecond: this.state.time.second
      },
      timeBreak: {...this.state.timeBreak,
        tempMinuteBreak: this.state.timeBreak.minuteBreak,
        tempSecondBreak: this.state.timeBreak.secondBreak
      },
      repeats: {...this.state.repeats,
        tempRepeat: this.state.repeats.repeat
      },
      isPaused: false,
      isBreak: false,
      showOptions: false,
      isStart: false,
      value: 0
    });    
  }

  checkConditions = () => ({
      isBreak: this.state.time.tempSecond < 1 && this.state.time.tempMinute < 1 && this.state.time.tempHour < 1,
      hasSeconds: this.state.time.tempSecond > 0,
      hasMinutes: this.state.time.tempMinute > 0,
      hasHours: this.state.time.tempHour > 0,
      hasRepeats: this.state.repeats.tempRepeat > 0 && this.state.timeBreak.tempSecondBreak < 1 && this.state.timeBreak.tempMinuteBreak < 1    
  });

  setTime = (time: ITimeInfo) => {
    this.setState({ 
      value: 59,
      time,
    });
  }

  handleTimeConvert = () => {
        let currentStatus = this.checkConditions();
        //all the time has been exhausted, start break if there's any
        if (currentStatus.isBreak) {
          this.handleBreaks();
          this.setState({ isBreak: true, isStart: false })
        }

        if (currentStatus.hasSeconds) {
          this.setState({ value: this.state.time.tempSecond });
         }
        else if (currentStatus.hasMinutes) {
          this.setTime({...this.state.time, 
            tempSecond: 59, 
            tempMinute: this.state.time.tempMinute - 1 });
        }
        else if (currentStatus.hasHours) {
          this.setTime({...this.state.time, 
            tempMinute: 59, tempSecond: 59, 
            tempHour: this.state.time.tempHour - 1});
        }

        //if there's no time or no break left, check for repeats
        else if (currentStatus.hasRepeats) {
          this.setState({ 
            repeats: {...this.state.repeats, 
              tempRepeat: this.state.repeats.tempRepeat - 1 },
            time: {...this.state.time, 
              tempMinute: this.state.time.minute, 
              tempSecond: this.state.time.second, 
              tempHour: this.state.time.hour},
            timeBreak: {...this.state.timeBreak, 
              tempMinuteBreak: this.state.timeBreak.minuteBreak, 
              tempSecondBreak: this.state.timeBreak.secondBreak },
            value: this.state.time.second,
            isBreak: false
          });
    }
  }

  handleBreaks = () => {
        if (this.state.timeBreak.tempSecondBreak > 0) {
            this.setState({ value: this.state.timeBreak.tempSecondBreak });
        }
        else if (this.state.timeBreak.tempMinuteBreak > 0) {
          let timeBreak = {...this.state.timeBreak, tempMinuteBreak: this.state.timeBreak.tempMinuteBreak - 1 };
          this.setState({ 
            timeBreak: timeBreak,
            value: 59 
          });
        }
  }

  handleStartTimer = () => { 
      this.handleCloseNav();

      //this check will allow minutes and hours to be converted to seconds for countdown
      if (this.state.value < 1) {
          this.handleTimeConvert();
      }
      this.setState({ isPaused: false, showOptions: true })

      if (this.state.time.tempHour > 0 || this.state.time.tempMinute > 0 || this.state.time.second > 0 || 
        this.state.repeats.tempRepeat > 0 || this.state.timeBreak.tempSecondBreak > 0) {
        //@ts-ignore
        this.interval = setInterval(this.handleTick, 1000);      
      }
  }

  render() {
    return (
        <div className={this.state.isStart ? "App-start" : "App"}>
          <Spinner isStart={this.state.isStart} />
          <Clock hour={this.state.time.tempHour} 
            minute={this.state.time.tempMinute}
            seconds={this.state.time.tempSecond} 
            minuteBreak={this.state.timeBreak.tempMinuteBreak} 
            secondBreak={this.state.timeBreak.tempSecondBreak} 
            repeats={this.state.repeats.repeat} 
            handleStartTimer={this.handleStartTimer}
            isBreak={this.state.isBreak}
            handlePause={this.handlePause}
            isPaused={this.state.isPaused}
            showOptions={this.state.showOptions}
            onReset={this.handleReset}
            onRestart={this.handleRestart}
            remainingRepeats={this.state.repeats.tempRepeat}
          />
          <ClockOptions 
            hour={this.state.time.hour} 
            minute={this.state.time.minute}
            seconds={this.state.time.second} 
            minuteBreak={this.state.timeBreak.minuteBreak} 
            secondBreak={this.state.timeBreak.tempSecondBreak} 
            repeats={this.state.repeats.repeat} 
            navOpen={this.state.show} 
            navClose={this.handleCloseNav}
            handleChange={this.handleInputChange}
          />
          <div id="handleOpenNav" onClick={this.handleOpenNav} className={this.state.showOptions ? "hidden" : ""}><i className="fa fa-gear"></i> 
          Settings
          </div>
      </div>
    );
  }
}
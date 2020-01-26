import * as React from 'react';
import '../styles/App.css';
import '../styles/Options.css';
import Clock from './Clock';
import ClockOptions from './ClockOptions';
import Spinner from './Spinner';
import 'font-awesome/css/font-awesome.min.css';
import { ITimeInfo, ITimeBreak, ITimeRepeat, AppProps, AppState } from './TimeType';

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
        isStart: false,
        notify: false,
      }
  }
 
  handleNonIntInput = (input: any) => {
    if (!isNaN(input)) {
      return input.length < 2 ? +("0" + input) : +input ;
    }
    return 0;
  }

  handleOpenNav = () => this.setState({ show: true });
  handleCloseNav = () => this.setState({ show: false });
  
  handleInputChange = (event: any) => {
    let currentState = {...this.state[event.target.dataset.state]};
    event.target.classList.forEach((value, key, listObj) => {
      currentState[value] = this.handleNonIntInput(event.target.value);
    });  
    this.setState({ [event.target.dataset.state]: currentState } as Pick<AppState, keyof AppState>);
  }

  handleStartTick = () => {
    if (!this.state.isPaused) {
      this.handleTimerTick();
    }
  }

  handleClearTimer = () => {
      //@ts-ignore
      clearInterval(this.interval);
  }

  handlePause = () => {
      //if it's currently paused, then start
      if (this.state.isPaused == true) {
        this.handleTimerTick();
        this.handleStartTimer();
      }

      //if it's currently start, then pause
      else {
        this.setState({ isPaused: true, isStart: false });
        this.handleClearTimer();
      }
  }

  handleTimerTick = () => {
    if (this.state.value === -1) {
      this.handleClearTimer();
      this.handleStartTimer();
    } else if (!this.state.isBreak) {
      this.setState({ notify: false });
      this.parseTime();    
    }    
    else if (this.state.isBreak) {
      this.setState({ notify: false });
      this.parseBreakTime();     
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
        notify: false,
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
      value: 0,
      notify: false,
    });    
  }

  checkConditions = () => ({
      isBreak: this.state.time.tempSecond < 1 && this.state.time.tempMinute < 1 && this.state.time.tempHour < 1 && !this.state.isBreak,
      hasTime: this.state.time.tempSecond > 0 || this.state.time.tempMinute > 0 || this.state.time.tempHour > 0,
      hasBreaks: this.state.timeBreak.secondBreak > 0 || this.state.timeBreak.minuteBreak > 0,
      hasRepeats: this.state.repeats.tempRepeat > 0 && this.state.timeBreak.tempSecondBreak < 1 && this.state.timeBreak.tempMinuteBreak < 1    
  });


  parseBreakTime = () => {
    let totalSeconds = this.state.value < 0 && (this.state.timeBreak.tempSecondBreak >= 1 || this.state.timeBreak.tempMinuteBreak >= 1) ? 
      +this.state.timeBreak.tempSecondBreak + (this.state.timeBreak.tempMinuteBreak * 60) : this.state.value;
    let seconds = totalSeconds % 60;
    let minAndHourInMinutes = (totalSeconds - seconds) / 60;
    var minutes = minAndHourInMinutes % 60;
  
    let timeBreak = {...this.state.timeBreak, 
      tempMinuteBreak: this.handleNumberFormat(minutes), 
      tempSecondBreak: this.handleNumberFormat(seconds) }
    this.setState({ value: totalSeconds - 1, timeBreak, isBreak: true, isStart: false });
  }

  parseTime = () => {
    let totalSeconds = this.state.value <= 0 && (this.state.time.tempSecond > 1 || 
      this.state.time.tempMinute >= 1 || this.state.time.tempHour >= 1) ? 
      +this.state.time.tempSecond + (this.state.time.tempMinute * 60) + (this.state.time.tempHour * 3600) : this.state.value;
    let seconds = totalSeconds % 60;
    let minAndHourInMinutes = (totalSeconds - seconds) / 60;
    var minutes = minAndHourInMinutes % 60;
    let hour = (minAndHourInMinutes - minutes) / 60;  
  
    let time = {...this.state.time, 
            tempMinute: this.handleNumberFormat(minutes), 
            tempSecond: this.handleNumberFormat(seconds), 
            tempHour: this.handleNumberFormat(hour) };
    this.setState({  value: totalSeconds - 1, time, isStart: true });
  }


  handleNumberFormat = (time: number) => {
      return time.toString().length < 2 ? +("0" + time) : +time;
  }

  handleTimeConvert = () => {
        let currentStatus = this.checkConditions();
        //all the time has been exhausted, start break if there's any
        if (currentStatus.isBreak && currentStatus.hasBreaks) {
            this.parseBreakTime();
            this.setState({ notify: true });
        }
        else {
          this.setState({ isBreak: false });
          if (!currentStatus.hasTime) {
            this.setState({ isStart: false, notify: currentStatus.hasRepeats ? false : true  });
          }
        }

        if (currentStatus.hasTime) {
          this.parseTime();
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
            isBreak: false
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

      if (this.state.time.tempHour > 0 || this.state.time.tempMinute > 0 || this.state.time.tempSecond > 0 || 
        this.state.repeats.tempRepeat > 0 || this.state.timeBreak.tempSecondBreak > 0 || this.state.timeBreak.tempMinuteBreak > 0) {    
          //@ts-ignore
        this.interval = setInterval(this.handleStartTick, 1000);      
      }
  }

  render() {
    return (
      <div id="main">
          <div id="clock-background">

          </div>
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
              notify={this.state.notify}
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
            <div id="handleOpenNav" data-testid="settings-btn" onClick={this.handleOpenNav} className={this.state.showOptions ? "hidden" : ""}><i className="fa fa-gear"></i> 
              Settings
            </div>
        </div>
        <div id="footer">
          Image by <a href="https://pixabay.com/users/moinzon-2433302/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1412683" className="footer-link">Michi S</a> from 
             &nbsp;<a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1412683" className="footer-link">Pixabay</a>
        </div>
      </div>
    );
  }
}
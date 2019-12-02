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
          let time = {...this.state.time};
          time.tempSecond = this.state.value - 1;
          this.setState({ value: this.state.value - 1, time: time, isStart: true });       
      }    
      else if (this.state.isBreak) {
          let timeBreak = {...this.state.timeBreak};
          timeBreak.tempSecondBreak = this.state.value - 1;
          this.setState({ value: this.state.value - 1, timeBreak: timeBreak });     
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
    let time = {...this.state.time};
    time.tempHour = time.hour;
    time.tempMinute = time.minute;
    time.tempSecond = time.second;
    let timeBreak = {...this.state.timeBreak};
    timeBreak.tempMinuteBreak = timeBreak.minuteBreak;
    timeBreak.tempSecondBreak = timeBreak.secondBreak;
    
    let repeats = {...this.state.repeats};
    repeats.tempRepeat = repeats.repeat;

    this.setState({
      time: time,
      timeBreak: timeBreak,
      repeats: repeats,
      isPaused: false,
      isBreak: false,
      showOptions: false,
      isStart: false
    });    
  }

  handleTimeConvert = () => {
        //all the time has been exhausted, start break if there's any
        if (this.state.time.tempSecond < 1 && this.state.time.tempMinute < 1 && this.state.time.tempHour < 1) {
            this.handleBreaks();
            this.setState({ isBreak: true, isStart: false })
        }
        if (this.state.time.tempSecond > 0) {
          this.setState({ value: this.state.time.tempSecond });
         }
        else if (this.state.time.tempMinute > 0) {
          let time = {...this.state.time};
          time.tempSecond = 59;
          time.tempMinute = time.tempMinute - 1;

          this.setState({ 
            value: 59,
            time: time,
          });
        }
        else if (this.state.time.tempHour > 0) {
          let time2 = {...this.state.time};
          time2.tempMinute = 59;
          time2.tempSecond = 59;
          time2.tempHour = time2.tempHour - 1;
          this.setState({                                 
            value: 59,
            time: time2,
          });           
        }
    //   //if there's no time or no break left, check for repeats
        else if (this.state.repeats.tempRepeat > 0 && this.state.timeBreak.tempSecondBreak < 1 && this.state.timeBreak.tempMinuteBreak < 1) {
          let repeat = {...this.state.repeats};
          repeat.tempRepeat = repeat.tempRepeat - 1;
          
          let time = {...this.state.time};
          time.tempMinute = time.minute;
          time.tempSecond = time.second;
          time.tempHour = time.hour;
          
          let timeBreak = {...this.state.timeBreak};
          timeBreak.tempMinuteBreak = timeBreak.minuteBreak;
          timeBreak.tempSecondBreak = timeBreak.secondBreak;
        
          this.setState({ 
            repeats: repeat,
            //tempRepeats: this.state.tempRepeats - 1,
            time: time,
            timeBreak: timeBreak,
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
          let timeBreak = {...this.state.timeBreak};
          timeBreak.tempMinuteBreak = timeBreak.tempMinuteBreak - 1;
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
      console.log(this.state.time);

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
import 'font-awesome/css/font-awesome.min.css';
import * as React from 'react';
import { handleInput } from '../helpers/Helper';
import { getDisplayBreakTime, getDisplayTime, getTotalBreakSeconds, getTotalSeconds } from '../helpers/TimeHelper';
import '../styles/App.css';
import '../styles/Options.css';
import Clock from './Clock';
import ClockOptions from './ClockOptions';
import Spinner from './Spinner';
import StartButton from './StartButton';
import TimerOption from './TimerOptions';
import { AppProps, AppState, ITimeBreak, ITimeInfo, ITimeRepeat } from './TimeType';

const defaultTime: ITimeInfo = {
  hour: 0,
  minute: 0,
  second: 0,
}

const defaultBreak: ITimeBreak = {
  minuteBreak: 0,
  secondBreak: 0,
}

const defaultRepeat: ITimeRepeat = {
  repeat: 0,
  tempRepeat: 0,
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { 
        show: false, 
        value: 0, 
        time: {...defaultTime},
        timeBreak: {...defaultBreak},
        repeats: {...defaultRepeat}, 
        isBreak: false,           
        isPaused: false, 
        showOptions: false, 
        tempRepeats: 0, 
        isStart: false,
        notify: false,
      }
  }


  toggleNav = (hide : null | boolean = null) => { 
    this.setState({ show: hide ? false : !this.state.show })  
  };
  
  handleInputChange = (event: any) => {
    let currentState = handleInput({...this.state[event.target.dataset.state]}, event);
    this.setState({ [event.target.dataset.state]: currentState } as Pick<AppState, keyof AppState> );
  }

  handleTimeInput = (event: any) => {
    let time = handleInput({...this.state.time}, event);
    let totalSeconds = getTotalSeconds(time);
    this.setState({ value: totalSeconds, time: time });
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
    if (this.state.value === 0) {
      this.handleClearTimer();
      this.handleStartTimer();
    } 
    else {
      this.setState({ notify: false, value: this.state.value - 1 });
    }    
  }

  handleReset = () => {
    this.setState({ 
        time: {...defaultTime},
        timeBreak: {...defaultBreak},
        repeats: {...defaultRepeat}, 
        isBreak: false,           
        isPaused: false, 
        showOptions: false, 
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
      value: getTotalSeconds(this.state.time),
      repeats: {...this.state.repeats,
        tempRepeat: this.state.repeats.repeat
      },
      isPaused: false,
      isBreak: false,
      showOptions: false,
      isStart: false,
      notify: false,
    });    
  }

  checkConditions = () => ({
      isBreak: this.state.value < 1 && !this.state.isBreak, 
      hasTime: this.state.value > 0,
      hasBreaks: this.state.timeBreak.secondBreak > 0 || this.state.timeBreak.minuteBreak > 0,
      hasRepeats: this.state.repeats.tempRepeat > 0 && this.state.value < 1,    
  });

  handleTimeConvert = () => {
        let currentStatus = this.checkConditions();
        //all the time has been exhausted, start break if there's any
        if (currentStatus.isBreak && currentStatus.hasBreaks) {
            this.setState({ 
              notify: true, 
              value: getTotalBreakSeconds(this.state.timeBreak),
              isBreak: true,
            });
        }
        else {
          this.setState({ isBreak: false });
          if (!currentStatus.hasTime) {
            this.setState({ 
              isStart: false, 
              notify: currentStatus.hasRepeats ? false : true  
            });

            if (currentStatus.hasRepeats) {
              this.setState({ 
                repeats: {...this.state.repeats, 
                  tempRepeat: this.state.repeats.tempRepeat - 1 },
                value: getTotalSeconds(this.state.time),
                isBreak: false
              });
            }
          }        
        }     
  }

  handleStartTimer = () => { 
      //this check will allow minutes and hours to be converted to seconds for countdown
      if (this.state.value < 1) {
          this.handleTimeConvert();
      }
      this.setState({ isPaused: false, showOptions: true })

      if (this.state.value > 0) {  
        this.setState({ isStart: true });
        this.toggleNav(true);
          //@ts-ignore
        this.interval = setInterval(this.handleStartTick, 1000);      
      }
  }

  render() {
    const { second, minute, hour } = this.state.time;
    const isStartDisabled = second < 1 && minute < 1 && hour < 1;
    const time = this.state.isBreak ? getDisplayBreakTime(this.state.value) : getDisplayTime(this.state.value);

    return (
      <div id="main">
          <div id="clock-background">
          </div>
          <div className={this.state.isStart ? "App-start" : "App"}>
            <Spinner isStart={this.state.isStart && !this.state.isBreak} />
            <Clock 
              time={time}
              isBreak={this.state.isBreak}
              repeats={this.state.repeats.repeat}
              notify={this.state.notify}
              remainingRepeats={this.state.repeats.tempRepeat}
              showOptions={this.state.showOptions}
            />
            
            <StartButton 
              onStart={this.handleStartTimer}
              isShow={!this.state.showOptions}
              isDisabled={isStartDisabled}
            />

            <TimerOption
              isShow={this.state.showOptions}
              onReset={this.handleReset}
              onRestart={this.handleRestart}
              onPause={this.handlePause}
              isPaused={this.state.isPaused}
            />
              
            <ClockOptions 
              time={this.state.time}             
              breakTime={this.state.timeBreak} 
              repeats={this.state.repeats.repeat} 
              navOpen={this.state.show} 
              toggleNav={this.toggleNav}           
              handleChange={this.handleInputChange}
              handleTimeChange={this.handleTimeInput}
            />
            <div id="handleOpenNav" data-testid="settings-btn" onClick={() => this.toggleNav()} className={this.state.showOptions ? "hidden" : ""}><i className="fa fa-gear"></i> 
              Adjust Time
            </div>
        </div>
        <div id="footer">
          Image by <a href="https://pixabay.com/users/moinzon-2433302/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1412683" className="footer-link">Michi S</a> from 
             &nbsp;<a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1412683" className="footer-link">Pixabay</a>
          <br />
          <br />
          See the project on <a href="https://github.com/hue2/Routines-Timer" className="footer-link">Github</a>
        </div>
      </div>
    );
  }
}
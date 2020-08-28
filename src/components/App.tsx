import * as React from 'react';
import { handleInput, getCurrentClockStatus } from '../helpers/Helper';
import Clock from './Clock';
import ClockOptions from './ClockOptions';
import Spinner from './display_components/Spinner';
import Footer from './display_components/Footer';
import StartButton from './StartButton';
import ControlPanel from './ControlPanel';
import { AppState } from './TimeType';
import { getDisplayBreakTime, getDisplayTime, getTotalBreakSeconds, getTotalSeconds } from '../helpers/TimeHelper';
import { defaultBreak, defaultRepeat, defaultTime, defaultUIOptions } from './DefaultStates';

import '../styles/Site.css';
import Volume from './Volume';

export default class App extends React.Component<{}, AppState> {
  state = { 
      showNavbar: false, 
      value: 0, 
      time: {...defaultTime},
      timeBreak: {...defaultBreak},
      repeats: {...defaultRepeat}, 
      isBreak: false,           
      isPaused: false, 
      showOptions: false, 
      isStart: false,
      notify: false,    
      tempRepeat: 0,
      isMuted: false,
      volume: 0.5
    }

  toggleNav = (hide : null | boolean = null) => { 
    this.setState({ showNavbar: hide ? false : !this.state.showNavbar });  
  };

  toggleVolume = () => { 
    this.setState({ isMuted: !this.state.isMuted });
  };

  setVolume = (event : any) => {
    this.setState({ volume: event.target.value });
  }
  
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
      if (this.state.isPaused == true) {
        this.handleTimerTick();
        this.handleStartTimer();
      }

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
        ...defaultUIOptions,
        time: {...defaultTime},
        timeBreak: {...defaultBreak},
        repeats: {...defaultRepeat},     
        value: 0,
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
      ...defaultUIOptions,
    });    
  }

  handleTimeConvert = () => {
        let currentStatus = getCurrentClockStatus(this.state);

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
    const shouldNotify = this.state.notify && !this.state.isMuted;

    return (
      <div id="main">
          <div id="clock-background">
          </div>
          <div className={this.state.isStart ? "App-start" : "App"}>
            <Volume 
              toggleVolume={this.toggleVolume} 
              isMuted={this.state.isMuted} 
              notify={shouldNotify}
              volume={this.state.volume}
              setVolume={this.setVolume}
            />

            <Spinner isStart={this.state.isStart && !this.state.isBreak} />

            <Clock 
              time={time}
              isBreak={this.state.isBreak}
              repeats={this.state.repeats.repeat}
              remainingRepeats={this.state.repeats.tempRepeat}
              showOptions={this.state.showOptions}
            />
            
            <StartButton 
              onStart={this.handleStartTimer}
              isShow={!this.state.showOptions}
              isDisabled={isStartDisabled}
            />

            <ControlPanel
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
              navOpen={this.state.showNavbar} 
              toggleNav={this.toggleNav}           
              handleChange={this.handleInputChange}
              handleTimeChange={this.handleTimeInput}
            />
            <div id="settings-btn" data-testid="settings-btn" onClick={() => this.toggleNav()} className={this.state.showOptions ? "hidden" : ""}><i className="fa fa-gear"></i> 
              Adjust Time
            </div>
        </div>
       <Footer />
      </div>
    );
  }
}
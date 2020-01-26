export interface ITimeInfo {
    hour: number,
    minute: number,
    second: number,
    tempHour: number,
    tempMinute: number,
    tempSecond: number,
}


export interface ITimeBreak {
    minuteBreak: number,
    secondBreak: number,
    tempMinuteBreak: number,
    tempSecondBreak: number,
}

export interface ITimeRepeat {
    repeat: number,
    tempRepeat: number,
}

export type AppState = {
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
    notify: boolean;
  }
  
export type AppProps = {
  
}
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

export type TimeProps = {
    value?: number,
    hour: number,
    minute: number,
    seconds: number,
    minuteBreak: number,
    secondBreak: number,
    repeats: number,
    handleStartTimer: () => void,
    isBreak?: boolean,
    handlePause: () => void,
    isPaused?: boolean,
    showOptions: boolean,
    onReset: () => void,
    onRestart: () => void,
    remainingRepeats?: number,
    notify: boolean,
};


export type ClockOptionsState = {
    show: boolean,
    closeModal?: () => void;
    maxLength: number,
}

export type ClockOptionsProps = {
    navOpen: boolean,
    navClose: () => void,
    handleChange: (event: any) => void,
    hour: number,
    minute: number,
    seconds: number,
    minuteBreak: number,
    secondBreak: number,
    repeats: number
}


export type SpinnerProps = {
    isStart: boolean;
}

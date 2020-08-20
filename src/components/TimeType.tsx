export interface ITimeInfo {
    hour: number,
    minute: number,
    second: number,
}

export interface ITimeBreak {
    minuteBreak: number,
    secondBreak: number,
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
    isPaused: boolean,
    showOptions: boolean,
    tempRepeats: number,
    isStart: boolean;
    notify: boolean;
  }
  
export type AppProps = {
  
}

export type TimeProps = {
    time: string,
    repeats: number,
    isBreak?: boolean,
    showOptions: boolean,
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
    handleChange: (event: any) => void,
    handleTimeChange: (event: any) => void,
    toggleNav: () => void,
    time: ITimeInfo,
    breakTime: ITimeBreak,
    repeats: number
}


export type SpinnerProps = {
    isStart: boolean;
}
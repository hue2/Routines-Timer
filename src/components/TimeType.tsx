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

export interface AppState {
    showNavbar: boolean,
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



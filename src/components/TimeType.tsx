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
    isStart: boolean;
    notify: boolean;
    isMuted: boolean;
    volume: number,
    tempRepeat: number,
}



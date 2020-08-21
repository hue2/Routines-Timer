import { ITimeRepeat, ITimeBreak, ITimeInfo } from "./TimeType"

export const defaultTime: ITimeInfo = {
    hour: 0,
    minute: 0,
    second: 0,
}
  
export const defaultBreak: ITimeBreak = {
    minuteBreak: 0,
    secondBreak: 0,
}
  
export const defaultRepeat: ITimeRepeat = {
    repeat: 0,
    tempRepeat: 0,
}
  
export const defaultUIOptions = {
    showNavbar: false, 
    isBreak: false,           
    isPaused: false, 
    showOptions: false, 
    isStart: false,
    notify: false,
}
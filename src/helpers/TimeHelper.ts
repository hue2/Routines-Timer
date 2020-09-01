import { ITimeInfo, ITimeBreak } from "../components/TimeType";

export function formatTime(time : ITimeInfo){
    return `${formatTwoDigits(time.hour)}:${formatTwoDigits(time.minute)}:${formatTwoDigits(time.second)}`;
}

export function formatBreakTime(time : ITimeBreak) {
    return `${formatTwoDigits(time.minuteBreak)}:${formatTwoDigits(time.secondBreak)}`;
}

export function convertTimeToSeconds(time: ITimeInfo) {
    return time.second + (time.minute * 60) + (time.hour * 3600);
}

export function convertBreakTimeToSeconds(time: ITimeBreak) {
    return time.secondBreak + (time.minuteBreak * 60);
}

export function getDisplayTime(value: number) {
    let seconds = value % 60;
    let minAndHourInMinutes = (value - seconds) / 60;
    var minutes = minAndHourInMinutes % 60;
    let hour = (minAndHourInMinutes - minutes) / 60;  
    
    return `${formatTwoDigits(hour)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
}

export function getDisplayBreakTime(value: number) {
    let seconds = value % 60;
    let minAndHourInMinutes = (value - seconds) / 60;
    var minutes = minAndHourInMinutes % 60;
    
    return `${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`;
}

function formatTwoDigits(time : number) {
    return (time < 10 ? '0' : '') + time;
}


import { ITimeInfo, ITimeBreak } from "../TimeType"
import { formatTime, formatBreakTime, convertTimeToSeconds, convertBreakTimeToSeconds, getDisplayTime, getDisplayBreakTime } from "../../helpers/TimeHelper";

describe('Time helper tests', () => {
    let time : ITimeInfo = {
        hour: 1,
        minute: 1,
        second: 2,
    };

    let breakTime: ITimeBreak = {
        minuteBreak: 5,
        secondBreak: 2,
    };

    it('should format time correctly', () => {
        let result = formatTime(time);
        expect(result).toBe('01:01:02');
    });

    it('should format break time correctly', () => {
        let result = formatBreakTime(breakTime);
        expect(result).toBe('05:02');
    });

    it('should get correct total seconds for time', () => {
        let result = convertTimeToSeconds(time);
        expect(result).toBe(3662);
    });

    it('should get correct total seconds for break time', () => {
        let result = convertBreakTimeToSeconds(breakTime);
        expect(result).toBe(302);
    });

    it('should get correct display time', () => {
        let result = getDisplayTime(3662);
        expect(result).toBe('01:01:02');
    });

    it('should get correct display time for 0 second', () => {
        let result = getDisplayTime(0);
        expect(result).toBe('00:00:00');
    });

    it('should get correct display time for break', () => {
        let result = getDisplayBreakTime(302);
        expect(result).toBe('05:02');
    });
})
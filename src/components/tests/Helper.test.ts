import { handleInput, getCurrentClockStatus } from "../../helpers/Helper";

describe('Helper tests', () => {
    let state = {
        apple: 1,
        watermelon: 2,
        value: 5,
        isBreak: true,
        timeBreak: {
            secondBreak: 1,
            minuteBreak: 0
        },
        repeats: {
            tempRepeat: 1,
        }
    }

    let event = {
        target: {
            classList: [ 'apple', 'watermelon'],
            value: 3,
        }
    }

    it('should return correct state', () => {
        let result = handleInput(state, event);
        expect(result.apple).toBe(3);
        expect(result.watermelon).toBe(3);
    });

    it('should return the correct clock status', () => {
        let status = getCurrentClockStatus(state);
        expect(status.startBreak).toBe(false);
        expect(status.hasBreaks).toBe(true);
        expect(status.hasRepeats).toBe(false);
    });
})
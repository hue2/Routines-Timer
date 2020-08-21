import { handleInput } from "../../helpers/Helper";

describe('Helper tests', () => {
    let state = {
        apple: 1,
        watermelon: 2,
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
    })
})
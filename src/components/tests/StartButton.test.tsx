import * as React from 'react';
import { shallow } from 'enzyme';
import StartButton from '../StartButton';

describe('StartButton tests', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            onStart: jest.fn(),
            isShow: true,
            isDisabled: false,
        };
        wrapper = shallow(
            <StartButton 
                {...props}
            />
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should not have the hidden class when isShow is true', () => {
        expect(wrapper.hasClass('hidden')).toBe(false);
    });

    it('should call onStart when start is clicked', () => {
        wrapper.find('#start-btn').simulate('click');
        expect(props.onStart).toHaveBeenCalledTimes(1);
    });

    it('should disable button when isDisabled is true', () => {
        wrapper = shallow(
            <StartButton 
                {...props}
                isDisabled={true}
            />
        );
        expect(wrapper.find('#start-btn').props()['disabled']).toBe(true);
    });
});
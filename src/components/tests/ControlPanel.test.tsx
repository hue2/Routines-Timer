import * as React from 'react';
import { shallow } from 'enzyme';
import ControlPanel from '../ControlPanel';

describe('TimerOptions tests', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            onReset: jest.fn(),
            onPause: jest.fn(),
            isPaused: false,
            onRestart: jest.fn(),
            isShow: true,
        };

        wrapper = shallow(
            <ControlPanel 
                {...props}
            />
        );
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should not be hidden when isShow is true', () => {
        expect(wrapper.hasClass('hidden')).toEqual(false);
    });

    it('should show pause button when isPaused is false', () => {
        expect(wrapper.find('#pause-btn')).toHaveLength(1);
    });

    it('should not show pause button when isPaused is true', () => {
        wrapper = shallow(
            <ControlPanel
                {...props}
                isPaused={true}
            />
        );
        expect(wrapper.find('#pause-btn')).toHaveLength(0);
    });

    it('should not show resume button when isPaused is false', () => {
        expect(wrapper.find('#resume-btn')).toHaveLength(0);
    });

    it('should show resume button when isPaused is true', () => {
        wrapper = shallow(
            <ControlPanel
                {...props}
                isPaused={true}
            />
        );
        expect(wrapper.find('#resume-btn')).toHaveLength(1);
    });

    it('should call onPause when pause is clicked', () => {
        wrapper.find('#pause-btn').simulate('click');
        expect(props.onPause).toHaveBeenCalledTimes(1);
    });

    it('should call onPause when resume is clicked', () => {
        wrapper = shallow(
            <ControlPanel
                {...props}
                isPaused={true}
            />
        );
        wrapper.find('#resume-btn').simulate('click');
        expect(props.onPause).toHaveBeenCalledTimes(1);
    });

    it('should call restart on restart click', () => {
        wrapper.find('#restart-btn').simulate('click');
        expect(props.onRestart).toHaveBeenCalledTimes(1);
    });

    it('should call reset on reset click', () => {
        wrapper.find('#reset-btn').simulate('click');
        expect(props.onReset).toHaveBeenCalledTimes(1);
    });

})

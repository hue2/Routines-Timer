import * as React from 'react';
import {shallow} from 'enzyme';
import ClockOptions from '../ClockOptions';
import * as renderer from 'react-test-renderer';

describe('Clock Options Tests', () => {
    let props;

    beforeEach(() => {
        props = {
            time: {
                hour: 1, 
                second: 1, 
                minute: 1
            },
            breakTime: {
                minuteBreak: 1,
                secondBreak: 1
            },
            repeats: 0,
            navOpen: true,
            toggleNav: jest.fn(),
            handleChange: jest.fn(),
            handleTimeChange: jest.fn(),
        }
    });

    it('component matches snapshot', () => {
        const tree = renderer.create(
            <ClockOptions 
                {...props}
            />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should close nav bar is when clicked on the x button', () => {
        const wrapper = shallow(<ClockOptions 
            {...props}
        />);
        wrapper.find('.closebtn').simulate('click');
        expect(props.toggleNav).toHaveBeenCalled();
    });

    it('should call handleTimeChange on time input', () => {
        const wrapper = shallow(<ClockOptions 
            {...props}
        />);

        wrapper.find('.hour').simulate('change', { target: { value: 1 } });    
        expect(props.handleTimeChange).toHaveBeenCalled();
    });

    it('should call handleChange on break time input', () => {
        const wrapper = shallow(<ClockOptions 
            {...props}
        />);

        wrapper.find('.minuteBreak').simulate('change', { target: { value: 1 } });    
        expect(props.handleChange).toHaveBeenCalled();
    });

    it('should call handleChange on repeat input', () => {
        const wrapper = shallow(<ClockOptions 
            {...props}
        />);

        wrapper.find('.repeat').simulate('change', { target: { value: 1 } });    
        expect(props.handleChange).toHaveBeenCalled();
    });
})
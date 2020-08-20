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

    it('nav bar is closed when clicked on the x button', () => {
        const wrapper = shallow(<ClockOptions 
            {...props}
        />);
        wrapper.find('.closebtn').simulate('click');
        expect(props.toggleNav).toHaveBeenCalled();
    });
})
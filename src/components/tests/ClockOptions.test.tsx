import * as React from 'react';
import {shallow} from 'enzyme';
import ClockOptions from '../ClockOptions';

it('nav bar is closed when clicked on the x button', () => {
    const closeNav = jest.fn();
    const wrapper = shallow( <ClockOptions 
        navOpen={true} 
        navClose={closeNav}
        setHour={() => {}}
        setMinute={() => {}}
        setSeconds={() => {}}
        setMinuteBreak={() => {}}
        setSecondsBreak={() => {}}
        setRepeats={() => {}}
        />);
    wrapper.find('.closebtn').simulate('click');
    expect(closeNav).toHaveBeenCalled();
});
import * as React from 'react';
import {shallow} from 'enzyme';
import ClockOptions from '../ClockOptions';

it('nav bar is closed when clicked on the x button', () => {
    const handleCloseNav = jest.fn();
    const wrapper = shallow( <ClockOptions 
        navOpen={true} 
        navClose={handleCloseNav}
        handleChange={() => {}}
        hour={0}
        minute={0}
        seconds={0}
        minuteBreak={0}
        secondBreak={0}
        repeats={0}
        />);
    wrapper.find('.closebtn').simulate('click');
    expect(handleCloseNav).toHaveBeenCalled();
});
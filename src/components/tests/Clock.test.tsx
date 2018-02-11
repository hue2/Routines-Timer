import * as React from 'react';
import {shallow} from 'enzyme';
import Clock from '../Clock';

it('time div reflects value from input', () => {
  const wrapper = shallow(<Clock hour={1}
    minute={1}
    seconds={1}
    minuteBreak={0}
    secondBreak={0}
    repeats={0}
    startTimer={() => {}} />);
  expect(wrapper.find("#time-countdown").text()).toBe("01: 01: 01");
})

it('clicking start button would start the timer', () => {
  const startTimer = jest.fn();
  const wrapper = shallow(<Clock hour={0}
    minute={0}
    seconds={0}
    minuteBreak={0}
    secondBreak={0}
    repeats={0}
    startTimer={startTimer} />);
  wrapper.find('#startTimer').simulate('click');
  expect(startTimer).toBeCalled();
})
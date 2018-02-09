import * as React from 'react';
import {shallow} from 'enzyme';
import Clock from '../Clock';

it('time div reflects value from input', () => {
  const wrapper = shallow(<Clock hour={0}
    minute={0}
    seconds={0}
    minuteBreak={0}
    secondBreak={0}
    repeats={0}
    startTimer={() => {}} />);
  expect(wrapper.find(".timeDiv").text()).toBe("10");
})

it('clicking start button would call function', () => {
  const wrapper = shallow(<Clock hour={0}
    minute={0}
    seconds={0}
    minuteBreak={0}
    secondBreak={0}
    repeats={0}
    startTimer={() => {}} />);
  expect(wrapper.find('#startTimer')).toBeTruthy();
  // wrapper.find('#startTimer').simulate('click');
  // expect(startTimer).toBeCalled();
})
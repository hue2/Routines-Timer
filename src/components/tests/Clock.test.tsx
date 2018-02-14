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
    startTimer={() => {}} 
    handlePause={() => {}} isPaused={false} showOptions={true} onReset={() => {}} onRestart={() => {}}/>);
  expect(wrapper.find("#time-countdown").text()).toBe("01:01:01");
})

it('clicking start button would start the timer', () => {
  const startTimer = jest.fn();
  const wrapper = shallow(<Clock hour={0}
    minute={0}
    seconds={0}
    minuteBreak={0}
    secondBreak={0}
    repeats={0}
    startTimer={startTimer} 
    handlePause={() => {}} isPaused={false} showOptions={true} onReset={() => {}} onRestart={() => {}}/>);
  wrapper.find('#startTimer').simulate('click');
  expect(startTimer).toBeCalled();
})

it('clicking the pause button would cause pause timer', () => {
  const pauseTimer = jest.fn();
  const wrapper = shallow(<Clock hour={0}
    minute={0}
    seconds={0}
    minuteBreak={0}
    secondBreak={0}
    repeats={0}
    startTimer={() => {}} 
    handlePause={pauseTimer} isPaused={false} showOptions={true} onReset={() => {}} onRestart={() => {}}/>);
    wrapper.find('#pauseTimer').simulate('click');
    expect(pauseTimer).toBeCalled();
})
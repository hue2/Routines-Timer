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
    handleStartTimer={() => {}} 
    handlePause={() => {}} isPaused={false} showOptions={true} onReset={() => {}} onRestart={() => {}}
    notify={false}
    />);
  expect(wrapper.find("#time-countdown").text()).toBe("01:01:01");
})

it('clicking start button would start the timer', () => {
  const handleStartTimer = jest.fn();
  const wrapper = shallow(<Clock hour={0}
    minute={0}
    seconds={0}
    minuteBreak={0}
    secondBreak={0}
    repeats={0}
    handleStartTimer={handleStartTimer} 
    handlePause={() => {}} isPaused={false} showOptions={false} onReset={() => {}} onRestart={() => {}}
    notify={false}
    />);
    expect(wrapper.find('#start-btn').exists()).toBeTruthy();
    wrapper.find('#start-btn').simulate('click');
    expect(handleStartTimer).toBeCalled();
})

it('clicking the pause button would cause pause timer', () => {
  const pauseTimer = jest.fn();
  const wrapper = shallow(<Clock hour={0}
    minute={0}
    seconds={0}
    minuteBreak={0}
    secondBreak={0}
    repeats={0}
    handleStartTimer={() => {}} 
    handlePause={pauseTimer} isPaused={false} showOptions={true} onReset={() => {}} onRestart={() => {}}
    notify={false}
    />);
    wrapper.find('#pause-btn').simulate('click');
    expect(pauseTimer).toBeCalled();
});

it('Option buttons would show when showOption is true', () => {
  const wrapper = shallow(<Clock hour={0}
    minute={0}
    seconds={0}
    minuteBreak={0}
    secondBreak={0}
    repeats={0}
    handleStartTimer={() => {}} 
    handlePause={() => {}} isPaused={false} showOptions={true} onReset={() => {}} onRestart={() => {}}
    notify={false}
    />);
    expect(wrapper.find('div#button-groups').exists()).toBeTruthy();
})
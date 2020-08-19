import * as React from 'react';
import {shallow} from 'enzyme';
import Clock from '../Clock';
import * as renderer from 'react-test-renderer';

it('component matches snapshot', () => {
  const tree = renderer.create(<Clock 
    time={""}
    repeats={0}
    isBreak={false}
    showOptions={false}
    remainingRepeats={1}
    notify={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('time div reflects value from input', () => {
  const wrapper = shallow(
    <Clock 
        time={"01:01:01"}
        repeats={0}
        isBreak={false}
        showOptions={false}
        remainingRepeats={1}
        notify={false} 
    />);
  expect(wrapper.find("#time-countdown").text()).toBe("01:01:01");
});
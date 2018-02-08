import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Clock from '../Clock';

it('renders without crashing1', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Clock value={10} />, div);
});


it('time div reflects value from input', () => {
  const wrapper = shallow(<Clock value={10} />);
  expect(wrapper.find(".timeDiv").text()).toBe("10");
})

it('clicking start button would call function', () => {
  const wrapper = shallow(<Clock value={10} />);
  expect(wrapper.find('#startTimer')).toBeTruthy();
  // wrapper.find('#startTimer').simulate('click');
  // expect(startTimer).toBeCalled();
})
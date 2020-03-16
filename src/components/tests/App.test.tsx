import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../App';
import { mount } from 'enzyme';
import * as renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('component matches snapshot', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('time types are set correctly', () => {
  const wrapper = mount(<App />);
  wrapper.find('#second-input').simulate("change", { target: { dataset: { state : 'time' }, classList: [ 'second', 'tempSecond' ], value: '5' } });
  wrapper.find('#start-btn').at(0).simulate('click');
  expect(wrapper.state('time').second).toEqual(5);
  expect(wrapper.state('time').tempSecond).toEqual(5);
});

// it('handleTimeConvert is called when time value is bigger than 0', () => {
//   const spyFunc = jest.spyOn(App.prototype, 'handleStartTimer');
//   const wrapper = mount(<App />);
//   wrapper.find('#second-input').simulate("change", { target: { dataset: { state : 'time' }, classList: [ 'second', 'tempSecond' ], value: '5' } });
//   wrapper.find('#start-btn').at(0).simulate('click');
//   expect(spyFunc).toBeCalled();
// })
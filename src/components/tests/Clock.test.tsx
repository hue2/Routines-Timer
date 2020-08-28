import * as React from 'react';
import {shallow} from 'enzyme';
import Clock from '../Clock';
import * as renderer from 'react-test-renderer';

describe('Clock tests', () => {
  let props, wrapper;

  beforeEach(() => {
    props = {
      time:'01:01:01',
      repeats: 0,
      isBreak: false,
      showOptions: false, 
      remainingRepeats: 1,
    }

    wrapper = shallow(
      <Clock
        {...props}
      />
    )
  });

  afterEach(() => {
    wrapper.unmount();
  })

  it('component matches snapshot', () => {
    const tree = renderer.create(<Clock 
      time={''}
      repeats={0}
      isBreak={false}
      showOptions={false}
      remainingRepeats={1}
      />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should reflects value from input', () => {
    expect(wrapper.find('#time-countdown').text()).toBe('01:01:01');
  });

  it('should not show repeat text when no repeats', () => {
    expect(wrapper.find('#repeat-txt').hasClass('hidden')).toEqual(true);
  });

  it('should show repeat text when has repeats', () => {
    const wrapper = shallow(
      <Clock
        {...props}
        repeats={1}
      />
    )
    expect(wrapper.find('#repeat-txt').hasClass('hidden')).toEqual(false);
    wrapper.unmount();
  });

  it('should show clock text when isBreak is false', () => {
    expect(wrapper.find('#time-countdown').hasClass('time')).toEqual(true);
  });

  it('should not show clock text when isBreak is true', () => {
    const wrapper = shallow(
      <Clock
        {...props}
        isBreak={true}
      />
    )
    expect(wrapper.find('#time-countdown').hasClass('time')).toEqual(false);
  });

  it('should show break when isBreak is true', () => {
    const wrapper = shallow(
      <Clock
        {...props}
        isBreak={true}
      />
    )
    expect(wrapper.find('#break-countdown').hasClass('hidden')).toEqual(false);
    wrapper.unmount();
  });
})
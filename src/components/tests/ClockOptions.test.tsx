import * as React from 'react';
import {shallow} from 'enzyme';
import ClockOptions from '../ClockOptions';

it('when show is true, modal should render', () => {
    const wrapper = shallow(<ClockOptions openModal={() => {}} closeModal={() => {}} show={true} />);
    expect(wrapper.find('Modal').exists()).toBeTruthy();
})
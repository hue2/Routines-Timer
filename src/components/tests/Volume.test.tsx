import * as React from 'react';
import { shallow } from 'enzyme';
import Volume from '../Volume';
import { adjustVolume } from '../../helpers/Helper';

jest.mock('../../helpers/Helper');
(adjustVolume as jest.Mock).mockImplementation(() => true);

describe('Volume tests', () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            toggleVolume: jest.fn(),
            setVolume: jest.fn(),
            volume: 0.5,
            isMuted: false,
            notify: true,
        };

        wrapper = shallow(
            <Volume 
                {...props}
            />
        );

    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should call setVolume on volume change', () => {    
        expect(wrapper.find('#volume-wrapper')).toHaveLength(1);
        expect(wrapper.find('#volume-slider')).toHaveLength(1);
        wrapper.find('#volume-slider').simulate('change', { target: { value: 0.2 }});
        expect(props.setVolume).toHaveBeenCalledTimes(1);    
    });

    it('should disable slider when isMuted is true', () => {
        wrapper = shallow(
            <Volume 
                {...props}
                isMuted={true}
            />
        );
        expect(wrapper.find('#volume-slider').props()['disabled']).toBe(true);
    });
});
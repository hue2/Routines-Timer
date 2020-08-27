import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../App';
import * as renderer from 'react-test-renderer';

describe('App tests', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
    });

    it('component matches snapshot', () => {
      const tree = renderer.create(<App />).toJSON();
      expect(tree).toMatchSnapshot();
    });
})
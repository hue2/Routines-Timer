import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Clock from '../Clock';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Clock time={10} />, div);
});

import * as React from 'react';
import '../styles/App.css';
import Clock from './Clock';
const logo = require('../styles/logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Clock value={10}/>
      </div>
    );
  }
}

export default App;

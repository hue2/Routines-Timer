import * as React from 'react';
import '../styles/App.css';
import Clock from './Clock';
import ClockOptions from './ClockOptions';


type AppState = {
  show: boolean,
}

type AppProps = {

}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { show: false }
  }
  openModal = () => this.setState({ show: true });
  closeModal= () => this.setState({ show: false });

  render() {
    return (
      <div className="App">
        <button onClick={this.openModal}>Show Options Modal</button>
        <Clock value={10}/>
        <ClockOptions openModal={this.openModal} closeModal={this.closeModal} show={this.state.show} />
      </div>
    );
  }
}

export default App;

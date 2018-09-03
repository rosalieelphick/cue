import React, { Component } from 'react';
import './styles/style.css';
import LandingPage from './LandingPage';
import Icon from './Icon';

class App extends Component {
  constructor() {
    super();
    this.state = {
      display: true
    }
  }

  homePage = () => {
    this.setState({
      display: true
    })
  }

  render() {
    return (
      <div className="App">
        {/* <header>
          <div className="wrapper">
            <button onClick={this.homePage}>button</button>
            <Icon className="icon" icon={"allPacks"} />
            <h1>cue</h1>
            <Icon className="icon" icon={"write"} />
          </div>
        </header>         */}
        <LandingPage />        
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
       { /*
             <ImageUrlLink />*/}
      </div>
    );
  }
}

export default App;

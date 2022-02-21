import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import { particlesOptions } from './Constants.js';
import Particles from "react-tsparticles";
import './App.css';


class App extends Component {

  render() {
    return (
      <div className="App">
         <Particles className="particles"
          id="tsparticles"
          options={particlesOptions}
        />
        <Navigation />
        <Logo />  
        <Rank />
        <ImageLinkForm />
    
      </div>
    );
  }
}

export default App;

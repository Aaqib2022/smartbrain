import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Clarifai from 'clarifai';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import { particlesOptions } from './Constants.js';
import Particles from "react-tsparticles";
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import './App.css';

const app = new Clarifai.App({
    apiKey: '63dd9e713bf8405082a77e48957ac212'
});

class App extends Component {

    constructor () {
      super();
      this.state = {
        input:'', 
        imageUrl: ' '
      }
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
      console.log("clicked");
      app.models.predict("a403429f2ddf4b49b307e318f00e528b" , "https://samples.clarifai.com/face-det.jpg").then(
        function (response) {
          console.log(response);
        },
        function(err) {
          console.log(err)
        });
    }

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
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl = {this.state.imageUrl}/>
    
      </div>
    );
  }
}

export default App;

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
        imageUrl: ' ',
        box: { }
      }
    }

    calculateFaceBox = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        } 
    }

   

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
      console.log("clicked");
      app.models.predict(Clarifai.FACE_DETECT_MODEL , this.state.input)
      .then(response => this.calculateFaceBox(response))
      .catch(err => console.log(err));
  
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
        <FaceRecognition 
        box = {this.state.box}
        imageUrl = {this.state.imageUrl}
        />
    
      </div>
    );
  }
}

export default App;

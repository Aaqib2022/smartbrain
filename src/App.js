import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import { particlesOptions } from './Constants.js';
import Particles from "react-tsparticles";
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import './App.css';



const intialState = {
        input:'', 
        imageUrl: ' ',
        box: {} ,
        route: 'Signin',
        isSignedIn: false,
          user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
              }
      }

class App extends Component {
    constructor () {
      super();
      this.state = intialState;
    }

      onRouteChange = (route) => {
        if (route === "Signin") {
          this.setState(intialState);
        } else if (route === "home") {
          this.setState({isSignedIn: true});         
        }
          this.setState({route: route});
      }

      loadUser = (user) => {
        this.setState({
            user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    entries: user.entries,
                    joined: user.joined
                  }
              })
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

    displayFaceBox = (box) => {
      this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
          fetch('https://serene-chamber-51723.herokuapp.com/imageurl' , {
                  method: 'post',
                  headers: {'Content-Type' : 'application/json'},
                  body: JSON.stringify({
                    input: this.state.input
                  })
                })
          .then(response=> response.json())
        
           .then(response => {
            if (response) {
              fetch('https://serene-chamber-51723.herokuapp.com/image' , {
                      method: 'put',
                      headers: {'Content-Type' : 'application/json'},
                      body: JSON.stringify({
                        id: this.state.user.id
                      })
               })
              .then(response => response.json())
              .then(count => {this.setState(Object.assign(this.state.user , {entries: count}))})
              .catch(err => console.log(err));
            }
            this.displayFaceBox(this.calculateFaceBox(response))
          })
          .catch(err => console.log(err));
      
    }

  render() {
    const {isSignedIn , route , imageUrl , box } = this.state;

    return (
      <div className="App">
         <Particles className="particles"
          id="tsparticles"
          options={particlesOptions}
        />
        <Navigation isSignedIn= {isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === "home" 
          ? ( 
              <div> 
                <Logo />  
                <Rank name={this.state.user.name} 
                entries = {this.state.user.entries}/>
                <ImageLinkForm 
                  onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition 
                  box = {box}
                  imageUrl = {imageUrl}
                />
              </div> 
            ) : (
              this.state.route === "Signin" ? 
                  <Signin  loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
                  : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
              )
         }
    
      </div>
    );
  }
}

export default App;

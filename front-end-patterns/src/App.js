import React from 'react';
import './App.css';
import Login from './Login/Login';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false
    }
  }
  loginToggle = () => {
    this.setState({
      loggedIn: true
    })
  }
  logoutToggle = () => {
    this.setState({
      loggedIn: false
    })
  }
  render(){
    return(
      <div>
        <Login loggedIn={this.state.loggedIn} loginToggle={this.loginToggle} logoutToggle={this.logoutToggle}/>
      </div>
    )
  }
}

export default App;

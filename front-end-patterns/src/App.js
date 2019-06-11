import React from 'react';
import './App.css';
import Login from './Login/Login';
import { Route, Switch } from 'react-router-dom';

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
  my404 = () => {
    return(
      <div>
        <h1>404</h1>
        <h2>Page not found</h2>
      </div>
    )
  };
  homePage = () => {
    return(
      <div>
        <Login loggedIn={this.state.loggedIn} loginToggle={this.loginToggle} logoutToggle={this.logoutToggle}/>
      </div>
    )
  }
  render(){
    return(
      <main>
        <Switch>
          <Route path="/" component={this.homePage} />
          <Route component={this.my404} />
        </Switch>
      </main>
    )
  }
}

export default App;

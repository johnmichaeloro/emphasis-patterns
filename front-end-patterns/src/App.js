import React from 'react';
import './App.css';
import PatternContainer from './PatternContainer/PatternContainer';
import Registration from './Registration/Registration';
import Login from './Login/Login';

class App extends React.Component {
  render(){
    return(
      <div>
        <Registration />
        <Login />
        <PatternContainer />
      </div>
    )
  }
}

export default App;

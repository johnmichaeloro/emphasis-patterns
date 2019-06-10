import React from 'react';
import Registration from './Registration/Registration';
import PatternContainer from './PatternContainer/PatternContainer';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  };
  handleChange = (e) => {
    console.log(this.state, 'this is handleChange');
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  clearForm = () => {
    document.getElementById('loginForm').reset();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submitting login form');
    try{
      const loginResponse = await fetch('http://localhost:9000/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const parsedResponse = await loginResponse.json();
      if(parsedResponse.data === 'login successful'){
        this.props.loginToggle();
        console.log('login successful');
      };
      this.clearForm();
    } catch(err){
        console.log(err);
    }
  }
  handleLogout = async (e) => {
    e.preventDefault();
    console.log('You are logged out.');
    try{
      const logoutResponse = await fetch('http://localhost:9000/auth/logout', {
        method: 'GET',
        credentials: 'include'
      });
      const parsedResponse = await logoutResponse.json();
      if(parsedResponse.data === 'user logged out'){
        this.props.logoutToggle();
        console.log('logout successful');
      }
    } catch(err){
      console.log(err);
    }
  }
  render(){
    return(
      <div>
        <form id='loginForm' onSubmit={this.handleSubmit}>
          Username: <input type='text' name='username' onChange={this.handleChange} />
          Password: <input type='password' name='password' onChange={this.handleChange} />
          <input type='submit' />
        </form>
        <br/>
        {this.props.loggedIn ? <div><button onClick={this.handleLogout}>Logout</button><Registration /></div> : null}
        <PatternContainer loggedIn={this.props.loggedIn}/>
      </div>
    )
  }
}

export default Login;

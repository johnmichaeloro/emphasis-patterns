import React from 'react';

class Login extends React.Component {
  constructor(){
    super();
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
        console.log('login successful');
      }
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
        console.log('logout successful');
      }
    } catch(err){
      console.log(err);
    }
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          Username: <input type='text' name='username' onChange={this.handleChange} />
          Password: <input type='password' name='password' onChange={this.handleChange} />
          <input type='submit' />
        </form>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

export default Login;

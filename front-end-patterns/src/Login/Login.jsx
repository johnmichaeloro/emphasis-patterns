import React from 'react';
import PatternContainer from './PatternContainer/PatternContainer';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      showLogin: false,
      showMenu: true
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
      this.setState({
        showLogin: false
      })
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
      this.setState({
        showMenu: true
      })
    } catch(err){
      console.log(err);
    }
  }
  renderLoginForm = (e) => {
    e.preventDefault();
    this.setState({
      showMenu: false,
      showLogin: true,
    })
  }

  render(){
    return(
      <div>

        <br/><br/>

        <Link to="/" style={{textDecoration: 'none', color: 'black'}}><span className='mainTitle'><span style={{backgroundColor: '#FFF459'}}>Patterns </span><span style={{backgroundColor: '#4DFC9C'}}>of </span><span style={{backgroundColor: '#59F1FF'}}>Empha</span><span style={{backgroundColor: '#598CF8'}}>sis</span></span></Link>

        <br/>

        <PatternContainer loggedIn={this.props.loggedIn}/>

        <br/>

        {this.props.loggedIn ? <div><a className='menuLinks' href='https://emphasis.ai/'>Emphasis AI</a> <a className='menuLinks' href='http://emphasisdb.herokuapp.com/'>Emphasis DB</a><button className='menuLinks' onClick={this.handleLogout}>Logout</button></div> : null}

        {this.state.showMenu ? <div><a className='menuLinks' href='https://emphasis.ai/'>Emphasis AI</a> <a className='menuLinks' href='http://emphasisdb.herokuapp.com/'>Emphasis DB</a><button className='menuLinks' onClick={this.renderLoginForm}>Login</button></div> : null}

        {this.state.showLogin ? <form id='loginForm' onSubmit={this.handleSubmit}>
          Username: <input type='text' name='username' onChange={this.handleChange} />
          Password: <input type='password' name='password' onChange={this.handleChange} />
          <input type='submit' />
        </form> : null}

        <p>© 2019 Emphasis AI</p>

      </div>
    )
  }
}

export default Login;

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
      showMenu: true,
      formDisabled: true,
      loginFail: false,
    }
  };

  enableForm = () => {
    if(this.state.username.length !== 0 && this.state.password.length !== 0){
      console.log('*******FORM ENABLED******');
      this.setState({
        formDisabled: false
      })
    }
  }

  handleChange = (e) => {
    console.log(this.state, 'this is handleChange');
    this.setState({
      [e.target.name]: e.target.value
    }, () => this.enableForm())
  };

  clearForm = () => {
    document.getElementById('loginForm').reset();
    this.setState({
      username: '',
      password: '',
      formDisabled: true,
    })
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
      } else {
        console.log('login failed');
      };
      this.clearForm();
      this.setState({
        showLogin: false,
        showMenu: true,
        loginFail: true,
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
      loginFail: false,
    })
  }

  hideLogin = (e) => {
    e.preventDefault();
    this.setState({
      showLogin: false,
      showMenu: true,
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

        {this.state.showLogin ?
            <form id='loginForm' onSubmit={this.handleSubmit}>
                <b>Username</b> <input className='loginInput' type='text' name='username' onChange={this.handleChange} />
                <b>Password</b> <input className='loginInput' type='password' name='password' onChange={this.handleChange} />
                <input className='loginSubmit' type='submit' disabled={this.state.formDisabled}/>
                <button onClick={this.hideLogin}>Cancel</button>
            </form> : null}
            {this.state.loginFail ? <span style={{'color': 'red'}}>Login failed.</span> : null}
        <p>© 2019 Emphasis AI</p>

      </div>
    )
  }
}

export default Login;

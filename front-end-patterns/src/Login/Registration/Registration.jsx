import React from 'react';

class Registration extends React.Component {
  constructor(){
    super();
    this.state = {
      username: '',
      email: '',
      password: ''
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
    console.log(this.state);
    try{
      const registrationResponse = await fetch('http://localhost:9000/auth/register', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedResponse = await registrationResponse.json();
      if(parsedResponse.data === 'registration successful'){
        console.log('registration successful');
      }
      this.props.hideRegistration();
    } catch(err){
      console.log(err);
    }
  }
  render(){
    return(
      <div className='row'>
      <div className='patternCard'>
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <h2 className='title'>New User</h2>
          <div className='cardContent'>
          <label className='adminText'>
            <b>Username</b> <br/> <input className='adminInput' type='text' name='username' onChange={this.handleChange} /> <br/>
          </label>
          <br/>
          <label className='adminText'>
            <b>Email</b> <br/> <input className='adminInput' type='text' name='email' onChange={this.handleChange}/> <br/>
          </label>
          <br/>
          <label className='adminText'>
            <b>Password</b> <br/> <input className='adminInput' type='password' name='password' onChange={this.handleChange}/> <br/>
          </label>
          <br/>
            <div className='buttonHolder'>
              <input className='adminSubmit' type='submit' />
              <button onClick={this.props.cancelForm}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
      </div>
      </div>
    )
  }
}

export default Registration;

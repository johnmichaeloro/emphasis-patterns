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
    } catch(err){
      console.log(err);
    }
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        Username: <input type='text' name='username' onChange={this.handleChange} />
        Email: <input type='text' name='email' onChange={this.handleChange}/>
        Password: <input type='password' name='password' onChange={this.handleChange}/>
        <input type='submit' />
      </form>
    )
  }
}

export default Registration;

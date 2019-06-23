import React from 'react';

class CreateType extends React.Component {
  constructor(){
    super();
    this.state = {
      patterns: [],
      patternType: '',
      description: ''
    }
  }

  updateType = (e) => {
    console.log(e.currentTarget.value, 'this is updateType');
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  render(){
    return(
      <div className='row'>
      <div className='patternCard'>
      <div className='container'>
        <form onSubmit={this.props.addPatternType.bind(null, this.state)}>
          <h2 className='title'>New Category</h2>
          <div className='cardContent'>
          <label className='adminText'>
            Name <br/> <input className='adminInput' type='text' name='patternType' onChange={this.updateType} /><br/>
          </label>
          <br/>
          <label className='adminText'>
            Description <br/> <input className='adminInput' type='text' name='description' onChange={this.updateType} /><br/>
          </label>
          <br/>
          <div className='buttonHolder'>
            <input className='adminSubmit' type='submit' />
          </div>
          </div>
        </form>
      </div>
      </div>
      </div>
    )
  }
}

export default CreateType;

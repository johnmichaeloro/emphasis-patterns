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
      <div>
        <form onSubmit={this.props.addPatternType.bind(null, this.state)}>
          <h2>Add a Type to the Catalog</h2>
          <label>
            Name: <input type='text' name='patternType' onChange={this.updateType} /><br/>
          </label>
          <label>
            Description: <input type='text' name='description' onChange={this.updateType} /><br/>
          </label>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default CreateType;

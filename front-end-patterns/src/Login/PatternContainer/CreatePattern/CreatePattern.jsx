import React, {Component} from 'react';

//Bug in the description input field that creates a series of commas. Probably due to the descriptionMapper not returning anything when the component mounts. To fix it I either need to refine the descriptionMapper or filter out the commas.

class CreatePattern extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      author: '',
      publication: '',
      year: '',
      url: '',
      patternType: null,
      description: '',
      text: [{
        text: '',
        analysis: null,
        data: null
      }],
      commentary: ''
    }
  }

  updatePattern = (e) => {
    console.log(e.currentTarget.value, 'this is update pattern');
    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }

  typeMapper = this.props.patternTypes.map((patternType) => {
    return(
      <option key={patternType._id} name='patternType' value={patternType._id}>{patternType.patternType}</option>
    )
  })

  render(){

    let descriptionMapper;
    this.props.patternTypes.forEach((patternType) => {
      if(patternType._id === this.state.patternType){
        descriptionMapper = patternType.description;
      }
    })

    console.log(descriptionMapper, 'this is descriptionMapper');
    return(
      <div className='row'>
      <div className='patternCard'>
      <div className='container'>
        <form onSubmit={this.props.addPattern.bind(null, this.state)}>
          <h2 className='title'>New Pattern</h2>
          <div className='cardContent'>
            <label className='adminText'>
              Title <br/> <input className='adminInput' type='text' name='title' onChange={this.updatePattern} />
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              Author <br/> <input className='adminInput' type='text' name='author' onChange={this.updatePattern} />
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              Publication <br/> <input className='adminInput' type='text' name='publication' onChange={this.updatePattern} />
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              Year <br/> <input className='adminInput' type='text' name='year' onChange={this.updatePattern} />
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              URL <br/> <input className='adminInput' type='text' name='url' onChange={this.updatePattern} />
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              Pattern Type <br/> <select className='adminMenu' name='patternType' onChange={this.updatePattern}><option>Choose a type</option>{this.typeMapper}</select>
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              Description <br/> <input className='adminInput' name='description' onChange={this.updatePattern} value={descriptionMapper} />
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              Text <br/> <textarea className='adminTextArea' name='text' onChange={this.updatePattern} />
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              Commentary <br/> <textarea className='adminTextArea' name='commentary' onChange={this.updatePattern} />
            </label>
            <br/>
            <br/>
            <input className='adminSubmit' type='submit'/>
          </div>
        </form>
      </div>
      </div>
      </div>
    )
  }
}

export default CreatePattern;

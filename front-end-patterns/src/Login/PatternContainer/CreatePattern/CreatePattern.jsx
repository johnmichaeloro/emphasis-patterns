import React, {Component} from 'react';

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
              <b>Title</b> <br/> <input className='adminInput' type='text' name='title' onChange={this.updatePattern} />
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              <b>Author</b> <br/> <input className='adminInput' type='text' name='author' onChange={this.updatePattern} />
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              <b>Publication</b> <br/> <input className='adminInput' type='text' name='publication' onChange={this.updatePattern} />
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              <b>Year</b> <br/> <input className='adminInput' type='text' name='year' onChange={this.updatePattern} />
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              <b>URL</b> <br/> <input className='adminInput' type='text' name='url' onChange={this.updatePattern} />
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              <b>Pattern Type</b> <br/> <select className='adminMenu' name='patternType' onChange={this.updatePattern}><option>Choose a type</option>{this.typeMapper}</select>
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              <b>Description</b> <br/> <input className='adminInput' name='description' onChange={this.updatePattern} value={descriptionMapper} />
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              <b>Text</b> <br/> <textarea className='adminTextArea' name='text' onChange={this.updatePattern} />
            </label>
            <br/>
            <br/>
            <label className='adminText'>
              <b>Commentary</b> <br/> <textarea className='adminTextArea' name='commentary' onChange={this.updatePattern} />
            </label>
            <br/>
            <br/>
            <div className='buttonHolder'>
              <input className='adminSubmit' type='submit'/>
            </div>
          </div>
        </form>
      </div>
      </div>
      </div>
    )
  }
}

export default CreatePattern;

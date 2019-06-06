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
    // const descriptionMapper = this.props.patternTypes.map((patternType) => {
    //   if(patternType._id === this.state.patternType){
    //     return patternType.description;
    //   }
    // })

    let descriptionMapper;
    this.props.patternTypes.forEach((patternType) => {
      if(patternType._id === this.state.patternType){
        descriptionMapper = patternType.description;
      }
    })

    console.log(descriptionMapper, 'this is descriptionMapper');
    return(
      <div>
        <form onSubmit={this.props.addPattern.bind(null, this.state)}>
          <h2>Add a pattern to the catalog</h2>
          <label>
            Title: <input type='text' name='title' onChange={this.updatePattern} />
          </label>
          <br/>
          <label>
            Author: <input type='text' name='author' onChange={this.updatePattern} />
          </label>
          <br/>
          <label>
            Publication: <input type='text' name='publication' onChange={this.updatePattern} />
          </label>
          <br/>
          <label>
            Year: <input type='text' name='year' onChange={this.updatePattern} />
          </label>
          <br/>
          <label>
            URL: <input type='text' name='url' onChange={this.updatePattern} />
          </label>
          <br/>
          <label>
            Pattern Type: <select name='patternType' onChange={this.updatePattern}>{this.typeMapper}</select>
          </label>
          <br/>
          <label>
              Description: <input name='description' onChange={this.updatePattern} value={descriptionMapper} />
          </label>
          <br/>
          <label>
            Text: <input type="text" name='text' onChange={this.updatePattern} />
          </label>
          <br/>
          <label>
            Commentary: <input name='commentary' onChange={this.updatePattern} />
          </label>
          <br/>
          <input type='submit'/>
        </form>
      </div>
    )
  }
}

export default CreatePattern;

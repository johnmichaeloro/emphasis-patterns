import React from 'react';

//I need to include form validation in this function. It can be a function within the function, enableForm. The submit button will have a disabled property. The only problem is that I cannot set state within this function. Why not change thet function to a class? What would be the downsides to this? Isn't it just lazy Jim code that has me using a function here?

//Here is the problem I immediately encounter. In the login form, enableForm is a callback function that occurs within handleChange. In typeEditor, handleChange has been passed down. How do I enable the form if handleChange exists in PatternContainer? I could place enableForm in the render function. This seems like a newbie thing to do, as the function will be called almost continuously. But what other option do I have?

//It looks like I need to create a function in PatternContainer called enableForm. But the proble is that form enablement is going to be different for each form. So how do I get around this issue? I could build a monstrous if check. It would take all of the forms into account. I would have to build it on a form by form basis to get it right.

//The formDisabled property would be in PatternContainer. I would need to design the if check so that the other forms wouldn't be enabled inappropriately. How would I do this?

class TypeEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      formDisabled: true,
    }
  }
  render(){
    return(
      <div className='row'>
      <div className='patternCard'>
      <div className='container'>
        <form onSubmit={this.props.editPatternType}>
          <h2 className='title'>Edit Category</h2>
          <div className='cardContent'>
          <label className='adminText'>
            <b>Name</b> <br/> <input className='adminInput' type='text' name='patternType' onChange={this.props.handleTypeChange} value={this.props.typeToEdit.patternType}/><br/>
          </label>
          <br/>
          <br/>
          <label className='adminText'>
            <b>Description</b> <br/> <input className='adminInput' type='text' name='description' onChange={this.props.handleTypeChange} value={this.props.typeToEdit.description}/><br/>
          </label>
          <br/>
          <div className='buttonHolder'>
            <input className='adminSubmit' type='submit' disabled={this.state.formDisabled}/>
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

export default TypeEditor;

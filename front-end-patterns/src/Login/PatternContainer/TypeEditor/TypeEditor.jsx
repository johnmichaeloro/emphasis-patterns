import React from 'react';

//I need to include form validation in this function. It can be a function within the function, enableForm. The submit button will have a disabled property. The only problem is that I cannot set state within this function. Why not change thet function to a class? What would be the downsides to this? Isn't it just lazy Jim code that has me using a function here?

//Here is the problem I immediately encounter. In the login form, enableForm is a callback function that occurs within handleChange. In typeEditor, handleChange has been passed down. How do I enable the form if handleChange exists in PatternContainer? I could place enableForm in the render function. This seems like a newbie thing to do, as the function will be called almost continuously. But what other option do I have?

//It looks like I need to create a function in PatternContainer called enableForm. But the proble is that form enablement is going to be different for each form. So how do I get around this issue? I could build a monstrous if check. It would take all of the forms into account. I would have to build it on a form by form basis to get it right.

//The formDisabled property would be in PatternContainer. I would need to design the if check so that the other forms wouldn't be enabled inappropriately. How would I do this?

//I need to find out what I'm validating for. I can't send an empty field. How do I prevent an empty field from being sent? I might need to create validation functions for each form. If I did not, it's possible that the formEnable function would not work, because the first fields in its if else checks would be empty.

const TypeEditor = (props) => {
    return(
      <div className='row'>
      <div className='patternCard'>
      <div className='container'>
        <form onSubmit={props.editPatternType}>
          <h2 className='title'>Edit Category</h2>
          <div className='cardContent'>
          <label className='adminText'>
            <b>Name</b> <br/> <input className='adminInput' type='text' name='patternType' onChange={props.handleTypeChange} value={props.typeToEdit.patternType}/><br/>
          </label>
          <br/>
          <br/>
          <label className='adminText'>
            <b>Description</b> <br/> <input className='adminInput' type='text' name='description' onChange={props.handleTypeChange} value={props.typeToEdit.description}/><br/>
          </label>
          <br/>
          <div className='buttonHolder'>
            <input className='adminSubmit' type='submit' disabled={props.formDisabled}/>
            <button onClick={props.cancelForm}>Cancel</button>
          </div>
          </div>
        </form>
      </div>
      </div>
      </div>
    )
}

export default TypeEditor;

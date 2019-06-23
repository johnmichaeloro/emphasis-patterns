import React from 'react';

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

export default TypeEditor;

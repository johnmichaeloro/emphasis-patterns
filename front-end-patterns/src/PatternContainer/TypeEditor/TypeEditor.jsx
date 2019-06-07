import React from 'react';

const TypeEditor = (props) => {
    return(
      <div>
        <form onSubmit={props.editPatternType}>
          <h2>Edit a Type</h2>
          <label>
            Name: <input type='text' name='patternType' onChange={props.handleTypeChange} value={props.typeToEdit.patternType}/><br/>
          </label>
          <label>
            Description: <input type='text' name='description' onChange={props.handleTypeChange} value={props.typeToEdit.description}/><br/>
          </label>
          <input type='submit' />
        </form>
      </div>
    )
}

export default TypeEditor;

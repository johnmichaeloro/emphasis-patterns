import React from 'react';

const PatternEditor = (props) => {
  console.log('this is patternToEdit', props.patternToEdit);
  console.log('this is props.patternToEdit.text in PatternEditor', props.patternToEdit.text);

  const typeMapper = props.patternTypes.map((patternType) => {
    if(patternType.description !== props.patternToEdit.patternType.description){
          return(
            <option key={patternType._id} name='patternType' value={patternType._id}>{patternType.patternType}</option>
          );
        }
        });

  typeMapper.unshift(<option key={props.patternToEdit.patternType._id} name='patternType' value={props.patternToEdit.patternType._id}>{props.patternToEdit.patternType.patternType}</option>);


  return(
    <div className='row'>
    <div className='patternCard'>
    <div className='container'>
      <form onSubmit={props.editPattern}>
        <h2 className='title'>Edit Pattern</h2>
        <div className='cardContent'>
        <label className='adminText'>
          <b>Title</b> <br/> <input className='adminInput' type='text' name='title' onChange={props.handleFormChange} value={props.patternToEdit.title} />
        </label>
        <br/>
        <br/>
        <label className='adminText'>
          <b>Author</b> <br/> <input className='adminInput' type='text' name='author' onChange={props.handleFormChange} value={props.patternToEdit.author} />
        </label>
        <br/>
        <br/>
        <label className='adminText'>
          <b>Publication</b> <br/> <input className='adminInput' type='text' name='publication' onChange={props.handleFormChange} value={props.patternToEdit.publication} />
        </label>
        <br/>
        <br/>
        <label className='adminText'>
          <b>Year</b> <br/> <input className='adminInput' type='number' name='year' onChange={props.handleFormChange} value={props.patternToEdit.year} />
        </label>
        <br/>
        <br/>
        <label className='adminText'>
          <b>URL</b> <br/> <input className='adminInput' type='text' name='url' onChange={props.handleFormChange} value={props.patternToEdit.url} />
        </label>
        <br/>
        <br/>
        <label className='adminText'>
        <b>Pattern Type</b> <br/> <select className='adminMenu' name='patternType' onChange={props.handleFormChange}>{typeMapper}</select>
        </label>
        <br/>
        <br/>
        <label className='adminText'>
          <b>Description</b> <br/> <input className='adminInput' name='description' onChange={props.handleFormChange} value={props.patternToEdit.patternType.description} />
        </label>
        <br/>
        <br/>
        <label className='adminText'>
          <b>Text</b> <br/> <textarea className='adminTextArea' name='text' onChange={props.handleFormChange} value={props.patternToEdit.text[0].text} />
        </label>
        <br/>
        <br/>
        <label className='adminText'>
          <b>Commentary</b> <br/> <textarea className='adminTextArea' name='commentary' onChange={props.handleFormChange} value={props.patternToEdit.commentary} />
        </label>
        <br/>
        <br/>
        <div className='buttonHolder'>
          <input className='adminSubmit' type='submit'/>
          <button onClick={this.props.cancelForm}>Cancel</button>
        </div>
        </div>
      </form>
    </div>
    </div>
    </div>
  )
}

export default PatternEditor;

import React from 'react';

//I would need to build a function that would activate on Click and show all of the entries that have ids associated with the category clicked. I would use a ForEach instead of .map. I would need to amend patternList accordingly.

const TypeList = (props) => {
  const typeMapper = props.patternTypes.map((patternType, index) => {
    console.log('typelist', patternType, index);
    if(index % 2 !== 0){
      return(
        <div className='row'>
          <div className='card' onClick={props.filterPatterns.bind(null, props.patternTypes[index - 1])}>
            <div className='container'>
              <span className='title'>{props.patternTypes[index - 1].patternType}</span><br/>
              <span>{props.patternTypes[index - 1].description}</span><br/>
              {props.loggedIn ? <div><button onClick={props.showTypeEditor.bind(null, props.patternTypes[index - 1])}>Edit</button>
              <button onClick={props.deletePatternType.bind(null, props.patternTypes[index - 1]._id)}>Delete</button></div> : null}
            </div>
          </div>
          <div className='cardRight' onClick={props.filterPatterns.bind(null, patternType)}>
            <div className='container'>
              <span className='title'>{patternType.patternType}</span><br/>
              <span>{patternType.description}</span><br/>
              {props.loggedIn ? <div><button onClick={props.showTypeEditor.bind(null, patternType)}>Edit</button>
              <button onClick={props.deletePatternType.bind(null, patternType._id)}>Delete</button></div> : null}
            </div>
          </div>
        </div>
      )
    } else if(index === props.patternTypes.length - 1){
      return(
        <div className='column'>
          <div className='card' onClick={props.filterPatterns.bind(null, patternType)}>
            <div className='container'>
              <span className='title'>{patternType.patternType}</span><br/>
              <span>{patternType.description}</span><br/>
              {props.loggedIn ? <div><button onClick={props.showTypeEditor.bind(null, patternType)}>Edit</button>
              <button onClick={props.deletePatternType.bind(null, patternType._id)}>Delete</button></div> : null}
            </div>
          </div>
        </div>
      )
    }
  })
  return(
      <div className='typeMapper'>
        {typeMapper}
      </div>
  )
}

export default TypeList;

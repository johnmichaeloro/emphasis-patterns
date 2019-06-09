import React from 'react';

//I would need to build a function that would activate on Click and show all of the entries that have ids associated with the category clicked. I would use a ForEach instead of .map. I would need to amend patternList accordingly.

const TypeList = (props) => {
  const typeMapper = props.patternTypes.map((patternType) => {
    console.log('typelist', patternType);
    return(
      <div onClick={props.filterPatterns.bind(null, patternType)}>
        <li key={patternType._id}>
          <span>Associated Patterns: {patternType.patterns.join(', ')}</span><br/>
          <span>Pattern Type: {patternType.patternType}</span><br/>
          <span>Description: {patternType.description}</span><br/>
          {props.loggedIn ? <div><button onClick={props.showTypeEditor.bind(null, patternType)}>Edit</button>
          <button onClick={props.deletePatternType.bind(null, patternType._id)}>Delete</button></div> : null}
        </li>
      </div>
    )
  })
  return(
    <div>
      <h2>View Pattern Types</h2>
      <ul>
        {typeMapper}
      </ul>
    </div>
  )
}

export default TypeList;

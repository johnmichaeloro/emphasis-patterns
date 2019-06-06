import React from 'react';

const TypeList = (props) => {
  const typeMapper = props.patternTypes.map((patternType) => {
    return(
      <li key={patternType._id}>
        <span>Associated Patterns: {patternType.patterns.map((pattern) => {return pattern + ', '})}</span><br/>
        <span>Pattern Type: {patternType.patternType}</span><br/>
        <span>Description: {patternType.description}</span><br/>
        <button>Edit</button>
        <button onClick={props.deletePatternType.bind(null, patternType._id)}>Delete</button>
      </li>
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

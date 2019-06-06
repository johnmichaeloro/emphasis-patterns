import React from 'react';

const TypeList = (props) => {
  const typeMapper = props.patternTypes.map((patternType) => {
    return(
      <li key={patternType._id}>
        <span>Pattern Type: {patternType.patternType}</span><br/>
        <span>Description: {patternType.description}</span><br/>
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

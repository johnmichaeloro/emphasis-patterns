import React from 'react';
import { Link } from 'react-router-dom';

const TypeList = (props) => {
  const typeMapper = props.patternTypes.map((patternType, index) => {
    console.log('typelist', patternType, index);
    if(index % 2 !== 0){
      return(
        <div className='row'>
          <div className='card'>
            <Link to="/patterns/" style={{textDecoration: 'none', color: 'black'}}>
            <div className='container' onClick={props.filterPatterns.bind(null, props.patternTypes[index - 1])}>
              <span className='title'>{props.patternTypes[index - 1].patternType}</span><br/>
              <br/>
              <span className='description'>{props.patternTypes[index - 1].description}</span><br/>
            </div>
            </Link>
            {props.loggedIn ? <div><button className='noClickButton' onClick={props.showTypeEditor.bind(null, props.patternTypes[index - 1])}>Edit</button>
            <button className='noClickButton' onClick={props.deletePatternType.bind(null, props.patternTypes[index - 1]._id)}>Delete</button></div> : null}
          </div>
          <div className='cardRight'>
            <Link to="/patterns/" style={{textDecoration: 'none', color: 'black'}}>
            <div className='container' onClick={props.filterPatterns.bind(null, patternType)}>
              <span className='title'>{patternType.patternType}</span><br/>
              <br/>
              <span className='description'>{patternType.description}</span><br/>
            </div>
            </Link>
            {props.loggedIn ? <div><button className='noClickButton' onClick={props.showTypeEditor.bind(null, patternType)}>Edit</button>
            <button className='noClickButton' onClick={props.deletePatternType.bind(null, patternType._id)}>Delete</button></div> : null}
          </div>
        </div>
      )
    } else if(index === props.patternTypes.length - 1){
      return(
        <div className='column'>
          <div className='card'>
            <Link to="/patterns/" style={{textDecoration: 'none', color: 'black'}}>
            <div className='container' onClick={props.filterPatterns.bind(null, patternType)}>
              <span className='title'>{patternType.patternType}</span><br/>
              <br/>
              <span className='description'>{patternType.description}</span><br/>
            </div>
            </Link>
            {props.loggedIn ? <div><button className='noClickButton' onClick={props.showTypeEditor.bind(null, patternType)}>Edit</button>
            <button className='noClickButton' onClick={props.deletePatternType.bind(null, patternType._id)}>Delete</button></div> : null}
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

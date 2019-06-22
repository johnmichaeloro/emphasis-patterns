import React from 'react';
import { Route, Link } from 'react-router-dom';

class TypeList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedPatternType: []
    }
  }

//onClick={this.props.filterPatterns.bind(null, this.props.patternTypes[index - 1])}
//onClick={this.props.filterPatterns.bind(null, patternType)}

  render(){
    const typeMapper = this.props.patternTypes.map((patternType, index) => {
      console.log('typelist', patternType, index);
      if(index % 2 !== 0){
        return(
          <div className='row' key={'typeMapper' + this.props.patternTypes[index - 1].patternType}>
            <div className='card'>
              <Link to={`/${this.props.patternTypes[index - 1].patternType}/`} style={{textDecoration: 'none', color: 'black'}}>
              <div className='container' >
                <span className='title'>{this.props.patternTypes[index - 1].patternType}</span><br/>
                <br/>
                <div className='cardContent'>
                  <span className='description'>{this.props.patternTypes[index - 1].description}</span><br/>
                </div>
              </div>
              </Link>
              {this.props.loggedIn ? <div><button className='noClickButton' onClick={this.props.showTypeEditor.bind(null, this.props.patternTypes[index - 1])}>Edit</button>
              <button className='noClickButton' onClick={this.props.deletePatternType.bind(null, this.props.patternTypes[index - 1]._id)}>Delete</button></div> : null}
            </div>
            <div className='cardRight' key={'typeMapper' + patternType.patternType}>
              <Link to={`/${patternType.patternType}/`} style={{textDecoration: 'none', color: 'black'}}>
              <div className='container' >
                <span className='title'>{patternType.patternType}</span><br/>
                <br/>
                <div className='cardContent'>
                  <span className='description'>{patternType.description}</span><br/>
                </div>
              </div>
              </Link>
              {this.props.loggedIn ? <div><button className='noClickButton' onClick={this.props.showTypeEditor.bind(null, patternType)}>Edit</button>
              <button className='noClickButton' onClick={this.props.deletePatternType.bind(null, patternType._id)}>Delete</button></div> : null}
            </div>
          </div>
        )
      } else if(index === this.props.patternTypes.length - 1){
        return(
          <div className='column' key={'typeMapper' + patternType.patternType}>
            <div className='loneCard'>
              <Link to={`/${patternType.patternType}/`} style={{textDecoration: 'none', color: 'black'}}>
              <div className='container' >
                <span className='title'>{patternType.patternType}</span><br/>
                <br/>
                <div className='cardContent'>
                  <span className='description'>{patternType.description}</span><br/>
                </div>
              </div>
              </Link>
              {this.props.loggedIn ? <div><button className='noClickButton' onClick={this.props.showTypeEditor.bind(null, patternType)}>Edit</button>
              <button className='noClickButton' onClick={this.props.deletePatternType.bind(null, patternType._id)}>Delete</button></div> : null}
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
  }

export default TypeList;

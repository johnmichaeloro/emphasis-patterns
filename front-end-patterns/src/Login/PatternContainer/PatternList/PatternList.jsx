import React from 'react';
import sentenceArrayMaker from '../js/sentences';

//To filter this according to category, I would need to pass the associated ids as props. I would need to turn patternMapper into a forEach. Then I would need to do another for each between patternMapper and textMapper. This foreach would go through the associated ids. There would be an if check that would say, if the ids match, return this pattern. Then the pattern would enter the textmapper and be represented on the page.
/**
return(
  <div className='card'>
    <div key={pattern._id} className='container'>
      <span className='patternTitle'>From {pattern.title} by {pattern.author}</span><br/>
      <span>{sentenceColorer}</span><br/>
      <span>Publication:{pattern.publication}</span><br/>
      <span>Year:{pattern.year}</span><br/>
      <span>URL:{pattern.url}</span><br/>
      <span>Pattern Type:{pattern.patternType.patternType}</span><br/>
      <span>Description:{pattern.patternType.description}</span><br/>
      <span>Commentary:{pattern.commentary}</span><br/>
      {props.loggedIn ? <div><button onClick={props.deletePattern.bind(null, pattern._id)}>Delete</button>
      <button onClick={props.showModal.bind(null, pattern)}>Edit</button></div> : null}
    </div>
  </div>
)
**/

class PatternList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      patternId: null,
    }
  }

  componentDidMount(){
    //In here, I would want an if check that would call getPatterns and getPatternTypes.
    //It would also run filteer patterns outside of the if check, I believe.
  }

  render(){
    this.mountChecker();
    this.filterChecker();
    console.log('This is props.matchParamsId', this.props.matchParamsId);
    console.log('This is props.patternFilter.length', this.props.patternFilter.length);
    console.log('this is props.patternFilter in PatternList', this.props.patternFilter);
    const patternMapper = this.props.patternFilter.map((pattern) => {
      console.log(pattern, 'this is the pattern in the patternMapper');
      const textMapper = sentenceArrayMaker(pattern.text)
      console.log('this is the textMapper', textMapper);
      const sentenceColorer = textMapper.map((map) => {
        if(map.color === 'yellow') {
          return(
            <span key={pattern._id} style={{backgroundColor: '#FFF459'}}>{map.text}</span>
          )
        } else if(map.color === 'green') {
          return(
            <span key={pattern._id} style={{backgroundColor: '#4DFC9C'}}>{map.text}</span>
          )
        } else if(map.color === 'lightBlue') {
          return(
            <span key={pattern._id} style={{backgroundColor: '#59F1FF'}}>{map.text}</span>
          )
        } else if(map.color === 'darkBlue') {
          return(
            <span key={pattern._id} style={{backgroundColor: '#598CF8'}}>{map.text}</span>
          )
        } else if(map.color === 'lightGreen') {
          return(
            <span key={pattern._id} style={{backgroundColor: '#CCFFE1'}}>{map.text}</span>
          )
        } else if(map.color === 'fadedBlue') {
          return(
            <span key={pattern._id} style={{backgroundColor: '#D2F9FF'}}>{map.text}</span>
          )
        }

      })
        return(
          <div className='row'>
            <div className='patternCard'>
              <div key={pattern._id} className='container'>
                <span className='patternTitle'>From {pattern.title} by {pattern.author}</span><br/>
                <br/>
                <span className='description'>{sentenceColorer}</span><br/>
                <br/>
                  {this.props.loggedIn ? <div><button className='noClickButton' onClick={this.props.deletePattern.bind(null, pattern._id)}>Delete</button>
                  <button className='noClickButton' onClick={this.props.showModal.bind(null, pattern)}>Edit</button></div> : null}
              </div>
            </div>
          </div>
        )
    })
    return(
      <div>
        {patternMapper}
      </div>
    )
  }

}

export default PatternList;

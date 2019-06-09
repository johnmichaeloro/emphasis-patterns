import React from 'react';
import sentenceArrayMaker from '../js/sentences';

//To filter this according to category, I would need to pass the associated ids as props. I would need to turn patternMapper into a forEach. Then I would need to do another for each between patternMapper and textMapper. This foreach would go through the associated ids. There would be an if check that would say, if the ids match, return this pattern. Then the pattern would enter the textmapper and be represented on the page.



const PatternList = (props) => {
  console.log('this is props.patterns in PatternList', props.patternFilter);
  const patternMapper = props.patternFilter.map((pattern) => {
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
    if (pattern && pattern.patternType) {
      return(

        <li key={pattern._id}>
          <span>Title:{pattern.title}</span><br/>
          <span>Author:{pattern.author}</span><br/>
          <span>Publication:{pattern.publication}</span><br/>
          <span>Year:{pattern.year}</span><br/>
          <span>URL:{pattern.url}</span><br/>
          <span>Pattern Type:{pattern.patternType.patternType}</span><br/>
          <span>Description:{pattern.patternType.description}</span><br/>
          <span>Text:{sentenceColorer}</span><br/>
          <span>Commentary:{pattern.commentary}</span><br/>
          {props.loggedIn ? <div><button onClick={props.deletePattern.bind(null, pattern._id)}>Delete</button>
          <button onClick={props.showModal.bind(null, pattern)}>Edit</button></div> : null}
        </li>
      )
    } else {
      return(

        <li key={pattern._id}>
          <span>Title:{pattern.title}</span><br/>
          <span>Author:{pattern.author}</span><br/>
          <span>Publication:{pattern.publication}</span><br/>
          <span>Year:{pattern.year}</span><br/>
          <span>URL:{pattern.url}</span><br/>
          <span>Pattern Type: none</span><br/>
          <span>Description: none</span><br/>
          <span>Text:{sentenceColorer}</span><br/>
          <span>Commentary:{pattern.commentary}</span><br/>
          <button onClick={props.deletePattern.bind(null, pattern._id)}>Delete</button>
          <button onClick={props.showModal.bind(null, pattern)}>Edit</button>
        </li>
      )
    }

  })
  return(
    <div>
      <h2>View Patterns</h2>
      <ul>
        {patternMapper}
      </ul>
    </div>
  )
}

export default PatternList;

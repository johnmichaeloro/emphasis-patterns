import React, {Component} from 'react';
import axios from 'axios';

import CreatePattern from './CreatePattern/CreatePattern';
import PatternEditor from './PatternEditor/PatternEditor';
import TypeList from './TypeList/TypeList';
import CreateType from './CreateType/CreateType';
import TypeEditor from './TypeEditor/TypeEditor';
import { Route, Switch } from 'react-router-dom';

import stringParser from './js/stringParser';
import extractData from './js/extractData';
import compileData from './js/compileData';
import sentenceArrayMaker from './js/sentences';

axios.defaults.headers.post['Content-Type'] = 'application/json';

//THIS IS WHEN I STARTED TO ADD PATTERNLIST AS A FUNCTION OF PATTERNCONTAINER.
//1. First I deleted the PatternList import.
//2. Then I added SentenceArrayMaker to the imports.
//3. Then I added the PatternList's componentry to patternPage, replacing its componentry.


class PatternContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      patternTypes: [],
      patterns: [],
      patternFilter: [],
      typeToEdit: {
        patternType: '',
        description: ''
      },
      patternToEdit: {
        _id: null,
        user: null,
        title: '',
        author: '',
        publication: '',
        year: '',
        url: '',
        patternType: null,
        description: '',
        text: [{
          text: '',
          analysis: null,
          data: null
        }],
        commentary: ''
      },
      modalShowing: false,
      createShowing: false,
      typeEditorShowing: false,
      typeCreatorShowing: false,
    }
  }

  componentDidMount(){
      this.getPatternTypes();
      this.getPatterns();
  }

//What about having filterPatterns occur on component did mount? It would iterate through the patternTypes.

//What about this.filterPatterns as the route function with filterPatterns retturning PatternList?

//The problem I'm facing right now is that filterPatterns is not firing when a link is pasted in the URL bar. In order for it to fire, my thinking is that it needs to be the component activated by the Route. But how would this work in practice? First, why does filterPatterns need to be the component that fires?

//I would need to move filterPatterns and patternPage into TypeList. All of the state properties they use will need to be passed to them as props. I will need to pass them through TypeList. I will need to inport PatternList in TypeList. FilterPatterns will become a function that runs within the class of TypeList, as well as PatternPage.

//In PatternList, I might need to have filterPatterns firing. It's either there or in TypeList.

//Based on front-end console logs, the issue is that PatternList is rendering with an empty filterPatterns array. I might need to move filter patterns to PatternList and have it fire as a component did mount. How would I do this? It should be in TypeList.

filterPatterns = async (patternType) => {
    console.log('PATTERN FILTER ACTIVATED');
    let filteredPatterns = [];
    await this.state.patterns.forEach((pattern) => {
      if(pattern.patternType._id === patternType._id){
        filteredPatterns.push(pattern);
      }
    })
    this.setState({
      patternFilter: filteredPatterns,
    })
  }

  getPatterns = async (patternType) => {
    console.log("getting patterns");
    try {
      const response = await fetch('http://localhost:9000/api/v1/patterns', {
        credentials: 'include'
      });
      if(response.status !== 200){
        throw Error(response.statusText);
      }
      const patternsParsed = await response.json();
      console.log('this is the patternsParsed', patternsParsed.data);
      this.setState({
        patterns: patternsParsed.data,
      })
    } catch(err) {
      console.log(err);
    }
  }

getPatternTypes = async () => {
  console.log('getting patternTypes');
  try {
    const response = await fetch('http://localhost:9000/api/v1/types', {
      credentials: 'include'
    });
    if(response.status !== 200){
      throw Error(response.statusText);
    }
    const typesParsed = await response.json();
    this.setState({
      patternTypes: typesParsed.data
    })
  } catch(err){
    console.log(err);
  }
}

  addPatternType = async (patternType, e) => {
    e.preventDefault();
    console.log('made it to addPatternType', patternType);
    try{
      const createdType = await fetch('http://localhost:9000/api/v1/types', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(patternType),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const parsedResponse = await createdType.json();
      console.log('this is the parsedResponse in addType', parsedResponse);
      this.setState({
        patternTypes: [...this.state.patternTypes, parsedResponse.data],
        typeCreatorShowing: false
      });
    } catch(err){
      console.log(err);
    }
  }

apiCall = async (array) => {
	for (let i = 0; i < array.length; i++) {
		await axios
			.post('https://cors-anywhere.herokuapp.com/https://emphasis.ai/api/analysis_1/', {
				input: array[i].text
			})
			.then((analysis) => {
				array[i].analysis = analysis.data;
			})
	}
	return array
}

  addPattern = async (pattern, e) => {
    e.preventDefault();
    console.log('this is the new entry ', pattern);
    console.log('this is pattern.text', pattern.text);
    try{
      let sectionsArray = stringParser(pattern.text);
  		sectionsArray = await this.apiCall(sectionsArray);
  		sectionsArray.forEach((section) => {
  			section.data = extractData(section);
  		})
  		const entryData = compileData(sectionsArray)
      console.log('this is sectionsArray', sectionsArray);
      pattern.text = sectionsArray
      console.log('this is pattern.text[0].text after sectionsArray', pattern.text[0].text);
    //  const text = sentenceArrayMaker(sectionsArray)
    // ^this line of code is what will allow the colors to be represented on the page

    console.log('this is pattern after Emphasis API', pattern);
    const createdPattern = await fetch('http://localhost:9000/api/v1/patterns', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(pattern),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const parsedResponse = await createdPattern.json();
      console.log('this is the parsed response', parsedResponse);
      //Here I need to add the new id to the pattern type array
      this.setState({
        patterns: [...this.state.patterns, parsedResponse.data],
        createShowing: false,
      });
      console.log(this.state.patterns);
      this.getPatternTypes();
    } catch(err) {
      console.log(err);
    }
  }

  deletePatternType = async (id, e) => {
    console.log('this is the delete id', id);
    e.preventDefault();
    try{
      const deleteType = await fetch('http://localhost:9000/api/v1/types/' + id, {
        method: 'DELETE',
        credentials: 'include'
      });
      const deleteTypeJson = await deleteType.json();
      this.setState({
        patternTypes: this.state.patternTypes.filter((patternType, i) => patternType._id !== id),
      });
    } catch(err){
      console.log(err, 'this was the delete error');
    }
  }

  deletePattern = async (id, e) => {
    console.log('this is the delete id ', id);
    e.preventDefault();
    try{
      const deletePattern = await fetch('http://localhost:9000/api/v1/patterns/' + id, {
        method: 'DELETE',
        credentials: 'include'
      });
      const deletePatternJson = await deletePattern.json();
      let parentIndexToDel = -1;
      let childIndexToDel = -1;
      let patternTypeFilter;
      this.state.patternTypes.forEach((patternType, index) => {
        patternType.patterns.forEach((pattern, childIndex) => {
          if (pattern == deletePatternJson.data._id) {
            parentIndexToDel = index;
            childIndexToDel = childIndex;
            patternTypeFilter = patternType;
          }
        });
      })
      console.log(1, this.state.patternTypes[parentIndexToDel].patterns.length);
      this.state.patternTypes[parentIndexToDel].patterns.splice(childIndexToDel, 1);
      this.setState({
        patterns: this.state.patterns.filter((pattern, i) => pattern._id !== id)
      });
      this.filterPatterns(patternTypeFilter);
    } catch(err) {
      console.log(err, 'this was the delete error');
    }
  }

//When I update a type, the associated patterns only appear on reload. Perhaps I can use filterPatterns to address this. How? By placing this.filterPatterns(patternType) above the return statement in editedPatternTypeArray? No, this won't solve the problem.

  editPatternType = async (e) => {
    e.preventDefault();
    try{
      const editTypeResponse = await fetch('http://localhost:9000/api/v1/types/' + this.state.typeToEdit._id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(this.state.typeToEdit),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('this is the editTypeResponse', editTypeResponse);
      const parsedResponse = await editTypeResponse.json();
      const editedPatternTypeArray = this.state.patternTypes.map((patternType) => {
        if(patternType._id === this.state.typeToEdit._id){
          patternType = parsedResponse.data
        }
        return patternType
      });
      this.setState({
        patternTypes: editedPatternTypeArray,
        typeEditorShowing: false,
      });
    } catch(err){
      console.log(err);
    }
  }

  editPattern = async (e) => {
    e.preventDefault();
    console.log('this is state.patternToEdit', this.state.patternToEdit);
    console.log("***This is the text to be UPDATED***", this.state.patternToEdit.text.text);
    //I need to add an if check that says that if the text to be updated is an empty string, we just do the basic fetch request; if not, we do the emphasis call.
    //But that's not going to help because text will still be empty. But it's working for everything else. Let's try this approach.
    if(this.state.patternToEdit.text.text !== undefined) {
      try{
        let sectionsArray = stringParser(this.state.patternToEdit.text);
    		sectionsArray = await this.apiCall(sectionsArray);
    		sectionsArray.forEach((section) => {
    			section.data = extractData(section);
    		})
    		const entryData = compileData(sectionsArray)
        console.log('this is sectionsArray', sectionsArray);
        this.state.patternToEdit.text = sectionsArray;


      //  const text = sentenceArrayMaker(sectionsArray)
      // ^this line of code is what will allow the colors to be represented on the page

        const editResponse = await fetch('http://localhost:9000/api/v1/patterns/' + this.state.patternToEdit._id, {
          method: 'PUT',
          credentials: 'include',
          body: JSON.stringify(this.state.patternToEdit),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(editResponse);
        const parsedResponse = await editResponse.json();
        const editedPatternArray = this.state.patterns.map((pattern) => {
          if(pattern._id === this.state.patternToEdit._id){
            pattern = parsedResponse.data
          }
          return pattern
        });
        this.setState({
          patterns: editedPatternArray,
          modalShowing: false,
        });
        await this.state.patternTypes.forEach((patternType) => {
          if(patternType._id === this.state.patternToEdit.patternType._id){
            this.filterPatterns(patternType);
          }
        });
      } catch(err) {
        console.log(err);
      }
    } else {
      try{
        const editResponse = await fetch('http://localhost:9000/api/v1/patterns/' + this.state.patternToEdit._id, {
          method: 'PUT',
          credentials: 'include',
          body: JSON.stringify(this.state.patternToEdit),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(editResponse);
        const parsedResponse = await editResponse.json();
        const editedPatternArray = this.state.patterns.map((pattern) => {
          if(pattern._id === this.state.patternToEdit._id){
            pattern = parsedResponse.data
          }
          return pattern
        });
        this.setState({
          patterns: editedPatternArray,
          modalShowing: false,
        });
        await this.state.patternTypes.forEach((patternType) => {
          if(patternType._id === this.state.patternToEdit.patternType._id){
            this.filterPatterns(patternType);
          }
        });
      } catch(err) {
        console.log(err);
      }
    }

  }

  handleTypeChange = (e) => {
    console.log('this is handleTypeChange');
    this.setState({
      typeToEdit: {
        ...this.state.typeToEdit,
        [e.target.name]: e.target.value
      }
    })
  }

  handleFormChange = (e) => {
    console.log('this is handleFormChange');
    //can I do an if check here to see if the value is {revealedText}?
    this.setState({
      patternToEdit: {
        ...this.state.patternToEdit,
        [e.target.name]: e.target.value
      }
    })
  }

  showTypeEditor = (patternType) => {
    console.log('this is showTypeEditor', patternType);
    this.setState({
      typeEditorShowing: true,
      typeToEdit: patternType
    })
  }

  showModal = (pattern) =>  {
    console.log("this is show modal");
    this.setState({
      createShowing: false,
      modalShowing: true,
      patternToEdit: pattern
    }, () => console.log(this.state.modalShowing));
  }

  showTypeCreator = () => {
    console.log('this is show type creator');
    this.setState({
      typeCreatorShowing: true
    })
  }

  showCreate = () => {
    console.log('this is show create');
    this.setState({
      createShowing: true,
    })
  }

  typePage = () => {
    return(
      <div>
        <p>A collection of patterns of sentence-level emphasis with examples and descriptions created using <a href='http://emphasis.ai'>emphasis.ai</a>.</p>

        {this.props.loggedIn ? <div>
        <button onClick={this.showCreate}>Create a Pattern</button><br/>

        <br/>

        <button onClick={this.showTypeCreator}>Create a Type</button>
        </div> : null}

        {this.state.typeCreatorShowing ? <CreateType addPatternType={this.addPatternType} /> : null}

        {this.state.typeEditorShowing ? <TypeEditor typeToEdit={this.state.typeToEdit} handleTypeChange={this.handleTypeChange} editPatternType={this.editPatternType} /> : null}

        {this.state.createShowing ? <CreatePattern patternTypes={this.state.patternTypes} addPattern={this.addPattern}/> : null}

        <TypeList patternTypes={this.state.patternTypes} patterns={this.state.patterns} showTypeEditor={this.showTypeEditor} deletePatternType={this.deletePatternType} filterPatterns={this.filterPatterns} loggedIn={this.props.loggedIn}/>

        {this.state.modalShowing ? <PatternEditor patternToEdit={this.state.patternToEdit} patternTypes={this.state.patternTypes} editPattern={this.editPattern} handleFormChange={this.handleFormChange} /> : null}

      </div>
    )
  }

  patternPage = ({ match }) => {
    let filteredPatterns = [];
    let typeDescription;
    console.log('THIS IS MATCH!!!!', match);
    console.log('This is match.params.id', match.params.id);
    console.log('This is patternFilter.length', this.state.patternFilter.length);
    console.log('this is patternFilter in patternPage', this.state.patternFilter);
    if(this.state.patternFilter.length === 0){
     console.log('length is zero!!!!!!!!');
     console.log('PATTERN TYPES in state', this.state.patternTypes);
     const matchedType = this.state.patternTypes.find(patternType => patternType.patternType === match.params.id);
     console.log('found the matched type', matchedType);
     this.state.patterns.forEach((pattern) => {
       if(pattern.patternType._id === matchedType._id){
         filteredPatterns.push(pattern);
         typeDescription = pattern.patternType.description
       }
     })
     console.log(filteredPatterns);
   } else{
     filteredPatterns = this.state.patternFilter
   };
    const patternMapper = filteredPatterns.map((pattern) => {
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
                  {this.props.loggedIn ? <div><button className='noClickButton' onClick={this.deletePattern.bind(null, pattern._id)}>Delete</button>
                  <button className='noClickButton' onClick={this.showModal.bind(null, pattern)}>Edit</button></div> : null}
              </div>
            </div>
          </div>
        )
    })

    return(
      <div>
        <h1>{match.params.id}</h1>
        <p>{typeDescription}</p>
        <div>
          {patternMapper}
        </div>
      </div>
    )
  }

  render(){
    return(
      <Switch>
        <Route exact path='/' component={this.typePage} />
        <Route exact path='/:id' component={this.patternPage}/>
      </Switch>
    )
  }
}

export default PatternContainer;

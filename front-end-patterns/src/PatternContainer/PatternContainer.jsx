import React, {Component} from 'react';
import axios from 'axios';
import CreatePattern from './CreatePattern/CreatePattern';
import PatternList from './PatternList/PatternList';
import PatternEditor from './PatternEditor/PatternEditor';
import TypeList from './TypeList/TypeList';

import stringParser from './js/stringParser';
import extractData from './js/extractData';
import compileData from './js/compileData';

axios.defaults.headers.post['Content-Type'] = 'application/json';

class PatternContainer extends Component {
  constructor(){
    super();
    this.state = {
      patternTypes: [],
      patterns: [],
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
      listShowing: true,
    }
  }
  componentDidMount(){
      this.getPatternTypes();
      this.getPatterns();
  }
  getPatterns = async () => {
    console.log("getting patterns");
    try {
      const response = await fetch('http://localhost:9000/api/v1/patterns', {
        credentials: 'include'
      });
      if(response.status !== 200){
        throw Error(response.statusText);
      }
      const patternsParsed = await response.json();
      this.setState({patterns: patternsParsed.data})
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
      this.setState({
        patterns: [...this.state.patterns, parsedResponse.data],
        createShowing: false,
        listShowing: true,
      });
      console.log(this.state.patterns);
    } catch(err) {
      console.log(err);
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
      this.setState({patterns: this.state.patterns.filter((pattern, i) => pattern._id !== id)});
    } catch(err) {
      console.log(err, 'this was the delete error');
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
          listShowing: true,
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
          listShowing: true,
        });
      } catch(err) {
        console.log(err);
      }
    }

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
  showModal = (pattern) =>  {
    console.log("this is show modal");
    this.setState({
      createShowing: false,
      listShowing: false,
      modalShowing: true,
      patternToEdit: pattern
    }, () => console.log(this.state.modalShowing));
  }
  showCreate = () => {
    console.log('this is show create');
    this.setState({
      createShowing: true,
      listShowing: false,
    })
  }
  render(){
    console.log('this is state.patternTypes', this.state.patternTypes);
    console.log('this is this.state.patterns in PatternContainer', this.state.patterns);
    console.log(this.state);
    return(
      <div>
        <h1>Pattern Dictionary</h1>
        <p><i>A collection of patterns of sentence-level emphasis with examples and descriptions created using <a href='http://emphasis.ai'>emphasis.ai</a></i>.</p>
        <button onClick={this.showCreate}>Create a Pattern</button>
        {this.state.createShowing ? <CreatePattern patternTypes={this.state.patternTypes} addPattern={this.addPattern}/> : null}
        {this.state.listShowing ? <div><TypeList patternTypes={this.state.patternTypes} /> <PatternList patterns={this.state.patterns} showModal={this.showModal} deletePattern={this.deletePattern}/></div> : null}
        {this.state.modalShowing ? <PatternEditor patternToEdit={this.state.patternToEdit} patternTypes={this.state.patternTypes} editPattern={this.editPattern} handleFormChange={this.handleFormChange} /> : null}
      </div>
    )
  }
}

export default PatternContainer;

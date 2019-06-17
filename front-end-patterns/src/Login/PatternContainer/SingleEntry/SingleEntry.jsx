import React from 'react';

class SingleEntry extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      someStateProperty: null
    }
  }

  componentDidMount(){
    this.patternSorter();
  }

  patternSorter = async () => {
    console.log('inside patternSorter');
    if(this.props.patterns){
      await this.props.patterns.forEach((pattern) => {
        if(pattern.patternType.patternType === this.props.match.params.id){
          console.log('this is the pattern in patternSorter', pattern);
        }
      })
    }
  }

  render(){
    return(
      <div>
        <p>{this.props.match.params.id}</p>
      </div>
    )
  }
}

export default SingleEntry;

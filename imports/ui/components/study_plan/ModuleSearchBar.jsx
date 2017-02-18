import React from 'react'
import Autocomplete from 'react-async-autocomplete'

export default class ModuleSearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      userInput: undefined,
      selectedModule: ""
    }
  }

  onChange(userInput) {
    // Fetch data and setItems
    console.log("onChange: " + userInput);
  }

  // When the user clicks an option or hits enter
  onSelect(userInput) {
    console.log("onSelect: " + userInput);
    // this.setState({
    //   selectedModule: userInput
    // });
  }

  render() {
    return <Autocomplete ItemView={ModuleEntry}
                         onChange={this.onChange.bind(this)}
                         onSelect={this.onSelect.bind(this)} />
  }
}

class ModuleEntry extends React.Component {
  render() {
    let displayedModuleDetails = this.props.moduleObj;

    return
      <div className="user-data">
        <div>{displayedModuleDetails.code}</div>
      </div>;
  }
}

const languages = [
  {
    code: 'honey',
    year: 2012
  }, {
    code: 'homer',
    year: 1972
  }, {
    code: 'heath',
    year: 2012
  }, {
    code: 'hebrew',
    year: 1972
  }, {
    code: 'helberg',
    year: 2012
  }, {
    code: 'heinz',
    year: 1972
  }, {
    code: 'hubert',
    year: 2012
  }
]

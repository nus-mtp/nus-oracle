import React from 'react';
import Autosuggest from 'react-autosuggest';

export default class Module extends React.Component {
  constructor() {
    super();

    this.state = {
      userInput: "",
      suggestions: []
    }
  }

  onSuggestionsFetchRequested(value) {
    console.log("onSuggestionsFetchRequested: " + value +
                " value: " + value.value);
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  // updateModuleInput(event) {
  //   console.log("updateModuleInput: " + event.target.value);
  //   this.setState({
  //     userInput: event.target.value
  //   });
  // }

  updateModuleInput(event, {newValue}) {
    console.log("updateModuleInput event: " + event +
                " newValue: " + newValue);
    this.setState({
      userInput: newValue
    });
  }

  render() {
    const value = this.state.userInput;
    const suggestions = this.state.suggestions;
    const inputProps = {
      placeholder: 'Module code',
      value,
      onChange: this.updateModuleInput.bind(this)
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

const languages = [
  {
    code: 'adrian',
    year: 1972
  },
  {
    code: 'benedict',
    year: 2012
  },
  {
    code: 'charles',
    year: 1972
  },
  {
    code: 'charlie',
    year: 2012
  },
  {
    code: 'elmer',
    year: 1972
  },
  {
    code: 'emmanuel',
    year: 2012
  },
  {
    code: 'elaine',
    year: 1972
  },
  {
    code: 'honey',
    year: 2012
  },
  {
    code: 'homer',
    year: 1972
  },
  {
    code: 'heath',
    year: 2012
  },
  {
    code: 'hebrew',
    year: 1972
  },
  {
    code: 'helberg',
    year: 2012
  },
  {
    code: 'heinz',
    year: 1972
  },
  {
    code: 'hubert',
    year: 2012
  }
]

/**
 * Defines how suggestions are displayed as a list to the user.
 *
 * @param  {[string]} value    Value input by the user in the autocomplete
 *                             input box
 * @return {[array]}    List of suggested modules
 */
const getSuggestions = (userInput) => {
  console.log("getSuggestions: " + userInput);
  let inputValue = userInput.value;
  inputValue = inputValue.trim().toLowerCase(); // Perform string normalization
  const inputLength = inputValue.length;

  if (inputLength === 0) {
    // No suggestions given to user if they don't type in anything
    return [];
  } else {
    // Return elements in the list with beginning letters that match inputValue
    return languages.filter((lang) => {
      return lang.code.toLowerCase().slice(0, inputLength) === inputValue;
    });
  }
};

/**
 * Populates the autocomplete input box when a suggestion has been selected.
 *
 * @param  {[object]} suggestion    Module object representing a suggestion
 * @return {[string]}    String representation of the input element to be
 *                       populated into the autosuggest input box.
 */
const getSuggestionValue = (suggestion) => {
  return suggestion.code;
}

/**
 * Renders the suggestion onto the autosuggest input box.
 *
 * @param  {[object]} suggestion    Module object representing a suggestion
 * @return {[object]}    Custom HTML element for the design of each suggestion
 */
const renderSuggestion = (suggestion) => {
  return <div>{suggestion.code}</div>
}

/*
<form className="input-group" style={{width: '100%'}}>
  <input type="text" className="form-control"
         value={this.state.moduleCode}
         onChange={this.updateModuleInput.bind(this)}/>
</form>
 */

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

  /**
   * Renders the suggestions container onto the default autosuggest box's style
   * @param  {[array of objs]} children    List of suggestions Autosuggest will
   *                                       pass in
   * @param  {[object]} props    Style props Autosuggest will pass in
   * @return {[object]}          Custom HTML element for the design of a
   *                             suggestion container
   */
  renderSuggestionsContainer({children, ...props}) {
    let style = {
      position:'absolute',
      zIndex:'3',
      overflowY: 'auto',
      height: '8em',
      'background': '#f6c18a',
      'opacity': '0.75'
    }
    return (
      <div {...props}>
        <ul style={style}>
          {children}
        </ul>
      </div>
    );
  }

  /**
   * Renders the suggestion onto the autosuggest input box.
   *
   * @param  {[object]} suggestion    Module object representing a suggestion
   * @return {[object]}    Custom HTML element for the design of each suggestion
   */
  renderSuggestion(suggestion) {
    let displayedSugg = suggestion.code;
    let nonHighlightedBG = "transparent";
    let highlightedBG = "#ec7513";
    return(
      <div className="typeahead-item" style={{width: '9em'}}
           ref={(htmlElem) => {
                  if (htmlElem) { // Ensure it's not a null element
                    if (this.state.userInput === displayedSugg) {
                      htmlElem.style.backgroundColor = highlightedBG;
                    } else {
                      htmlElem.style.backgroundColor = nonHighlightedBG;
                    }
                  }
               }}>
        {displayedSugg}
      </div>
    );
  }

  onSuggestionsFetchRequested(value) {
    console.log("onSuggestionsFetchRequested: " + value + " value: " + value.value);
    this.setState({suggestions: getSuggestions(value)});
  };

  onSuggestionsClearRequested() {
    this.setState({suggestions: []});
  };

  updateModuleInput(event, {newValue}) {
    console.log(" newValue: " + newValue);
    this.setState({userInput: newValue});
  }

  render() {
    const value = this.state.userInput;
    const suggestions = this.state.suggestions;
    const inputProps = {
      placeholder: 'Module code',
      value,
      onChange: this.updateModuleInput.bind(this)
    };

    return (<Autosuggest
      id={this.props.id}
      inputProps={inputProps}
      suggestions={suggestions}
      renderSuggestion={this.renderSuggestion.bind(this)}
      renderSuggestionsContainer={this.renderSuggestionsContainer.bind(this)}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
      getSuggestionValue={getSuggestionValue}
      focusFirstSuggestion={false}
      scrollBar={true}
      focusInputOnSuggestionClick={false}/>);
  }
}

Module.propTypes = {
  // ID that identifies this component uniquely. This id also
  // uniquely defines the Autosuggest box - necessary if
  // there are many Autosuggest boxes on the screen.
  id: React.PropTypes.string
}

// ======================================================
// Helper functions for configuring the Autosuggest React
// component
// ======================================================

const languages = [
  {
    code: 'adrian',
    year: 1972
  }, {
    code: 'benedict',
    year: 2012
  }, {
    code: 'charles',
    year: 1972
  }, {
    code: 'charlie',
    year: 2012
  }, {
    code: 'elmer',
    year: 1972
  }, {
    code: 'emmanuel',
    year: 2012
  }, {
    code: 'elaine',
    year: 1972
  }, {
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

/**
 * Defines how suggestions are displayed as a list to the user.
 *
 * @param  {[string]} value    Value input by the user in the autocomplete
 *                             input box
 * @return {[array]}    List of suggested modules
 */
const getSuggestions = (userInput) => {
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

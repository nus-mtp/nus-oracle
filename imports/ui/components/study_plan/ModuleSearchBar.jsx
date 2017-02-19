import _ from 'underscore'
import React from 'react';
import Autosuggest from 'react-autosuggest';
import ModuleSearchBarSuggestion from './ModuleSearchBarSuggestion.jsx'
import { sendQuery } from '../../../api/searcher-controller/controller.js'

const enterKeyCharCode = 13;

/**
 * React Component that implements the module search bar which
 * handles addition of modules into a student's semester.
 *
 * * For reference, a module object is formatted like this:
 * { "_id" : "Wt4PPojMhFPeiKTxZ",
 *   "moduleCode" : "CS1010",
 *   "moduleName" : "Programming Methodology",
 *   "moduleDescription" : "Lorem ipsum", "modulePrerequisite" : "Lorem ipsum",
 *   "moduleCorequisite" : "Lorem ipsum", "modulePreclusion" : "Lorem ipsum",
 *   "moduleMC" : 4, "termOffered" : { "Sem1" : "Sem 1", "Sem2" : "Sem 2" } }
 */
export default class ModuleSearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      userInput: "",
      suggestions: []
    }
  }

  //=============================================
  // Pre-processing rendering styles
  //=============================================
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

  handleClickSuggestion(event) {
    let htmlElem = event.target;
    let highlightedBG = "#ec7513";
    event.target.style.backgroundColor = highlightedBG;
    console.log("Clicked on suggestion! " + htmlElem);
    console.log(htmlElem.style.backgroundColor);
  }

  /**
   * Renders the suggestion onto the autosuggest input box.
   *
   * @param  {[object]} suggestion    Module object representing a suggestion
   * @return {[object]}    Custom HTML element for the design of each suggestion
   */
  renderSuggestion(suggestion) {
    let moduleCode = suggestion.moduleCode;
    return <ModuleSearchBarSuggestion userInput={this.state.userInput}
                                      moduleCode={moduleCode} />
  }

  /**
   * Populates the autocomplete input box when a suggestion has been
   * selected. E.g. If a student hovers over "CS1010" in the
   * suggestion box, this component will populate the input box
   * with the returned value.
   *
   * @param  {[object]} suggestion    Module object
   * @return {[string]}    String representation of the input element to be
   *                       populated into the autosuggest input box.
   */
  getSuggestionValue(suggestion) {
    return suggestion.moduleCode;
  }

  //=============================================
  // Event Handlers
  //=============================================
  /**
   * Event where the list of suggestions displayed needs to be re-computed,
   * we compute how suggestions are displayed as a list to the user.
   *
   * @param {[string]} value    Value typed in to the search box by user
   */
  onSuggestionsFetchRequested(userInput) {
    let extractedValue = userInput.value;
    let inputValue = extractedValue.trim().toLowerCase();
    const inputLength = extractedValue.length;

    let listOfSuggestions = [];
    if (inputLength !== 0) {
      // Get suggestions from modules DB best matches inputValue
      let fetchedListOfModulesFromDB = sendQuery(inputValue);
      // console.log("listOfModulesFromDB: " + _.map(fetchedListOfModulesFromDB, (module) => {return JSON.stringify(module);}));
      listOfSuggestions = fetchedListOfModulesFromDB
    }
    // Update the suggestions to be displayed to user
    this.setState({ suggestions: listOfSuggestions });
  };

  /**
   * Called every time suggestions need to be cleared
   */
  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  };

  /**
   * Updates the input field with what user is typing
   */
  updateInputWithNewValue(event, {newValue, method}) {
    this.setState({ userInput: newValue });
  }

  /**
   * Adds the user's chosen module to the database
   */
  handleConfirmModule(moduleCode, event) {
    if (event.charCode == enterKeyCharCode) { // If pressed ENTER
      console.log("Pressed ENTER for " + moduleCode);
      // Add module to DB
      this.props.handleAddModule(moduleCode);
    }
  }

  render() {
    const userInput = this.state.userInput;
    const suggestions = this.state.suggestions;
    const inputProps = {
      placeholder: 'Module code',
      value: userInput,
      onChange: this.updateInputWithNewValue.bind(this),
      className: 'form-control',
      style: {
        width: '100%',
        padding: '0.15em 0.35em 0.15em 1.5em'
      }
    };

    return (
      <div tabIndex='0' style={{position: 'relative'}}
           onKeyPress={this.handleConfirmModule.bind(this, userInput)}>
        <i className='font-icon font-icon-plus'
           style={{position: 'absolute',
                   top: '0.5em', left: '0.35em',
                   color: '#edbe93'}}>
        </i>
        <Autosuggest id={this.props.id} inputProps={inputProps}
          suggestions={suggestions}
          renderSuggestion={this.renderSuggestion.bind(this)}
          renderSuggestionsContainer={this.renderSuggestionsContainer.bind(this)}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
          getSuggestionValue={this.getSuggestionValue.bind(this)}
          focusFirstSuggestion={false}
          focusInputOnSuggestionClick={false}
        />
      </div>);
  }
}

ModuleSearchBar.propTypes = {
  handleAddModule: React.PropTypes.func
}

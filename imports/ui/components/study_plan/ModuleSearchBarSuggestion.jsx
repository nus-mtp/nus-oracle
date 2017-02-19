import React from 'react';
import { isDefinedObj } from '../../../../api/util.js'

export default class ModuleSearchBarSuggestion extends React.Component {
  constructor() {
    super();
    this.state = {
      canListenToKeyDown: false
    }
  }

  /**
   * Checks if suggestion is what user is selecting when using up, down arrow
   * keys to navigate the Autosuggest box.
   *
   * @param {[obj]} htmlElem    HTML element that is being checked
   * @param {[obj]} userInput    User's typed input in the input field
   * @param {[str]} moduleCode    Module code of the selected suggestion
   * @return    True if this object is defined and is what the user is selecting,
   *            False otherwise.
   */
  isSelectedByKeyDown(htmlElem, userInput, moduleCode) {
    if (isDefinedObj(htmlElem)) {
      return userInput === moduleCode;
    }
  }

  /**
  * Takes the html element referenced by the event and applies a bg color
  */
  toggleHighlighted(htmlElem, bgColorToApply) {
    if (htmlElem !== undefined && htmlElem !== null) {
      htmlElem.style.backgroundColor = bgColorToApply
    }
  }

  render() {
    const highlightedBG = '#ec7513';
    const nonHighlightedBG = 'transparent'
    let moduleCodeOfSuggestion = this.props.moduleCode;
    let userInput = this.props.userInput;

    return(
      <div className="typeahead-item"
           style={{width: '11em', cursor: 'pointer'}}
           onMouseEnter={(event) => {
             // TODO
             // this.toggleHighlighted(event.target, highlightedBG);
           }}
           onMouseLeave={(event) => {
             // TODO
             // this.toggleHighlighted(event.target, nonHighlightedBG);
           }}
           ref={(htmlElem) => {
             if(this.isSelectedByKeyDown(htmlElem, userInput, moduleCodeOfSuggestion)) {
               this.toggleHighlighted(htmlElem, highlightedBG);
             } else {
               this.toggleHighlighted(htmlElem, nonHighlightedBG);
             }
           }}>
          {moduleCodeOfSuggestion}
      </div>
    )
  }
}

ModuleSearchBarSuggestion.propTypes = {
  moduleCode: React.PropTypes.string, // Module code of this suggestion
  userInput: React.PropTypes.string // User Input from parent component
}

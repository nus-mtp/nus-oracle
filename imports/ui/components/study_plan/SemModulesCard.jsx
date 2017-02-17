import React from 'react';
import Module from './Module';
import ModuleSearchBar from './ModuleSearchBar';

export default class SemModulesCard extends React.Component {
  render() {
    return (
      <div className="col-md-4">
        <div className="card-grid-col">
  				<article className="card-typical">
  					<div className="card-typical-section card-typical-content">
              <ModuleSearchBar />
              <ModuleSearchBar />
  					</div>
  					<div className="card-typical-section">
  						<div className="card-typical-linked">
                {this.props.sem}
              </div>
  					</div>
  				</article>
  			</div>
      </div>
    );
  }
}

SemModulesCard.propTypes = {
  sem: React.PropTypes.string
}

/*
// Autosuggestion react component example:
// https://github.com/moroshko/react-autosuggest
<Autosuggest
  suggestions={suggestions}
  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
  getSuggestionValue={getSuggestionValue}
  renderSuggestion={renderSuggestion}
  inputProps={inputProps}
/>
 */

/*
// Hardcoded modules - I'll put these aside first.
<Module moduleCode="CS1010" />
<Module moduleCode="CS1020" />
<Module moduleCode="MA1521" />
<Module moduleCode="MA1101R" />
<Module moduleCode="IS1103" />
 */

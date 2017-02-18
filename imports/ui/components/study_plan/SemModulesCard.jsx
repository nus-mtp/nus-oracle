import React from 'react';
import Module from './Module';
import { getAllModulesInSemester } from '../../../api/crud-controller/semester/methods';
import ModuleSearchBar from './ModuleSearchBar.jsx';

export default class SemModulesCard extends React.Component {
  render() {
    const modules = getAllModulesInSemester(this.props.semesterIndex, this.props.plannerID);
    return (
      <div className="col-md-4">
        <div className="card-grid-col">
  				<article className="card-typical">
  					<div className="card-typical-section card-typical-content">
              {Object.keys(modules).map((moduleName, rank) => {
                return <Module key={rank} moduleCode={moduleName} />;
              })}
              {/* ID needs to be given to each autosuggest since there are
                more than 1 on the page */}
              <ModuleSearchBar id="autosuggest1"/>
              <ModuleSearchBar id="autosuggest2"/>
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
  sem: React.PropTypes.string,
  semesterIndex: React.PropTypes.integer,
  plannerID: React.PropTypes.string
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

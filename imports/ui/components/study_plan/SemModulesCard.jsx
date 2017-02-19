import React from 'react';
import Module from './Module';
import ModuleSearchBar from './ModuleSearchBar.jsx';

import { sendQuery } from '../../../api/searcher-controller/controller.js'

export default class SemModulesCard extends React.Component {
  constructor() {
    super();
    this.state = {
      addedModule: false,
      addedModuleCode: null
    }
  }

  /**
   * Handles the event when a module has been successfully added
   **/
  handleAddModule(moduleCode) {
    console.log("In SemModulesCard's handleAddModule: " + moduleCode);
    this.setState({
      addedModule: true,
      addedModuleCode: moduleCode
    });
    //insertOneModuleInSemester(semesterIndex, moduleName, plannerID)
  }

  render() {
    const modules = this.props.modules;
    console.log(modules);

    return (
      <div className="col-md-4">
        <div className="card-grid-col">
  				<article className="card-typical">
  					<div className="card-typical-section card-typical-content">
              {Object.keys(modules).map((moduleCode, index) => {
                return <Module key={index} moduleCode={moduleCode} />;
              })}

              {this.state.addedModule ?
                <Module moduleCode={this.state.addedModuleCode} /> :
                <ModuleSearchBar handleAddModule={this.handleAddModule.bind(this)} />
              }
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
  modules: React.PropTypes.object
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

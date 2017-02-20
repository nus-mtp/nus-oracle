import _ from 'underscore';
import React from 'react';
import Module from './Module.jsx';
import ModuleSearchBar from './ModuleSearchBar.jsx';

import { insertOneModuleInSemester } from '../../../api/crud-controller/module/methods.js';
import { deleteOneModuleInSemester } from '../../../api/crud-controller/module/methods.js';

/**
 * React Component that implements the container for a semester's worth of
 * modules - all list in columnal form with rows of Modules. Also has a
 * autosuggest box for searching for modules to be added to the user's study plan.
 */
export default class SemModulesCard extends React.Component {
  /**
   * Handles the event when a module is added
   **/
  handleAddModule(moduleCode) {
    insertOneModuleInSemester(this.props.semesterIndex, moduleCode,  this.props.plannerID);
  }

  /**
   * Handles the event when a module is deleted
   */
  handleDeleteModule(moduleCode) {
    deleteOneModuleInSemester(
      this.props.semesterIndex, moduleCode, this.props.plannerID);
  }

  render() {
    const modules = this.props.modules;

    return (
      <div className="col-md-4">
        <div className="card-grid-col">
  				<article className="card-typical">
  					<div className="card-typical-section card-typical-content">

              {/* Renders all modules from the user's study plan */}
              {Object.keys(modules).map((moduleCode, index) => {
                return <Module key={index} moduleCode={moduleCode}
                               handleDeleteModule={
                                 this.handleDeleteModule.bind(this, moduleCode)}/>;
              })}

              <ModuleSearchBar handleAddModule={this.handleAddModule.bind(this)} />

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
